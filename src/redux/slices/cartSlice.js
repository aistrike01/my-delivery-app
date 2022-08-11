import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
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
            const item = state.items.find((item) => item.id === action.payload);

            if (item.count === 1) {
                state.items = state.items.filter((item) => item.id !== action.payload);
            } else {
                item.count--;
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return sum + obj.price * obj.count;
            }, 0);
        },
        removeFullItem: (state, action) => {
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

export default cartSlice.reducer;

export const { setTotalPrice, addItem, removeItem, removeFullItem, clearItems } = cartSlice.actions;
