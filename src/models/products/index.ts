export class ProductModel {
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private imageUrl: string,
        private price: number,
        private discount: number | null,
        private createdAt: string,
        private updatedAt: string | null
    ){}

    public getId = (): string => {
        return this.id;
    }

    public setId = (id: string): void => {
        this.id = id;
    }

    public getTitle = (): string => {
        return this.title;
    }

    public setTitle = (title: string): void => {
        this.title = title;
    }

    public getDescription = (): string => {
        return this.description;
    }

    public setDescription = (description: string): void => {
        this.description = description;
    }

    public getImageUrl = (): string => {
        return this.imageUrl;
    }

    public setImageUrl = (imageUrl: string): void => {
        this.imageUrl = imageUrl;
    }

    public getPrice = (): number => {
        return this.price;
    }

    public setPrice = (price: number): void => {
        this.price = price;
    }

    public getDiscount = (): number | null => {
        return this.discount;
    }

    public setDiscount = (discount: number | null): void => {
        this.discount = discount;
    }

    public getCreatedAt = (): string => {
        return this.createdAt;
    }

    public setCreatedAt = (createdAt: string): void => {
        this.createdAt = createdAt;
    }

    public getUpdatedAt = (): string | null => {
        return this.updatedAt;
    }

    public setUpdatedAt = (updatedAt: string | null): void => {
        this.updatedAt = updatedAt;
    }
}