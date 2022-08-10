import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        addItem: (state, action) => {
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
        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearItems: (state) => {
            state.items = [];
        },
    },
});

export default cartSlice.reducer;

export const { setTotalPrice, addItem, removeItem, clearItems } = cartSlice.actions;
