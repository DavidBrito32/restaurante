export interface ProductsDB {
    id: string;
    title: string;
    description: string;
    price: number;
    discount: string | null;
    image_url: string;
    created_at: string;
    updated_at: string | null;
};

export interface UpdateProductsDB {
    title: string;
    description: string;
    price: number;
    discount: string | null;
    image_url: string;
    updated_at: string | null;
};

