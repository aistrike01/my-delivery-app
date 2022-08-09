import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
    sortTypes: [
        { name: "популярности (DESC)", sortName: "rating", order: "desc" },
        { name: "популярности (ASC)", sortName: "rating", order: "asc" },
        { name: "цене (DESC)", sortName: "price", order: "desc" },
        { name: "цене (ASC)", sortName: "price", order: "asc" },
        { name: "алфавиту (DESC)", sortName: "title", order: "desc" },
        { name: "алфавиту (ASC)", sortName: "title", order: "asc" },
    ],
};

export const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setValue } = sortSlice.actions;

export default sortSlice.reducer;

export const selectSortTypes = (state) => state.sort.sortTypes;
export const selectSortValue = (state) => state.sort.value;
