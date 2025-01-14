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

type Gender = 'Masculino' | 'Feminino' | 'Unissex';

export interface Product {
    id: number;
    name: string;

    ref?: string;

    reference: string;
    gender: Gender;
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
    totalCount: number;
    page: number;
    limit: number;
}

