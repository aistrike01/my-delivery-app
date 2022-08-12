import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../services/index";

export const fetchProducts = createAsyncThunk("product/fetchProducts", async (params) => {
    const { page, sortBy, order, categoryFilter, searchFilter } = params;
    const { data } = await axios.get(
        `${baseURL}items?${page}&limit=4${sortBy}${order}${categoryFilter}${searchFilter}`
    );
    return data;
});

export const fetchProduct = createAsyncThunk("product/fetchProduct", async (id) => {
    const { data } = await axios.get(`${baseURL}items/${id}`);
    return data;
});

const initialState = {
    items: [],
    product: {},
    status: "loading",
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
        setProduct(state, action) {
            state.product = action.payload;
        },
    },
    extraReducers: {
        [fetchProducts.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = "success";
        },
        [fetchProducts.pending]: (state) => {
            state.items = [];
            state.status = "loading";
        },
        [fetchProducts.rejected]: (state) => {
            state.items = [];
            state.status = "error";
        },
        [fetchProduct.fulfilled]: (state, action) => {
            state.product = action.payload;
            state.status = "success";
        },
        [fetchProduct.pending]: (state) => {
            state.product = {};
            state.status = "loading";
        },
        [fetchProduct.rejected]: (state) => {
            state.product = {};
            state.status = "error";
        },
    },
});

export const selectProduct = (state) => state.product;

export default productSlice.reducer;

export const { setItems, setProduct } = productSlice.actions;
