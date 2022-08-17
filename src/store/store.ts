import { configureStore } from "@reduxjs/toolkit";

import cart from "./cart/slice";
import filter from "./filter/slice";
import productSlice from "./product/slice";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        productSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
