import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../services";
import { IProductParams } from "./types";

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
