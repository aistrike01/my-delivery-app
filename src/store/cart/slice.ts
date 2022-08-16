import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import calcTotalPrice from "../../utils/calcTotalPrice";
import { ICartItem, ICartState } from "./types";

const initialState: ICartState = {
    totalPrice: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<ICartItem[]>) => {
            state.items = action.payload;

            state.totalPrice = calcTotalPrice(state.items);
        },
        plusItem: (state, action: PayloadAction<ICartItem>) => {
            const sameItem = state.items.find((item) => item.id === action.payload.id);

            if (sameItem) {
                sameItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem: (state, action: PayloadAction<string>) => {
            const item = state.items.find((item) => item.id === action.payload);

            if (item) {
                if (item.count === 1) {
                    state.items = state.items.filter((item) => item.id !== action.payload);
                } else {
                    item.count--;
                }
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        removeFullItems: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);

            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export default cartSlice.reducer;

export const { setItems, plusItem, minusItem, removeFullItems, clearItems } = cartSlice.actions;
