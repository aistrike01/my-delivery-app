import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selectFilter, setCategoryId } from "../redux/slices/filterSlice";

export default function Categories() {
    const dispatch = useAppDispatch();
    const { categoryId, categoriesList } = useAppSelector(selectFilter);

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
