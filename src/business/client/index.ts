import { ClientDB } from "../../database/client";
import { LoginClientInputDTO, LoginClientOutputDTO, SignupClientInputDTO, SignupClientOutputDTO, deleteClientInputDTO, deleteClientOutputDTO, updateClient, updateClientOutputDTO } from "../../dto/client";
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
    };

    public login = async (input: LoginClientInputDTO): Promise<LoginClientOutputDTO> => {
        const { email, password } = input;
        const exists = await this.clientDb.findClientByEmail(email); 
        
        if(!exists){
            throw new BadRequest("'cliente' - não encontrado - sugestão faça o signup");
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
    };

    public updateClient = async (input: updateClient): Promise<updateClientOutputDTO> => {
        const { authorization, name, dateOfBirth, email, password } = input;

        const tokenIsValid = this.tokenManager.getPayload(authorization.split(" ")[1]);

        if(tokenIsValid === null){
            throw new BadRequest("'authorization' - você não tem permissão para acessar este recurso");
        }

        const exists = await this.clientDb.findClientById(tokenIsValid.id);


        if(!exists){
            throw new BadRequest("Cliente não encontrado");
        }

        if(!name && !email && !password){
            throw new BadRequest("Enviar ao menos um dado");
        }

        let HashedPassword: string | undefined;
        if(password){
            HashedPassword = await this.hashManager.hash(password);
        }

        const newClient = new ClientModel(exists.id, name || exists.name, email || exists.email, HashedPassword || exists.password, exists.cpf, dateOfBirth || exists.date_of_birth).updateClientDB();

        await this.clientDb.updateClient(newClient.id, newClient);

        return {
            message: "dados atualizados com sucesso!"
        }
    };

    public deleteClient = async (input: deleteClientInputDTO): Promise<deleteClientOutputDTO> => {
        const { authorization } = input;
        const tokenIsValid = this.tokenManager.getPayload(authorization.split(" ")[1]);
        if(tokenIsValid === null){
            throw new BadRequest("'authorization' - você não tem permissão para acessar este recurso");
        }

        const exists = await this.clientDb.findClientById(tokenIsValid.id);

        if(!exists){
            throw new BadRequest("Cliente não encontrado");
        }

        await this.clientDb.removeClient(exists.id);

        return {
            message: "Sentimos muito que você tenha chegado a este ponto, Porem continuaremos aqui torcendo por você"
        }
    };

}