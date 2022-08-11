import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../services/index";

export const fetchProducts = createAsyncThunk("product/fetchProducts", async (params) => {
    const { page, sortBy, order, categoryFilter, searchFilter } = params;
    const { data } = await axios.get(
        `${baseURL}/items?${page}&limit=4${sortBy}${order}${categoryFilter}${searchFilter}`
    );
    return data;
});

const initialState = {
    items: [],
    status: "loading",
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchProducts.fulfilled]: (state, action) => {
            state.status = "success";
            state.items = action.payload;
        },
        [fetchProducts.pending]: (state) => {
            state.status = "loading";
            state.items = [];
        },
        [fetchProducts.rejected]: (state) => {
            state.status = "error";
            state.items = [];
        },
    },
});

export default productSlice.reducer;

export const { setItems } = productSlice.actions;
