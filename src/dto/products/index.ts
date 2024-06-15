export interface GetProducts {
    id: string;
    title: string;
    description: string;
    price: number;
    discount: string | null;
    createdAt: string;
    updatedAt: string | null;
} 

export interface ProductsInputDTO {
    title: string;
    description: string;
    price: number;
    discount: string | null;
    imageUrl: string;
}