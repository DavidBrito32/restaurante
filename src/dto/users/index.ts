import { z } from "zod";

export interface Users {
    id: string,
    name: string;
    cpf: string;
    email: string;
    password: string,
    role: string,
    schooling: string,
    age: number,
    isActive: boolean,
    address: string,
}

export interface GetUsers {
    id: string,
    name: string;
    cpf: string;
    email: string;
    role: string;
    schooling: string;
    age: number;
    isActive: boolean;
    address: string;
}

export interface GetUsersInputDTO {
    authorization: string;
}

export interface InputUserDTO {
    authorization: string
    name: string;
    cpf: string;
    email: string;
    password: string,
    role: string,
    schooling: string,
    age: number,
    address: string,
}

export const InsertUserSchema = z.object({
    name: z.string({
        required_error: "'name' - é um campo obrigatorio",
        invalid_type_error: "'name' - deve ser enviado no formato string"
    }).min(2),
    authorization: z.string({
        required_error: "'authorization' - é um campo obrigatorio",
        invalid_type_error: "'authorization' - deve ser enviado no formato string"
    }).min(2),
    cpf: z.string({
        required_error: "'cpf' - é um campo obrigatorio",
        invalid_type_error: "'cpf' - deve ser enviado no formato string"
    }).min(2),
    email: z.string({
        required_error: "'email' - é um campo obrigatorio",
        invalid_type_error: "'email' - deve ser enviado no formato string"
    }).min(2),
    password: z.string({
        required_error: "'password' - é um campo obrigatorio",
        invalid_type_error: "'password' - deve ser enviado no formato string"
    }).min(8),
    role: z.string({
        required_error: "'role' - é um campo obrigatorio",
        invalid_type_error: "'role' - deve ser enviado no formato string"
    }).min(2),
    schooling: z.string({
        required_error: "'schooling' - é um campo obrigatorio",
        invalid_type_error: "'schooling' - deve ser enviado no formato string"
    }).min(2),
    age: z.number({
        required_error: "'age' - é um campo obrigatorio",
        invalid_type_error: "'age' - deve ser enviado no formato number"
    }).min(2),
    address: z.string({
        required_error: "'address' - é um campo obrigatorio",
        invalid_type_error: "'address' - deve ser enviado no formato string"
    }).min(2),
    
}).transform(data => data as InputUserDTO);

export interface createUserOutputDTO {
    message: string;
}
