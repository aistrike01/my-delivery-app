import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ICartItem, plusItem, selectCartItemById } from "../../store/cart";
import { IProduct } from "../../store/product";

const typesList = ["тонкое", "традиционное"];
const sizesList = ["26", "30", "40"];

export const ProductBlock: React.FC<IProduct> = ({
    id,
    title,
    price,
    imageUrl,
    sizes,
    types,
}: IProduct) => {
    const dispatch = useAppDispatch();
    const [activeSize, setActiveSize] = React.useState(0);
    const [activeType, setActiveType] = React.useState(0);
    const newId = id + activeType + activeSize;
    const product = useAppSelector(selectCartItemById(newId));

    const onClickAdd = () => {
        const item: ICartItem = {
            id: newId,
            title,
            price,
            imageUrl,
            type: typesList[activeType],
            size: sizesList[activeSize],
            count: 0,
        };
        dispatch(plusItem(item));
    };

    const count = product ? product.count : 0;

    return (
        <div className="product-block__wrapper">
            <div className="product-block">
                <Link to={`/product/${id}`}>
                    <img className="product-block__image" src={imageUrl} alt="Product" />
                </Link>
                <h4 className="product-block__title">{title}</h4>
                <div className="product-block__selector">
                    <ul>
                        {types.map((item, index) => {
                            return (
                                <li
                                    key={types[item] + index}
                                    onClick={() => {
                                        setActiveType(index);
                                    }}
                                    className={activeType === index ? "active" : ""}
                                >
                                    {typesList[item]}
                                </li>
                            );
                        })}
                    </ul>
                    <ul>
                        {sizes.map((size, index) => {
                            return (
                                <li
                                    key={size + index}
                                    onClick={() => setActiveSize(index)}
                                    className={activeSize === index ? "active" : ""}
                                >
                                    {size} см.
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="product-block__bottom">
                    <div className="product-block__price">от {price} ₴</div>
                    <button
                        className="button button--outline button--add"
                        onClick={() => onClickAdd()}
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {count > 0 && <i>{count}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
};
