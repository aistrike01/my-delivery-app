import React from "react";

const categoriesList = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

export default function Categories({ category, setCategory }) {
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
