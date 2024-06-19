import { GetPaymentClient } from "../../../dto/client";
import { InsertPaymentDB } from "../../../dto/client/db";

export enum PAYMENTMETHOD {
  DEBIT = "DEBITO",
  CREDIT = "CREDITO",
}

export class PaymentModel {
  constructor(
    private id: string,
    private idClient: string,
    private numberCard: number,
    private clientName: string,
    private method: PAYMENTMETHOD,
    private expiresIn: string,
    private createdAt: string,
    private cvv: number,
  ) {}

  public getId = (): string => {
    return this.id;
  };

  public setId = (id: string): void => {
    this.id = id;
  };

  public getIdClient = (): string => {
    return this.idClient;
  };

  public setIdClient = (idIdClient: string): void => {
    this.idClient = idIdClient;
  };

  public getNumberCard = (): number => {
    return this.numberCard;
  };

  public setNumberCard = (number: number): void => {
    this.numberCard = number;
  };

  public getClientName = (): string => {
    return this.clientName;
  };

  public setClientName = (client: string): void => {
    this.clientName = client;
  };

  public getMethod = (): PAYMENTMETHOD => {
    return this.method;
  };

  public setMethod = (method: PAYMENTMETHOD): void => {
    this.method = method;
  };

  public getExpiresIn = (): string => {
    return this.expiresIn;
  };

  public setExpiresIn = (expiresIn: PAYMENTMETHOD): void => {
    this.expiresIn = expiresIn;
  };

  public getCreatedAt = (): string => {
    return this.createdAt;
  };

  public setCreatedAt = (createdAt: PAYMENTMETHOD): void => {
    this.createdAt = createdAt;
  };

  public getCvv = (): number => {
    return this.cvv;
  };

  public setCvv = (cvv: number): void => {
    this.cvv = cvv;
  };

  public getPayment = (): GetPaymentClient => {
    return {
      id: this.getId(),
      idClient: this.getIdClient(),
      numberCard: this.getNumberCard(),
      clientName: this.getClientName(),
    };
  };

  public insertPaymentDB = (): InsertPaymentDB => {
    return {
      id: this.getId(),
      client_id: this.getIdClient(),
      number_Card: this.getNumberCard(),
      client_name: this.getClientName(),
      method: this.getMethod(),
      expires_in: this.getExpiresIn(),
      cvv: this.getCvv(),
      created_at: this.getCreatedAt(),
    };
  };
}
