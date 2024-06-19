import { z } from "zod";

export interface GetProducts {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface ProductsInputDTO {
  authorization: string;
  title: string;
  description: string;
  price: number;
  discount?: number | null;
  imageUrl: string;
}

export interface ProductsOutputDTO {
  message: string;
}

export const CreateProductsInputSchema = z
  .object({
    authorization: z
      .string({
        required_error:
          "'authorization' - é um campo obrigatorio, e deve ser passado no header da requisição",
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
      })
      .min(20),
    title: z
      .string({
        required_error: "'title' - é um campo obrigatorio",
        invalid_type_error: "'title' - deve ser enviado no formato string",
      })
      .min(2),
    description: z
      .string({
        required_error: "'description' - é um campo obrigatorio",
        invalid_type_error:
          "'description' - deve ser enviado no formato string",
      })
      .min(2),
    price: z
      .number({
        required_error: "'price' - é um campo obrigatorio",
        invalid_type_error: "'price' - deve ser enviado no formato number",
      })
      .min(2),
    discount: z
      .number({
        invalid_type_error: "'discount' - deve ser enviado no formato number",
      })
      .min(2)
      .optional()
      .nullable(),
    imageUrl: z
      .string({
        required_error: "'imageUrl' - é um campo obrigatorio",
        invalid_type_error: "'imageUrl' - deve ser enviado no formato string",
      })
      .min(2),
  })
  .transform((data) => data as ProductsInputDTO);

//UPDATE PRODUCT
export interface ProductsUpdateInputDTO {
  authorization: string;
  id: string;
  title?: string;
  description?: string;
  price?: number;
  discount?: number | null;
  imageUrl?: string;
}

export interface ProductsUpdateOutputDTO {
  message: string;
}

export const ProductsUpdateInputSchema = z
  .object({
    authorization: z
      .string({
        required_error:
          "'authorization' - é um campo obrigatorio, e deve ser passado no header da requisição",
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
      })
      .min(20),
    id: z
      .string({
        required_error:
          "'id' - é um campo obrigatorio, e deve ser passado no path parameters da requisição",
        invalid_type_error: "'id' - deve ser enviado no formato string",
      })
      .min(10),
    title: z
      .string({
        invalid_type_error: "'title' - deve ser enviado no formato string",
      })
      .min(2)
      .optional(),
    description: z
      .string({
        invalid_type_error:
          "'description' - deve ser enviado no formato string",
      })
      .min(2)
      .optional(),
    price: z
      .number({
        invalid_type_error: "'price' - deve ser enviado no formato number",
      })
      .min(2)
      .optional(),
    discount: z
      .number({
        invalid_type_error: "'discount' - deve ser enviado no formato number",
      })
      .optional()
      .nullable(),
    imageUrl: z
      .string({
        invalid_type_error: "'imageUrl' - deve ser enviado no formato string",
      })
      .min(2)
      .optional(),
  })
  .transform((data) => data as ProductsUpdateInputDTO);

//DELETE PRODUCT

export interface ProductsDeleteInputDTO {
  authorization: string;
  id: string;
}

export interface ProductsDeleteOutputDTO {
  message: string;
}

export const ProductDeleteSchema = z
  .object({
    authorization: z
      .string({
        required_error:
          "'authorization' - é um campo obrigatorio, e deve ser passado no header da requisição",
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
      })
      .min(20),
    id: z
      .string({
        required_error:
          "'id' - é um campo obrigatorio, e deve ser passado no path parameters da requisição",
        invalid_type_error: "'id' - deve ser enviado no formato string",
      })
      .min(10),
  })
  .transform((data) => data as ProductsDeleteInputDTO);
