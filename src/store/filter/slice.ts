import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilters, IFilterState } from "./types";

const initialState: IFilterState = {
    categoryId: 0,
    sortId: 0,
    currentPage: 1,
    searchValue: "",
    order: "desc",
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
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload;
        },
        setSortTypeId: (state, action: PayloadAction<number>) => {
            state.sortId = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        setFilters: (state, action: PayloadAction<IFilters>) => {
            const sort = state.sortTypesList.findIndex(
                (sort) => sort.sortName === action.payload.sort
            );
            const categoryId = Number(action.payload.category);
            const currentPage = Number(action.payload.page);
            const correctOrder = action.payload.order === "desc" || action.payload.order === "asc";

            state.sortId = sort < 0 ? 0 : sort;
            state.categoryId = isNaN(categoryId) ? 0 : categoryId;
            state.currentPage = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;
            state.order = correctOrder ? action.payload.order : "desc";
        },
    },
});

export default filterSlice.reducer;

export const { setCategoryId, setSortTypeId, setCurrentPage, setSearchValue, setFilters } =
    filterSlice.actions;
