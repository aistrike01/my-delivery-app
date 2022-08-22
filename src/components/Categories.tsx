import React from "react";
import { useAppDispatch } from "../hooks/redux";
import { setCategoryId } from "../store/filter";

interface CategoriesProps {
    categoryId: number;
    categoriesList: string[];
}

export const Categories: React.FC<CategoriesProps> = React.memo(
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
