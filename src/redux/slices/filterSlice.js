import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sortType: 0,
    pageCount: 1,
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
    sortTypes: [
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
            state.sortType = action.payload;
        },
        setPageCount: (state, action) => {
            state.pageCount = action.payload;
        },
    },
});

export default filterSlice.reducer;

export const { setCategoryId, setSortTypeId, setPageCount } = filterSlice.actions;
