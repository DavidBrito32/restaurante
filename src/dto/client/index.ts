import { z } from "zod";


//SIGNUP
export interface SignupClientInputDTO {
    name: string;
    password: string;
    email: string;
    cpf: string;
    dateOfBirth?: string | null;
};

export interface SignupClientOutputDTO {
    message: string;
};

export const SignupClientSchema = z.object({
    name: z.string({
        required_error: "'name' - é um dado obrigatorio",
        invalid_type_error: "'name' - deve ser enviado no formato string",
    }).min(4),
    password: z.string({
        required_error: "'password' - é um dado obrigatorio",
        invalid_type_error: "'password' - deve ser enviado no formato string",
    }).min(8),
    email: z.string({
        required_error: "'email' - é um dado obrigatorio",
        invalid_type_error: "'email' - deve ser enviado no formato string",
    }).min(4).email(),
    cpf: z.string({
        required_error: "'cpf' - é um dado obrigatorio",
        invalid_type_error: "'cpf' - deve ser enviado no formato string",
    }).min(4),
    dateOfBirth: z.string({
        required_error: "'dateOfBirth' - é um dado obrigatorio",
        invalid_type_error: "'dateOfBirth' - deve ser enviado no formato string",
    }).min(4).optional()
}).transform(data => data as SignupClientInputDTO);

//LOGIN

export interface LoginClientInputDTO {
    email: string;
    password: string;
};

export interface LoginClientOutputDTO {
    message: string;
    token: string;
};

export const LoginClientSchema = z.object({
    email: z.string({
        required_error: "'email' -  é um campo obrigatorio",
        invalid_type_error: "'email' - deve ser enviado no formato string"
    }).min(8).email(),
    password: z.string({
        required_error: "'password' -  é um campo obrigatorio",
        invalid_type_error: "'password' - deve ser enviado no formato string"
    })
});

//UPDATE

export interface updateClient {
    authorization: string;    
    name?: string;
    password?: string;
    email?: string;
    dateOfBirth?: string;
};

export interface updateClientOutputDTO {
    message: string;
};

export const updateClientSchema = z.object({
    authorization: z.string({
        invalid_type_error: "'authorization' - deve ser enviado no formato string",
        required_error: "'authorization' - é um campo obrigatorio e deve ser passado pelo header"
    }).min(20),
    name: z.string({
        invalid_type_error: "'name' - deve ser enviado no formato string"
    }).optional(),
    password: z.string({
        invalid_type_error: "'password' - deve ser enviado no formato string"
    }).min(8).optional(),
    email: z.string({
        invalid_type_error: "'email' - deve ser enviado no formato string"
    }).email().optional(),
    dateOfBirth: z.string().optional()
}).transform(data => data as updateClient);
//DELETE CLIENT

export interface deleteClientInputDTO {
    authorization: string;
};

export interface deleteClientOutputDTO {
    message: string;
};

export const deleteClientSchema = z.object({
    authorization: z.string({
        invalid_type_error: "'authorization' - deve ser enviado no formato string",
        required_error: "'authorization' - é um campo obrigatorio e deve ser passado pelo header"
    }).min(20)
}).transform(data => data as deleteClientInputDTO);