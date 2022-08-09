import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./slices/categoriesSlice";
import searchSlice from "./slices/searchSlice";
import sortSlice from "./slices/sortSlice";

export const store = configureStore({
    reducer: {
        search: searchSlice,
        categories: categoriesSlice,
        sort: sortSlice,
    },
});
