import { UserDataBase, UsersDB } from "../../database/users";
import { GetUsers, InputUserDTO, createUserOutputDTO } from "../../dto/users";
import { BadRequest } from "../../errors/BadRequest";
import { UserModel } from "../../models/users";
import { HashManager } from "../../services/hashManager";
import { TokenManager } from "../../services/tokenManager";
import { IdGenerator } from "../../services/uuid";

export class UsersBusiness {
    constructor(
        private readonly DB: UserDataBase,
        private readonly token: TokenManager, 
        private readonly hashManager: HashManager,
        private readonly idManager: IdGenerator
    ){}

    public GetAllUsers = async (): Promise<Array<GetUsers>> => {
        const data = await this.DB.listUsers();

        const Users = data.map((usuario) => new UserModel(usuario.id, usuario.name, usuario.cpf, usuario.email, usuario.password, usuario.role, usuario.schooling, usuario.age, usuario.is_active, usuario.address).GetUser())
        
        return Users;
    }

    public CreateUser = async (input: InputUserDTO): Promise<createUserOutputDTO> => {
        const { authorization, name, role, email, password, address, age, cpf, schooling } = input;1        

        const verifyToken = this.token.getPayload(authorization.split(" ")[1]);
		if (verifyToken === null) {
			throw new BadRequest("Você não tem permissão para acessar este recurso");
		}

        if(verifyToken.role !== "ADMIN"){
            throw new BadRequest("Solicite ao ADMIN do sitema suporte para este recurso");
        }

        const [exists] = await this.DB.findUserByEmail(email);

        if(exists){
            throw new BadRequest("E-mail ja registrado, Por favor utilize outro");
        }

        const HasId = this.idManager.generate();

        const HashPassword = await this.hashManager.hash(password);

        const usuario: UsersDB = {
            id: HasId,
            name,
            age,
            address,
            cpf,
            role,
            schooling,
            email,
            is_active: false,
            password: HashPassword,
            
        }
        console.log(address)
        await this.DB.insertUser(usuario);

        return {
            message: "Usuario Criado Com sucesso!"
        };
    }
}