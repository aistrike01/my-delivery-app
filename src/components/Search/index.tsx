import debounce from "lodash.debounce";
import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setSearchValue } from "../../store/filter";
import styles from "./Search.module.scss";

export default function Search() {
    const dispatch = useAppDispatch();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [value, setValue] = React.useState("");

    const onClickClear = () => {
        dispatch(setSearchValue(""));
        setValue("");
        inputRef.current?.focus();
    };

    const debounceSearch = React.useMemo(
        () =>
            debounce((str: string) => {
                dispatch(setSearchValue(str));
            }, 200),
        [dispatch]
    );

    const updateSearchValue = React.useCallback(debounceSearch, [debounceSearch]);

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                enableBackground="new 0 0 32 32"
                id="Editable-line"
                version="1.1"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="14"
                    cy="14"
                    fill="none"
                    id="XMLID_42_"
                    r="9"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                />
                <line
                    fill="none"
                    id="XMLID_44_"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    x1="27"
                    x2="20.366"
                    y1="27"
                    y2="20.366"
                />
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder="Поиск пиццы..."
            />
            {value && (
                <svg
                    onClick={onClickClear}
                    className={styles.close}
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs></defs>
                    <title />
                    <g id="cross">
                        <line className={styles.closeLine} x1="7" x2="25" y1="7" y2="25" />
                        <line className={styles.closeLine} x1="7" x2="25" y1="25" y2="7" />
                    </g>
                </svg>
            )}
        </div>
    );
}
