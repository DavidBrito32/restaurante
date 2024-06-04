export class AddressModel {
    constructor(
        private id: string,
        private street: string,
        private houseNumber: number,
        private complement: string | null,
        private district: string,
        private city: string,
        private zipCode: string
    ){}

    public getId = (): string => {
        return this.id;
    }

    public setId = (id: string): void => {
        this.id = id
    }

    public getStreet = (): string => {
        return this.street;
    }

    public setStreet = (street: string) => {
        this.street = street;
    }

    public getHouseNumber = (): number => {
        return this.houseNumber
    }

    public setHouseNumber = (number: number): void => {
        this.houseNumber = number;
    }

    public getComplement = (): string | null => {
        return this.complement
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

    public getZipCode = (): string => {
        return this.zipCode;
    }

    public setZipCode = (zipCode: string): void => {
        this.zipCode = zipCode;
    }
}