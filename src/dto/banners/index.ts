import { z } from "zod";

// GET BANNERS
export interface GetBanners {
  id: string;
  title: string;
  subTitle: string;
  imageUrl: string;
  cta: string;
  createdAt: string;
  updatedAt: string | null;
}

// CREATE BANNERS

export interface BannersInputDTO {
  authorization: string;
  title: string;
  subTitle: string;
  imageUrl: string;
  cta: string;
}

export interface BannersOutputDTO {
  message: string;
}

export const CreateBannersInputSchema = z
  .object({
    authorization: z
      .string({
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
        required_error:
          "'authorization' - é um campo obrigatorio e deve ser passado pelo header",
      })
      .min(20),
    title: z
      .string({
        invalid_type_error: "'title' - deve ser enviado no formato string",
        required_error: "'title' - é um campo obrigatorio",
      })
      .min(5),
    subTitle: z
      .string({
        invalid_type_error: "'subTitle' - deve ser enviado no formato string",
        required_error: "'subTitle' - é um campo obrigatorio",
      })
      .min(5),
    imageUrl: z
      .string({
        invalid_type_error: "'imageUrl' - deve ser enviado no formato string",
        required_error: "'imageUrl' - é um campo obrigatorio",
      })
      .min(5),
    cta: z
      .string({
        invalid_type_error: "'cta' - deve ser enviado no formato string",
        required_error: "'cta' - é um campo obrigatorio",
      })
      .min(5),
  })
  .transform((data) => data as BannersInputDTO);

// UPDATE BANNERS

export interface UpdateBannersInputDTO {
  authorization: string;
  title?: string;
  subTitle?: string;
  imageUrl?: string;
  cta?: string;
  id: string;
}

export interface UpdateBannersOutputDTO {
  message: string;
}

export const UpdateBannersInputSchema = z
  .object({
    authorization: z
      .string({
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
        required_error:
          "'authorization' - é um campo obrigatorio e deve ser passado pelo header",
      })
      .min(20),
    id: z
      .string({
        invalid_type_error: "'bannerId' - deve ser enviado no formato string",
        required_error: "'bannerId' - é um campo obrigatorio",
      })
      .min(10),
    title: z
      .string({
        invalid_type_error: "'title' - deve ser enviado no formato string",
      })
      .min(5)
      .optional(),
    subTitle: z
      .string({
        invalid_type_error: "'subTitle' - deve ser enviado no formato string",
      })
      .min(5)
      .optional(),
    imageUrl: z
      .string({
        invalid_type_error: "'imageUrl' - deve ser enviado no formato string",
      })
      .min(5)
      .optional(),
    cta: z
      .string({
        invalid_type_error: "'cta' - deve ser enviado no formato string",
      })
      .min(5)
      .optional(),
  })
  .transform((data) => data as UpdateBannersInputDTO);

// DELETE BANNERS

export interface DeleteBannersInputDTO {
  authorization: string;
  id: string;
}

export interface DeleteBannersOutputDTO {
  message: string;
}

export const DeleteBannersInputSchema = z
  .object({
    authorization: z
      .string({
        invalid_type_error:
          "'authorization' - deve ser enviado no formato string",
        required_error:
          "'authorization' - é um campo obrigatorio e deve ser passado pelo header",
      })
      .min(20),
    id: z
      .string({
        invalid_type_error: "'bannerId' - deve ser enviado no formato string",
        required_error: "'bannerId' - é um campo obrigatorio",
      })
      .min(10),
  })
  .transform((data) => data as DeleteBannersInputDTO);
