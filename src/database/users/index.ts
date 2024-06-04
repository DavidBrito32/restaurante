import { Db } from "../db";

export interface UsersDB {
    id: string,
    name: string;
    cpf: string;
    email: string;
    password: string,
    role: string,
    schooling: string,
    age: number,
    is_active: boolean,
    address: string,
}

export interface UpdateUserDB {
    name: string;
    cpf: string;
    email: string;
    password: string,
    role: string,
    schooling: string,
    age: number,
    is_active: boolean,
    address: string,
}

export class UserDataBase extends Db {
   
    public static TABLE: string = "users";

    public listUsers = async (): Promise<Array<UsersDB>> => {
        return await Db.connection.select().from(UserDataBase.TABLE);
    }

    public findUserById = async (id: string): Promise<Array<UsersDB>>  => {
        return await Db.connection(UserDataBase.TABLE).select("*").where({ id });
    }

    public findUserByEmail = async (email: string): Promise<Array<UsersDB>>  => {
        return await Db.connection(UserDataBase.TABLE).select("*").where({ email });
    }

    public findUserByCPF = async (cpf: string): Promise<Array<UsersDB>>  => {
        return await Db.connection(UserDataBase.TABLE).select("*").where({ cpf });
    }

    public insertUser = async (data: UsersDB): Promise<void> => {
        await Db.connection.insert(data).into("users");
    }

    public updateUser = async (id: string, data: UpdateUserDB): Promise<void> => {
        await Db.connection.update(data).from(UserDataBase.TABLE).where({id});
    }

    public removeUser = async (id: string): Promise<void> => {
        await Db.connection("users").delete().where({ id });
    }

}