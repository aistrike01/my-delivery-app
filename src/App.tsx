import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import "./scss/app.scss";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart"*/ "./pages/Cart"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound"*/ "./pages/NotFound"));
const FullProduct = React.lazy(
    () => import(/* webpackChunkName: "FullProduct"*/ "./pages/FullProduct")
);
const Admin = React.lazy(() => import(/* webpackChunkName: "Admin"*/ "./pages/Admin"));

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route
                    path="cart"
                    element={
                        <React.Suspense fallback={<h4>'Загрузка корзины...'</h4>}>
                            <Cart />
                        </React.Suspense>
                    }
                />
                <Route
                    path="product/:id"
                    element={
                        <React.Suspense fallback={<h4>'Загрузка продукта...'</h4>}>
                            <FullProduct />
                        </React.Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <React.Suspense fallback={<h4>'Загрузка...'</h4>}>
                            <NotFound />
                        </React.Suspense>
                    }
                />
            </Route>
            <Route
                path="/admin"
                element={
                    <React.Suspense fallback={<h4>'Загрузка админ панели...'</h4>}>
                        <Admin />
                    </React.Suspense>
                }
            />
        </Routes>
    );
}
