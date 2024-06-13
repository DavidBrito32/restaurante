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
    state: string;
    primaryAdress: boolean;
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
    state: string;
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
        required_error: "'street' - é um campo obrigatorio"
    }),
    houseNumber: z.number({
        invalid_type_error: "'houseNumber' - deve ser enviado no formato string",
        required_error: "'houseNumber' - é um campo obrigatorio"
    }).min(1),
    complement: z.string({
        invalid_type_error: "'complement' - deve ser enviado no formato string"
    }).optional().nullable(),
    district: z.string({
        invalid_type_error: "'district' - deve ser enviado no formato string",
        required_error: "'district' - é um campo obrigatorio"
    }),
    city: z.string({
        invalid_type_error: "'city' - deve ser enviado no formato string",
        required_error: "'city' - é um campo obrigatorio"
    }),
    state: z.string({
        invalid_type_error: "'state' - deve ser enviado no formato string",
        required_error: "'state' - é um campo obrigatorio"
    }).min(2).max(2),
    zipCode: z.string({
        invalid_type_error: "'zipCode' - deve ser enviado no formato string",
        required_error: "'zipCode' - é um campo obrigatorio"
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
    primaryAdress: boolean;
    state?: string;
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
    state: z.string({
        invalid_type_error: "'state' - deve ser enviado no formato string",
    }).min(2).max(2).optional(),
    primaryAdress: z.boolean({
        invalid_type_error: "'primaryAdress' - deve ser enviado no formato booleano",
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



// PAYMENT METHODS

export interface GetPaymentClient {
    id: string;
    idClient: string;
    numberCard: number;
    clientName: string;
}


export interface GetPaymentClientDB {
    id: string;
    client_id: string;
    number_card: number;
    client_name: string;
    method: PAYMENTMETHOD;
    expiresIn: string;
    cvv: number;
    created_at: string;
}

export interface InsertPaymentInputDTO {
    authorization: string;
    numberCard: number;
    clientName: string;
    method: PAYMENTMETHOD;
    expiresIn: string;
    cvv: number;
}

export interface InsertPaymentOutputDTO {
    message: string;
}

export const InsertPaymentSchema = z.object({
    authorization: z.string({
        invalid_type_error: "'authorization' - deve ser enviado no formato string",
        required_error: "'authorization' - é um campo obrigatorio e deve ser passado pelo header"
    }).min(20),
    numberCard: z.number({
        invalid_type_error: "'numberCard' - deve ser enviado no formato Number",
        required_error: "'numberCard' - é um dado obrigatorio"
    }).min(16),
    clientName: z.string({
        invalid_type_error: "'clientName' - deve ser enviado no formato string",
        required_error: "'clientName' - é um dado obrigatorio"
    }).min(2),
    method: z.enum([PAYMENTMETHOD.CREDIT, PAYMENTMETHOD.DEBIT]),
    expiresIn: z.string({
        invalid_type_error: "'expiresIn' - deve ser enviado no formato string",
        required_error: "'expiresIn' - é um dado obrigatorio"
    }).min(7).max(7),
    cvv: z.number({
        invalid_type_error: "'cvv' - deve ser enviado no formato Number",
        required_error: "'cvv' - é um dado obrigatorio"
    }).min(3)
}).transform(data => data as InsertPaymentInputDTO);