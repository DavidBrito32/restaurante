import { PAYMENTMETHOD } from "../../../models/client/paymentCard";
import { ROLE } from "../../../services/tokenManager";

export enum OPERATOR {
  VISA = "VISA",
  ELO = "ELO",
  MASTERCARD = "MASTERCARD",
  AMERICAN_EXPRESS = "AMERICAN EXPRESS",
  HIPERCARD = "HIPER CARD",
  DISCOVER = "DISCOVER",
  MAESTRO = "MAESTRO"
}

export interface AddressDB {
  id: string;
  client_id: string;
  street: string;
  house_number: number;
  complement: string | null;
  district: string;
  primary_adress: boolean;
  operador: OPERATOR;
  city: string;
  state: string;
  zip_code: string;
}

//CAMADA DO BANCO DE DADOS
export interface Client {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
  cpf: string;
  password: string;
  payment_card: Array<PaymentCardsDB>;
  address: Array<AddressDB>;
  date_of_birth: string | null | undefined;
}

// criar um usuario no banco

export interface Client_TableDB {
  id: string;
  name: string;
  password: string;
  avatar: string | null;
  email: string;
  cpf: string;
  date_of_birth: string | null | undefined;
  role: ROLE;
}

//login no banco

export interface ClientLoginDB {
  email: string;
}

// atualiza um cliente

export interface updateClientDB {
  id: string;
  name: string;
  avatar: string | null;
  password: string;
  email: string;
  date_of_birth: string | null;
  role: ROLE.COSTUMER;
}

// GET CLIENT
export interface GetClientOutPut {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
  date_of_birth: string | null;
  role: ROLE.COSTUMER;
}

// ADRESS

export interface GetAllAdress {
  id: string;
  street: string;
  house_number: number;
  complement: string | null;
  district: string;
  city: string;
  state: string;
  primary_adress: boolean;
  client_id: string;
  zip_code: string;
}

export interface InsertAdressClientDB {
  id: string;
  street: string;
  house_number: number;
  complement: string | null;
  district: string;
  city: string;
  state: string;
  client_id: string;
  primary_adress: boolean;
  zip_code: string;
}

export interface UpdateAdressClientDB {
  street: string;
  house_number: number;
  complement: string | null;
  district: string;
  city: string;
  state: string;
  primary_adress: boolean;
  client_id: string;
  zip_code: string;
}

// PAYMENT CARD
export interface PaymentCardsDB {
  id: string;
  client_id: string;
  number_card: number;
  client_name: string;
  operator: OPERATOR;
  cvv: number;
  method: PAYMENTMETHOD;
  expires_in: string;
  created_at: string;
}

export interface InsertPaymentDB {
  id: string;
  client_id: string;
  number_Card: number;
  operator: OPERATOR,
  client_name: string;
  method: PAYMENTMETHOD;
  expires_in: string;
  cvv: number;
  created_at: string;
}
