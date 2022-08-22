import img from "../assets/img/empty-cart.png";
import { GoBack } from "../components/Buttons";

const CartEmpty = () => {
    return (
        <div className="cart cart--empty">
            <h2>Корзина пустая 😕</h2>
            <p>
                Вероятней всего, вы не заказывали ещё пиццу.
                <br />
                Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={img} alt="Empty cart" />
            <GoBack />
        </div>
    );
};

export default CartEmpty;
