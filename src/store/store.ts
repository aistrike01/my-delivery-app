import { configureStore } from "@reduxjs/toolkit";

import cart from "./slices/cartSlice";
import filter from "./slices/filterSlice";
import productSlice from "./slices/productSlice";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        productSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
