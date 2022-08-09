import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
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
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setValue } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const selectCategoriesList = (state) => state.categories.categoriesList;
export const selectCategoryValue = (state) => state.categories.value;
