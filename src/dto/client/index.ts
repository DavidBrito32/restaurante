import { z } from "zod";
import { PAYMENTMETHOD } from "../../models/client/paymentCard";


//SIGNUP
export interface SignupClientInputDTO {
    name: string;
    avatar?: string;
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
    avatar: z.string({
        invalid_type_error: "'avatar' - deve ser enviado no formato string",
    }).min(8).optional(),
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
    avatar?: string;
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
    dateOfBirth: z.string().optional(),
    avatar: z.string({
        invalid_type_error: "'avatar' - deve ser enviado no formato string"
    }).optional()
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



// FIND CLIENT

export interface FindClientInputDTO {
    authorization: string;
};

export const FindClientSchema = z.object({
    authorization: z.string({
        invalid_type_error: "'authorization' - deve ser enviado no formato string",
        required_error: "'authorization' - é um dado obrigatorio"
    })
})

export interface SavedPaymentMethods {
    numberCard: number;
    clientName: string;
    cvv: number;
    expiresIn: string;
    method: PAYMENTMETHOD;
};

export interface AddresClient {
    id: string;
    street: string;
    clientId: string;
    houseNumber: number;
    complement: string | null;
    district: string;
    city: string;
    zipCode: string;
};

export interface FindClientOutputDTO {
    id: string;
    name: string;
    avatar: string | null;
    email: string;
    age: string;
    dateOfBirth: string;
    address: Array<AddresClient>;
    savedPaymentMethods: Array<SavedPaymentMethods>
};


export interface GetPaymentClient {
    id: string;
    idClient: string;
    numberCard: number;
    clientName: string;
}

export interface GetClientOutPutDTO {
    id: string;
    name: string;
    avatar: string | null;
    email: string;
    dateOfBirth: string | null;
    address: Array<AddresClient>;
    savedPayments: Array<GetPaymentClient>;
}
// CREATE ADRESS

export interface InsertAdressClientInputDTO {
    authorization: string;
    street: string;
    houseNumber: number;
    complement?: string | null;
    district: string;
    city: string;
    zipCode: string;
}

export interface InsertAdressClientOutputDTO {
    message: string;
}

export const InsertAdressClientSchema = z.object({
    authorization: z.string({
        invalid_type_error: "'authorization' - deve ser enviado no formato string",
        required_error: "'authorization' - é um campo obrigatorio e deve ser passado pelo header"
    }).min(20),
    street: z.string({
        invalid_type_error: "'street' - deve ser enviado no formato string",
        required_error: "'street' - é um campo obrigatorio e deve ser passado pelo header"
    }),
    houseNumber: z.number({
        invalid_type_error: "'houseNumber' - deve ser enviado no formato string",
        required_error: "'houseNumber' - é um campo obrigatorio e deve ser passado pelo header"
    }).min(1),
    complement: z.string({
        invalid_type_error: "'complement' - deve ser enviado no formato string"
    }).optional().nullable(),
    district: z.string({
        invalid_type_error: "'district' - deve ser enviado no formato string",
        required_error: "'district' - é um campo obrigatorio e deve ser passado pelo header"
    }),
    city: z.string({
        invalid_type_error: "'city' - deve ser enviado no formato string",
        required_error: "'city' - é um campo obrigatorio e deve ser passado pelo header"
    }),
    zipCode: z.string({
        invalid_type_error: "'zipCode' - deve ser enviado no formato string",
        required_error: "'zipCode' - é um campo obrigatorio e deve ser passado pelo header"
    })    
}).transform(data => data as InsertAdressClientInputDTO);


// UPDATE ADRESS

export interface UpdateAdressClientInputDTO {
    authorization: string;
    id: string;
    street?: string;
    houseNumber?: number;
    complement?: string | null;
    district?: string;
    city?: string;
    zipCode?: string;
};

export interface UpdateAdressClientOutputDTO {
    message: string;
}

export const UpdateAdressClientSchema = z.object({
    authorization: z.string({
        invalid_type_error: "'authorization' - deve ser enviado no formato string",
        required_error: "'authorization' - é um campo obrigatorio e deve ser passado pelo header"
    }).min(20),
    id: z.string({
        invalid_type_error: "'id' - deve ser enviado no formato string"
    }),
    street: z.string({
        invalid_type_error: "'street' - deve ser enviado no formato string",
    }).optional(),
    houseNumber: z.number({
        invalid_type_error: "'houseNumber' - deve ser enviado no formato string",
    }).min(1).optional(),
    complement: z.string({
        invalid_type_error: "'complement' - deve ser enviado no formato string"
    }).optional().nullable(),
    district: z.string({
        invalid_type_error: "'district' - deve ser enviado no formato string",
    }).optional(),
    city: z.string({
        invalid_type_error: "'city' - deve ser enviado no formato string",
    }).optional(),
    zipCode: z.string({
        invalid_type_error: "'zipCode' - deve ser enviado no formato string",
    }).optional()    
}).transform(data => data as UpdateAdressClientInputDTO);

// DELETE ADRESS

export interface DeleteAdressClientInputDTO {
    authorization: string;
    id: string
}

export interface DeleteAdressClientOutputDTO {
    message: string;
}

export const DeleteAdressClientSchema = z.object({
    authorization: z.string({
        required_error: "'authorization' - é um campo obrigatorio e deve ser enviado no header da requisição",
        invalid_type_error: "'authorization' - deve ser enviado no formato string"
    }),
    id: z.string({
        invalid_type_error: "'id' - deve ser enviado no formato string",
        required_error: "'id' - é um campo obrigatorio",
    }),
}).transform(data => data as DeleteAdressClientInputDTO);
