import { PAYMENTMETHOD } from "../../../models/client/paymentCard";
import { ROLE } from "../../../services/tokenManager";

export interface PaymentCardsDB {
    id: string;
    id_client: string;
    numberCard: number;
    method: PAYMENTMETHOD;
    expiresIn: string;
}

export interface AddressDB {
    id: string;
    client_id: string;
    street: string;
    house_number: number;
    complement: string | null;
    district: string;
    city: string;
    zip_code: string;
}   


//CAMADA DO BANCO DE DADOS
export interface Client {
    id: string;
    name: string
    email: string;
    cpf: string;
    password: string;
    payment_card: Array<PaymentCardsDB>;
    address: Array<AddressDB>
    date_of_birth: string | null | undefined;
}

// criar um usuario no banco

export interface Client_TableDB {
    id: string;
    name: string;
    password: string;
    email: string;
    cpf: string;
    date_of_birth: string | null | undefined;
    role: ROLE
}

//login no banco

export interface ClientLoginDB {
    email: string;
}


// atualiza um cliente

export interface updateClientDB {
    id: string;
    name: string;
    password: string;
    email: string;
    date_of_birth: string | null;
    role: ROLE.COSTUMER;
}