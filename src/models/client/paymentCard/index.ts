import { GetPaymentClient } from "../../../dto/client";

export enum PAYMENTMETHOD {
    DEBIT = "DEBITO",
    CREDIT = "CREDITO"
}

export class PaymentModel {
    constructor(
        private id: string,
        private idClient: string,
        private numberCard: number,
        private clientName: string,
        private method: PAYMENTMETHOD,
        private expiresIn: string,
        private cvv: number
    ){}

    public getId = (): string => {
        return this.id;
    }

    public setId = (id: string): void => {
        this.id = id;
    }

    public getIdClient = (): string => {
        return this.idClient;
    }

    public setIdClient = (idIdClient: string): void => {
        this.idClient = idIdClient;
    }

    public getNumberCard = (): number => {
        return this.numberCard;
    }

    public setNumberCard = (number: number): void => {
        this.numberCard = number;
    }

    public getClientName = (): string => {
        return this.clientName;
    }

    public setClientName = (client: string): void => {
        this.clientName = client;
    }

    public getMethod = (): string => {
        return this.method;
    }

    public setMethod = (method: PAYMENTMETHOD): void => {
        this.method = method;
    }

    public getExpiresIn = (): string => {
        return this.expiresIn;
    }

    public setExpiresIn = (expiresIn: PAYMENTMETHOD): void => {
        this.expiresIn = expiresIn;
    }

    public getCvv = (): number => {
        return this.cvv;
    }

    public setCvv = (cvv: number): void => {
        this.cvv = cvv;
    }

    public getPayment = (): GetPaymentClient => {
        return {
            id: this.getId(),
            idClient: this.getIdClient(),
            numberCard: this.getNumberCard(),
            clientName: this.getClientName()
        }
    }

}