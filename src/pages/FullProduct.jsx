import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Skeleton from "../components/ProductBlock/Skeleton";
import { fetchProduct, selectProduct } from "../redux/slices/productSlice";
export default function FullProduct() {
    const { id } = useParams();

    const { product, status } = useSelector(selectProduct);

    const { title, imageUrl, price } = product;
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchProduct(id));
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
}
