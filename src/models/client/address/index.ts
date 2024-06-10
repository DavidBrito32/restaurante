import { AddresClient } from "../../../dto/client";
import { InsertAdressClientDB, UpdateAdressClientDB } from "../../../dto/client/db";

export class AddressModel {
    constructor(
        private id: string,
        private clientId: string,
        private street: string,
        private houseNumber: number,
        private complement: string | null,
        private district: string,
        private city: string,
        private state: string,
        private primaryAdress: boolean,
        private zipCode: string
    ){}

    public getId = (): string => {
        return this.id;
    }

    public setId = (id: string): void => {
        this.id = id;
    }

    public getClientId = (): string => {
        return this.clientId;
    }

    public setClientId = (clientId: string): void => {
        this.clientId = clientId;
    }

    public getStreet = (): string => {
        return this.street;
    }

    public setStreet = (street: string) => {
        this.street = street;
    }

    public getHouseNumber = (): number => {
        return this.houseNumber;
    }

    public setHouseNumber = (number: number): void => {
        this.houseNumber = number;
    }

    public getComplement = (): string | null => {
        return this.complement;
    }

    public setComplement = (complement: string | null): void => {
        this.complement = complement;
    }

    public getDistrict = (): string => {
        return this.district;
    }

    public setDistrict = (district: string): void => {
        this.district = district;
    }

    public getCity = (): string => {
        return this.city;
    }

    public setCity = (city: string): void => {
        this.city = city;
    }

    public getState = (): string => {
        return this.state;
    }

    public setState = (state: string): void => {
        this.state = state;
    }

    public getPrimaryAdress = (): boolean => {
        return this.primaryAdress;
    }

    public setPrimaryAdress = (primaryAdress: boolean): void => {
        this.primaryAdress = primaryAdress;
    }

    public getZipCode = (): string => {
        return this.zipCode;
    }

    public setZipCode = (zipCode: string): void => {
        this.zipCode = zipCode;
    }

    public getAddress = (): AddresClient => {
        return {
            id: this.getId(),
            street: this.getStreet(),
            clientId: this.getClientId(),
            houseNumber: this.getHouseNumber(),
            complement: this.getComplement(),
            district: this.getDistrict(),
            city: this.getCity(),
            state: this.getState(),
            primaryAdress: this.getPrimaryAdress(),
            zipCode: this.getZipCode()
        }
    }

    public insertAdressDB = (): InsertAdressClientDB => {
        return { 
            id: this.getId(),
            street: this.getStreet(),
            house_number: this.getHouseNumber(),
            client_id: this.getClientId(),
            complement: this.getComplement(),
            district: this.getDistrict(),
            city: this.getCity(),
            state: this.getState(),
            primary_adress: this.getPrimaryAdress(),
            zip_code: this.getZipCode()
        }
    }
    
    public updateAdressDB = (): UpdateAdressClientDB => {
        return { 
            street: this.getStreet(),
            house_number: this.getHouseNumber(),
            client_id: this.getClientId(),
            complement: this.getComplement(),
            district: this.getDistrict(),
            city: this.getCity(),
            state: this.getState(),
            primary_adress: this.getPrimaryAdress(),
            zip_code: this.getZipCode()
        }
    }
}