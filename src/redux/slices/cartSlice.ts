import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ICartItem {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: string;
    count: number;
}

interface ICartState {
    totalPrice: number;
    items: ICartItem[];
}

const initialState: ICartState = {
    totalPrice: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ICartItem>) => {
            const sameItem = state.items.find((item) => item.id === action.payload.id);

            if (sameItem) {
                sameItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return sum + obj.price * obj.count;
            }, 0);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const item = state.items.find((item) => item.id === action.payload);

            if (item) {
                if (item.count === 1) {
                    state.items = state.items.filter((item) => item.id !== action.payload);
                } else {
                    item.count--;
                }
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return sum + obj.price * obj.count;
            }, 0);
        },
        removeFullItems: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);

            state.totalPrice = state.items.reduce((sum, obj) => {
                return sum + obj.price * obj.count;
            }, 0);
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cart.items.find((item) => item.id === id);

export default cartSlice.reducer;

export const { addItem, removeItem, removeFullItems, clearItems } = cartSlice.actions;
