import { UpdateUserDB, UserDataBase } from "../../database/users";
import {
    DeleteUserInputDTO,
  DeleteUserOutputDTO,
  GetUsers,
  GetUsersInputDTO,
  InputUserDTO,
  LoginInputDTO,
  LoginOutputDTO,
  LogoffInputDTO,
  LogoffOutputDTO,
  UpdateUserInputDTO,
  UpdateUserOutputDTO,
  createUserOutputDTO,
} from "../../dto/users";
import { UsersDB } from "../../dto/users/db";
import { BadRequest } from "../../errors/BadRequest";
import { NotFound } from "../../errors/NotFound";
import { Unouthorized } from "../../errors/Unouthorized";
import { UserModel } from "../../models/users";
import { HashManager } from "../../services/hashManager";
import { ROLE, TokenManager, TokenPayload } from "../../services/tokenManager";
import { IdGenerator } from "../../services/uuid";

export class UsersBusiness {
  constructor(
    private readonly DB: UserDataBase,
    private readonly token: TokenManager,
    private readonly hashManager: HashManager,
    private readonly idManager: IdGenerator
  ) {}

  public GetAllUsers = async (input: GetUsersInputDTO): Promise<Array<GetUsers>> => {
    const { authorization } = input;
    const verifyToken = this.token.getPayload(authorization.split(" ")[1]);

    if(verifyToken === null){
        throw new BadRequest("Você não tem permissão para acessar este recurso");
    }

    if (verifyToken.role !== ROLE.ADMIN) {
        throw new BadRequest(
          "Solicite ao ADMIN do sitema suporte para este recurso"
        );
      }


    const data = await this.DB.listUsers();

    const Users = data.map((usuario) =>
      new UserModel(
        usuario.id,
        usuario.name,
        usuario.cpf,
        usuario.email,
        usuario.password,
        usuario.role,
        usuario.schooling,
        usuario.age,
        usuario.is_active,
        usuario.address
      ).GetUser()
    );

    return Users;
  }; //OK ✅

  public CreateUser = async (input: InputUserDTO): Promise<createUserOutputDTO> => {
    const { authorization, name, role, email, password, address, age, cpf, schooling} = input;

    const verifyToken = this.token.getPayload(authorization.split(" ")[1]);
    if (verifyToken === null) {
      throw new BadRequest("Você não tem permissão para acessar este recurso");
    }

    if (verifyToken.role !== ROLE.ADMIN) {
      throw new BadRequest(
        "Solicite ao ADMIN do sitema suporte para este recurso"
      );
    }

    const [EmailExists] = await this.DB.findUserByEmail(email);
    const [CPFExists] = await this.DB.findUserByCPF(cpf);

      if(EmailExists){
        throw new BadRequest("E-mail ja registrado, Por favor utilize outro");
      }

      if(CPFExists){
        throw new BadRequest("Verifique o CPF informado e tente novamente");
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
    };
    await this.DB.insertUser(usuario);

    return {
      message: "Usuario Criado Com sucesso!",
    };
  }; //OK ✅

  public Login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;
    const [exists] = await this.DB.findUserByEmail(email);

    if (!exists) {
      throw new NotFound(
        "Usuario não encontrado, por favor verifique seu email"
      );
    }

    const checkPassword: boolean = await this.hashManager.compare(
      password,
      exists.password
    );

    if (!checkPassword) {
      throw new Unouthorized();
    }

    const payload: TokenPayload = {
      id: exists.id,
      name: exists.name,
      email: exists.email,
      role: exists.role as ROLE,
    };

    const token: string = this.token.createToken(payload);

    await this.DB.updateUser(exists.id, { ...exists, is_active: true });

    return {
      message: "Usuario logado com sucesso!",
      token,
    };
  }; //OK ✅

  public Logoff = async (input: LogoffInputDTO): Promise<LogoffOutputDTO> => {
        const { authorization } = input;
        const verifyToken = this.token.getPayload(authorization.split(" ")[1]);
        if (verifyToken === null) {
          throw new BadRequest("Você não tem permissão para acessar este recurso");
        }
        
        const [exists] = await this.DB.findUserById(verifyToken.id);

        if(exists.id !== verifyToken.id){
            throw new BadRequest("Você não tem permissão para alterar o status de outra pessoa");
        }

        const user = new UserModel(exists.id, exists.name, exists.cpf, exists.email, exists.password, exists.role, exists.schooling, exists.age, false, exists.address).UpdateUser();
        await this.DB.updateUser(exists.id, user);

        return {
            message: "Usuario desconectado com sucesso!"
        }
  }; //OK ✅

  public UpdateUser = async (input: UpdateUserInputDTO): Promise<UpdateUserOutputDTO> => {
    const { authorization, id, address, age, email, name, password, role, schooling} = input;

    const verifyToken = this.token.getPayload(authorization.split(" ")[1]);

    if (verifyToken === null) {
      throw new BadRequest("Você não tem permissão para acessar este recurso");
    }

    const [exists] = await this.DB.findUserById(id);

    if (!exists) {
      throw new NotFound("usuario não encontrado");
    }


    let newPassword: string | undefined;
    
    if (password) {
      newPassword = await this.hashManager.hash(password);
    }

    const userAtualizado = new UserModel(
      exists.id,
      name || exists.name,
      exists.cpf,
      email || exists.email,
      newPassword || exists.password,
      role || exists.role,
      schooling || exists.schooling,
      age || exists.age,
      exists.is_active,
      address || exists.address
    );

    const update: UpdateUserDB = userAtualizado.UpdateUser();

    await this.DB.updateUser(id, update);

    return {
      message: "Dados Atualizados com sucesso!",
    };
  }; //OK ✅

  public DeleteUser = async (input: DeleteUserInputDTO): Promise<DeleteUserOutputDTO> => {
    const { authorization, id } = input;

    const verifyToken = this.token.getPayload(authorization.split(" ")[1]);

    if (verifyToken === null) {
      throw new BadRequest("Você não tem permissão para acessar este recurso");
    }

    if (verifyToken.role !== ROLE.ADMIN) {
        throw new BadRequest(
          "Solicite ao ADMIN do sitema suporte para este recurso"
        );
    }

    const [exists] = await this.DB.findUserById(id);

    if (!exists){
        throw new NotFound("usuario não encontrado");
    } 

    await this.DB.removeUser(exists.id);

    return {
        message: "Usuario deletado com sucesso!"
    };
  }  //OK ✅
}
