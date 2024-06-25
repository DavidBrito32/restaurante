import { z } from "zod";
import { ROLE } from "../../services/tokenManager";

export interface Users {
  id: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  role: string;
  schooling: string;
  age: number;
  isActive: boolean;
  address: string;
}

export interface GetUsers {
  id: string;
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

export const GetUserSchema = z
  .object({
    authorization: z.string({
      required_error: "'authorization' - é obrigatorio",
      invalid_type_error: "'authorization' - deve ser do tipo Bearer Token",
    }),
  })
  .strict()
  .transform((data) => data as GetUsersInputDTO);

// # CRIAÇÃO DE USUARIO
export interface InputUserDTO {
  authorization: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  role: ROLE;
  schooling: string;
  age: number;
  address: string;
}

export const InsertUserSchema = z
  .object({
    name: z
      .string({
        required_error: "'name' - é um campo obrigatorio",
        invalid_type_error: "'name' - deve ser enviado no formato string",
      })
      .min(2),
    authorization: z
      .string({
        required_error: "'authorization' - é um campo obrigatorio",
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
      })
      .min(2),
    cpf: z
      .string({
        required_error: "'cpf' - é um campo obrigatorio",
        invalid_type_error: "'cpf' - deve ser enviado no formato string",
      })
      .min(14),
    email: z
      .string({
        required_error: "'email' - é um campo obrigatorio",
        invalid_type_error: "'email' - deve ser enviado no formato string",
      })
      .min(2),
    password: z
      .string({
        required_error: "'password' - é um campo obrigatorio",
        invalid_type_error: "'password' - deve ser enviado no formato string",
      })
      .min(8),
    role: z.enum(["ADMIN", "OPERADOR"]),
    schooling: z
      .string({
        required_error: "'schooling' - é um campo obrigatorio",
        invalid_type_error: "'schooling' - deve ser enviado no formato string",
      })
      .min(2),
    age: z
      .number({
        required_error: "'age' - é um campo obrigatorio",
        invalid_type_error: "'age' - deve ser enviado no formato number",
      })
      .min(2),
    address: z
      .string({
        required_error: "'address' - é um campo obrigatorio",
        invalid_type_error: "'address' - deve ser enviado no formato string",
      })
      .min(2),
  })
  .strict()
  .transform((data) => data as InputUserDTO);

export interface createUserOutputDTO {
  message: string;
}

// ---------------------------------
// # AUTENTICAÇÃO DE USUARIO
export interface LoginInputDTO {
  email: string;
  password: string;
}

export interface LoginOutputDTO {
  message: string;
  token: string;
}

export const LoginSchema = z
  .object({
    email: z
      .string({
        required_error: "'email' - é um campo obrigatorio",
        invalid_type_error: "'email' - deve ser passado no formato string",
      })
      .min(2),
    password: z
      .string({
        required_error: "'password' - é um campo obrigatorio",
        invalid_type_error: "'password' - deve ser passado no formato string",
      })
      .min(8),
  })
  .strict()
  .transform((data) => data as LoginInputDTO);

export interface LogoffInputDTO {
  authorization: string;
}

export interface LogoffOutputDTO {
  message: string;
}

export const LogoffSchema = z
  .object({
    authorization: z
      .string({
        required_error:
          "'authorization' - é um campo obrigatorio e deve ser enviado no header como um Bearer Token",
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
      })
      .min(20),
  })
  .strict()
  .transform((data) => data as LogoffInputDTO);

// ---------------------------------
// # ATUALIZAÇÃO DE USUARIO

export interface UpdateUserInputDTO extends Partial<InputUserDTO> {
  authorization: string;
  id: string;
}

export interface UpdateUserOutputDTO {
  message: string;
}

export const UpdateUserSchema = z
  .object({
    authorization: z
      .string({
        required_error: "'authorization' - é um campo obrigatorio",
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
      })
      .min(2),
    id: z
      .string({
        required_error: "'id' - é um campo obrigatorio",
        invalid_type_error: "'id' - deve ser enviado no formato string",
      })
      .min(20),
    name: z
      .string({
        invalid_type_error: "'name' - deve ser enviado no formato string",
      })
      .min(2)
      .optional(),
    cpf: z
      .string({
        invalid_type_error: "'cpf' - deve ser enviado no formato string",
      })
      .min(2)
      .optional(),
    email: z
      .string({
        invalid_type_error: "'email' - deve ser enviado no formato string",
      })
      .min(2)
      .optional(),
    password: z
      .string({
        invalid_type_error: "'password' - deve ser enviado no formato string",
      })
      .min(8)
      .optional(),
    role: z.enum(["ADMIN", "OPERADOR"]).optional(),
    schooling: z
      .string({
        invalid_type_error: "'schooling' - deve ser enviado no formato string",
      })
      .min(2)
      .optional(),
    age: z
      .number({
        invalid_type_error: "'age' - deve ser enviado no formato number",
      })
      .min(2)
      .optional(),
    address: z
      .string({
        invalid_type_error: "'address' - deve ser enviado no formato string",
      })
      .min(2)
      .optional(),
  })
  .strict()
  .transform((data) => data as UpdateUserInputDTO);

// ---------------------------------
// # REMOÇÃO DE USUARIO
export interface DeleteUserInputDTO {
  authorization: string;
  id: string;
}

export interface DeleteUserOutputDTO {
  message: string;
}

export const DeleteUserSchema = z
  .object({
    authorization: z
      .string({
        required_error: "'authorization' - é um campo obrigatorio",
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
      })
      .min(2),
    id: z
      .string({
        required_error: "'id' - é um campo obrigatorio",
        invalid_type_error: "'id' - deve ser enviado no formato string",
      })
      .min(20),
  })
  .strict()
  .transform((data) => data as DeleteUserInputDTO);
