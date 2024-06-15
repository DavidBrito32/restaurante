import { z } from "zod";

export interface GetBanners  {
    id: string;
    title: string;
    subTitle: string;
    imageUrl: string;
    cta: string;
    createdAt: string;
    updatedAt: string | null;
}

export interface BannersInputDTO  {
    authorization: string;
    title: string;
    subTitle: string;
    imageUrl: string;
    cta: string;
}

export interface BannersOutputDTO {
    message: string;
}

export const BannersInputSchema = z.object({
    authorization: z.string({
        invalid_type_error: "'authorization' - deve ser enviado no formato string",
        required_error: "'authorization' - é um campo obrigatorio e deve ser passado pelo header"
    }).min(20),
    title: z.string({
        invalid_type_error: "'title' - deve ser enviado no formato string",
        required_error: "'title' - é um campo obrigatorio"
    }).min(5),
    subTitle: z.string({
        invalid_type_error: "'subTitle' - deve ser enviado no formato string",
        required_error: "'subTitle' - é um campo obrigatorio"
    }).min(5),
    imageUrl: z.string({
        invalid_type_error: "'imageUrl' - deve ser enviado no formato string",
        required_error: "'imageUrl' - é um campo obrigatorio"
    }).min(5),
    cta: z.string({
        invalid_type_error: "'cta' - deve ser enviado no formato string",
        required_error: "'cta' - é um campo obrigatorio"
    }).min(5)    
}).transform(data => data as BannersInputDTO);