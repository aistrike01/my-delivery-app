import React from "react";
import { useAppDispatch } from "../hooks/redux";
import { setCategoryId } from "../store/filter/slice";

interface CategoriesProps {
    categoryId: number;
    categoriesList: string[];
}

const Categories: React.FC<CategoriesProps> = React.memo(
    ({ categoryId, categoriesList }: CategoriesProps) => {
        const dispatch = useAppDispatch();

        const setCategory = (value: number) => dispatch(setCategoryId(value));

        return (
            <div className="categories">
                <ul>
                    {categoriesList.map((name: string, index: number) => {
                        return (
                            <li
                                key={name + index}
                                className={categoryId === index ? "active" : ""}
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
);

export default Categories;
