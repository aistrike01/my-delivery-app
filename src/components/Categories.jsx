import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectCategoriesList,
    selectCategoryValue,
    setValue,
} from "../redux/slices/categoriesSlice";

export default function Categories() {
    const dispatch = useDispatch();

    const categoriesList = useSelector(selectCategoriesList);
    const category = useSelector(selectCategoryValue);
    const setCategory = (value) => dispatch(setValue(value));

    return (
        <div className="categories">
            <ul>
                {categoriesList.map((name, index) => {
                    return (
                        <li
                            key={name + index}
                            className={category === index ? "active" : ""}
                            onClick={() => setCategory(index)}
                        >
                            {name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
