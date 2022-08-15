import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../services/index";
import { RootState } from "../store";

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

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (params: IProductParams) => {
        const { page, sortBy, order, categoryFilter, searchFilter } = params;
        const { data } = await axios.get(
            `${baseURL}items?${page}&limit=4${sortBy}${order}${categoryFilter}${searchFilter}`
        );
        return data;
    }
);

export const fetchProduct = createAsyncThunk("product/fetchProduct", async (id: string) => {
    const { data } = await axios.get(`${baseURL}items/${id}`);
    return data;
});

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

export const selectProduct = (state: RootState) => state.productSlice;

export default productSlice.reducer;
