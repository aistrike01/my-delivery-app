type status = "loading" | "error" | "success";

export interface IProduct {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

export interface ProductState {
    items: IProduct[];
    product: IProduct;
    status: status;
}

export interface IProductParams {
    page: string;
    sortBy: string;
    order: string;
    categoryFilter: string;
    searchFilter: string;
}
