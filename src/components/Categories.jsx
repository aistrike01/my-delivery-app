import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

export default function Categories() {
    const dispatch = useDispatch();
    const { categoryId: category, categoriesList } = useSelector((state) => state.filter);

    const setCategory = (value) => dispatch(setCategoryId(value));

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
