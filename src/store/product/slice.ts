import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProduct, fetchProducts } from "./asyncActions";
import { IProduct, ProductState } from "./types";

const initialState: ProductState = {
    items: [],
    product: {} as IProduct,
    status: "loading",
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
            state.items = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchProducts.pending, (state) => {
            state.items = [];
            state.status = "loading";
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.items = [];
            state.status = "error";
        });
        builder.addCase(fetchProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
            state.product = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchProduct.pending, (state) => {
            state.product = {} as IProduct;
            state.status = "loading";
        });
        builder.addCase(fetchProduct.rejected, (state) => {
            state.product = {} as IProduct;
            state.status = "error";
        });
    },
});

export default productSlice.reducer;
