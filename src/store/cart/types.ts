export interface ICartItem {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: string;
    count: number;
}

export interface ICartState {
    totalPrice: number;
    items: ICartItem[];
}
