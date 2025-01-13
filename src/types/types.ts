// types.ts
export interface SKU {
    id: number;
    size: string;
    stock: number;
    open_grid: boolean;
    min_quantity: number;
}

export interface Company {
    key: number;
}

export interface Image {
    id: number;
    order: number;
    path: string;
}

export interface Product {
    id: number;
    name: string;
    reference: string;
    gender: string;
    category: string;
    subcategory: string | null;
    prompt_delivery: boolean;
    skus: SKU[];
    companies: Company;
    brand: string;
    price: number;
    colors: string[];
    images: Image[];
}

export interface ProductData {
    products: Product[];
}
