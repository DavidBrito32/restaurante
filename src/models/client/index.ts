import { Client_TableDB, GetClientOutPut, updateClientDB } from "../../dto/client/db";
import { ROLE } from "../../services/tokenManager";

export class ClientModel {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private avatar: string | null,
        private password: string,
        private cpf: string,
        private dateOfBirth: string | null | undefined
    ) { }

    private getId = (): string => {
        return this.id;
    }

    public setId = (id: string): void => {
        this.id = id;
    }

    private getName = (): string => {
        return this.name;
    }

    public setName = (name: string): void => {
        this.name = name;
    }

    private getEmail = (): string => {
        return this.email;
    }

    public setEmail = (email: string): void => {
        this.email = email;
    }

    private getAvatar = (): string | null => {
        return this.avatar;
    }

    public setAvatar = (avatar: string | null): void => {
        this.avatar = avatar;
    }

    private getPassword = (): string => {
        return this.password;
    }

    public setPassword = (password: string): void => {
        this.password = password;
    }

    private getCpf = (): string => {
        return this.cpf;
    }

    public setCpf = (cpf: string): void => {
        this.cpf = cpf;
    }

    private getDateOfBirth = (): string | null | undefined => {
        return this.dateOfBirth;
    }

    public setDateOfBirth = (date: string | null): void => {
        this.dateOfBirth = date;
    }

    public insertClientDB = (): Client_TableDB => {
        return {
            id: this.getId(),
            name: this.getName(),
            avatar: this.getAvatar(),
            email: this.getEmail(),
            password: this.getPassword(),
            cpf: this.getCpf(),
            date_of_birth: this.getDateOfBirth(),
            role: ROLE.COSTUMER
        }
    }

    public updateClientDB = (): updateClientDB => {
        return {
            id: this.getId(),
            name: this.getName(),
            email: this.getEmail(),
            avatar: this.getAvatar(),
            password: this.getPassword(),
            date_of_birth: this.getDateOfBirth() as string,
            role: ROLE.COSTUMER
        }
    }

    public getClient = (): GetClientOutPut => {
        return {
            id: this.getId(),
            name: this.getName(),
            email: this.getEmail(),
            avatar: this.getAvatar(),
            date_of_birth: this.getDateOfBirth() as string,
            role: ROLE.COSTUMER
        }
    }
}