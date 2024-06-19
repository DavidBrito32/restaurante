import { GetProducts } from "../../dto/products";
import { ProductsDB, UpdateProductsDB } from "../../dto/products/db";

export class ProductModel {
  constructor(
    private id: string,
    private title: string,
    private description: string,
    private imageUrl: string,
    private price: number,
    private discount: number | null,
    private createdAt: string,
    private updatedAt: string | null,
  ) {}

  private getId = (): string => {
    return this.id;
  };

  private setId = (id: string): void => {
    this.id = id;
  };

  private getTitle = (): string => {
    return this.title;
  };

  private setTitle = (title: string): void => {
    this.title = title;
  };

  private getDescription = (): string => {
    return this.description;
  };

  private setDescription = (description: string): void => {
    this.description = description;
  };

  private getImageUrl = (): string => {
    return this.imageUrl;
  };

  private setImageUrl = (imageUrl: string): void => {
    this.imageUrl = imageUrl;
  };

  private getPrice = (): number => {
    return this.price;
  };

  private setPrice = (price: number): void => {
    this.price = price;
  };

  private getDiscount = (): number | null => {
    return this.discount;
  };

  private setDiscount = (discount: number | null): void => {
    this.discount = discount;
  };

  private getCreatedAt = (): string => {
    return this.createdAt;
  };

  private setCreatedAt = (createdAt: string): void => {
    this.createdAt = createdAt;
  };

  private getUpdatedAt = (): string | null => {
    return this.updatedAt;
  };

  private setUpdatedAt = (updatedAt: string | null): void => {
    this.updatedAt = updatedAt;
  };

  public listProduct = (): GetProducts => {
    return {
      id: this.getId(),
      title: this.getTitle(),
      description: this.getDescription(),
      price: this.getPrice(),
      discount: this.getDiscount(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  };

  public insertProduct = (): ProductsDB => {
    return {
      id: this.getId(),
      title: this.getTitle(),
      description: this.getDescription(),
      price: this.getPrice(),
      discount: this.getDiscount(),
      image_url: this.getImageUrl(),
      created_at: this.getCreatedAt(),
      updated_at: this.getUpdatedAt(),
    };
  };

  public updateProduct = (): UpdateProductsDB => {
    return {
      title: this.getTitle(),
      description: this.getDescription(),
      price: this.getPrice(),
      discount: this.getDiscount(),
      image_url: this.getImageUrl(),
      updated_at: this.getUpdatedAt(),
    };
  };
}
