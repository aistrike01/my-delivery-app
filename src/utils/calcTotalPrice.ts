import { ICartItem } from "../store/cart/types";

export default function calcTotalPrice(items: ICartItem[]): number {
    return items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
    }, 0);
}
