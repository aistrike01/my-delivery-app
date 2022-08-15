import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ISortType {
    name: string;
    sortName: string;
    order: string;
}

export interface IFilters {
    sort: number;
    category: string;
    page: string;
    order: string;
}

interface IFilterState {
    categoryId: number;
    sortId: number;
    currentPage: number;
    searchValue: string;
    order: string;
    categoriesList: string[];
    sortTypesList: ISortType[];
}

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
            state.sortId = action.payload.sort;
            state.categoryId = Number(action.payload.category);
            state.currentPage = Number(action.payload.page);
            state.order = action.payload.order;
        },
    },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectCurrentPage = (state: RootState) => state.filter.currentPage;

export default filterSlice.reducer;

export const { setCategoryId, setSortTypeId, setCurrentPage, setSearchValue, setFilters } =
    filterSlice.actions;
