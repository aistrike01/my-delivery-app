import React from "react";
import { useParams } from "react-router-dom";
import Skeleton from "../components/ProductBlock/Skeleton";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchProduct, selectProduct } from "../store/slices/productSlice";

const FullProduct: React.FC = () => {
    const { id } = useParams();

    const { product, status } = useAppSelector(selectProduct);

    const { title, imageUrl, price } = product;
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        id && dispatch(fetchProduct(id));
    }, [id, dispatch]);

    if (status === "loading") {
        return (
            <div className="container">
                <div style={{ margin: "0 auto", textAlign: "center", width: "250px" }}>
                    <Skeleton />
                </div>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="container">
                <div style={{ margin: "0 auto", textAlign: "center", width: "250px" }}>
                    <h2>Помилка під час завантаження піци!</h2>
                    <Skeleton />
                </div>
            </div>
        );
    }
    return (
        <div className="container">
            <div style={{ margin: "0 auto", textAlign: "center", width: "250px" }}>
                <img className="product-block__image" src={imageUrl} alt="Product" />
                <h2 className="product-block__block__title">{title}</h2>
                <h4 className="product-block__price">{price} ₴</h4>
            </div>
        </div>
    );
};

export default FullProduct;
