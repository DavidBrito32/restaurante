import { UpdateUserDB } from "../../database/users";
import { GetUsers } from "../../dto/users";

export class UserModel {
    constructor(
        private id: string,
        private name: string,
        private cpf: string,
        private email: string,
        private password: string,
        private role: string,
        private schooling: string,
        private age: number,
        private isActive: boolean,
        private address: string,
    ){}

    public getId = (): string => {
        return this.id;
    }

    public setId = (id: string): void => {
        this.id = id;
    }

    public getName = (): string => {
        return this.name;
    }

    public setName = (name: string): void => {
        this.name = name;
    }

    public getCpf = (): string => {
        return this.cpf;
    }

    public setCpf = (cpf: string): void => {
        this.cpf = cpf;
    }

    public getEmail = (): string => {
        return this.email;
    }

    public setEmail = (email: string): void => {
        this.email = email;
    }

    public getPassword = (): string => {
        return this.password;
    }

    public setPassword = (password: string): void => {
        this.password = password;
    }

    public getRole = (): string => {
        return this.role;
    }

    public setRole = (role: string): void => {
        this.role = role;
    }

    public getSchooling = (): string => {
        return this.schooling;
    }

    public setSchooling = (schooling: string): void => {
        this.schooling = schooling;
    }

    public getAge = (): number => {
        return this.age;
    }

    public setAge = (age: number): void => {
        this.age = age;
    }

    public getIsActive = (): boolean => {
        return this.isActive;
    }

    public setIsActive = (isActive: boolean): void => {
        this.isActive = isActive;
    }

    public getAddress = (): string => {
        return this.address;
    }

    public setAddress = (address: string): void => {
        this.address = address;
    }

    //metodos para retornar DTO para o database

    public GetUser = (): GetUsers => {
        return {
            id: this.getId(),
            name: this.getName(),
            email: this.getEmail(),
            cpf: this.getCpf(),
            role: this.getRole(),
            isActive: this.getIsActive(),
            address: this.getAddress(),
            age: this.getAge(),
            schooling: this.getSchooling()
        }
    }

    public UpdateUser = (): UpdateUserDB => {
        return {
            name: this.getName(),
            email: this.getEmail(),
            cpf: this.getCpf(),
            role: this.getRole(),
            is_active: this.getIsActive(),
            address: this.getAddress(),
            age: this.getAge(),
            schooling: this.getSchooling(),
            password: this.getPassword()
        }
    }
}