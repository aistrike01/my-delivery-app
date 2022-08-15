import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";
import FullProduct from "./pages/FullProduct";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./scss/app.scss";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="product/:id" element={<FullProduct />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
