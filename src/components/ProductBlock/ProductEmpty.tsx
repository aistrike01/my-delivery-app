import img from "../../assets/img/empty-product.png";

export default function ProductEmpty() {
    return (
        <div className="cart cart--empty">
            <h2>Такого продукта - не найдено 😕</h2>
            <p>Попробуйте поискать что-то другое.</p>
            <img src={img} alt="Empty cart" />
        </div>
    );
}
