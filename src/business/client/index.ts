import { ClientDB } from "../../database/client";
import { LoginClientInputDTO, LoginClientOutputDTO, SignupClientInputDTO, SignupClientOutputDTO } from "../../dto/client";
import { BadRequest } from "../../errors/BadRequest";
import { ClientModel } from "../../models/client";
import { HashManager } from "../../services/hashManager";
import { TokenManager, TokenPayload } from "../../services/tokenManager";
import { IdGenerator } from "../../services/uuid";

export class ClientBusiness {
    constructor(
        private readonly clientDb: ClientDB,
        private readonly tokenManager: TokenManager,
        private readonly hashManager: HashManager,
        private readonly idManager: IdGenerator
    ){}

    public signup = async (input: SignupClientInputDTO): Promise<SignupClientOutputDTO> => {
        const { name, email, cpf, password, dateOfBirth } = input;        
        const exists = await this.clientDb.findClientByEmail(email);        
        const cpfExists = await this.clientDb.findClientByCpf(cpf);

        if(exists){
            throw new BadRequest("Desculpe, verifique os dados informados e tente novamente!");
        }
        
        if(cpfExists){
            throw new BadRequest("Desculpe, verifique os dados informados e tente novamente!");;
        }

        const id = this.idManager.generate();
        const hashedPassword = await this.hashManager.hash(password);
        const client = new ClientModel(id, name, email, hashedPassword, cpf, dateOfBirth).insertClientDB();
        
        await this.clientDb.insertClient(client);

        return { message: "Cliente Cadastrado com sucesso"};
    }

    public login = async (input: LoginClientInputDTO): Promise<LoginClientOutputDTO> => {
        const { email, password } = input;
        const exists = await this.clientDb.findClientByEmail(email); 
        
        if(!exists){
            throw new BadRequest("Verifique os dados informados e tente novamente mais tarde");
        }
        const hashIsValid = await this.hashManager.compare(password, exists.password);

        if(!hashIsValid){
            throw new BadRequest();
        }

        const payload: TokenPayload = {
            id: exists.id,
            name: exists.name,
            email: exists.email,
            role: exists.role
        }
        
        const token = this.tokenManager.createToken(payload);
        
        return {message: `Seja bem vindo ${payload.name}`, token};
    }

}