export enum PAYMENTMETHOD {
    DEBIT = "DEBITO",
    CREDIT = "CREDITO"
}

export class PaymentModel {
    constructor(
        private id: string,
        private idClient: string,
        private numberCard: number,
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

}