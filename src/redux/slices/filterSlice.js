import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sortId: 0,
    currentPage: 1,
    searchValue: "",
    categoriesList: [
        "Все",
        "Суши",
        "Бургеры",
        "Пиццы",
        "Салаты",
        "Супы",
        "Десерты",
        "Напитки",
        "Соусы",
        "Вегетарианское",
    ],
    sortTypesList: [
        { name: "популярности (DESC)", sortName: "rating", order: "desc" },
        { name: "популярности (ASC)", sortName: "rating", order: "asc" },
        { name: "цене (DESC)", sortName: "price", order: "desc" },
        { name: "цене (ASC)", sortName: "price", order: "asc" },
        { name: "алфавиту (DESC)", sortName: "title", order: "desc" },
        { name: "алфавиту (ASC)", sortName: "title", order: "asc" },
    ],
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
        },
        setSortTypeId: (state, action) => {
            state.sortId = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setFilters: (state, action) => {
            state.sortId = action.payload.sort;
            state.categoryId = Number(action.payload.category);
            state.currentPage = Number(action.payload.page);
        },
    },
});

export const selectFilter = (state) => state.filter;
export const selectCurrentPage = (state) => state.filter.currentPage;

export default filterSlice.reducer;

export const { setCategoryId, setSortTypeId, setCurrentPage, setSearchValue, setFilters } =
    filterSlice.actions;
