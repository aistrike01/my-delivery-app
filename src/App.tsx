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
const Authorization = React.lazy(
    () => import(/* webpackChunkName: "Authorization"*/ "./pages/Authorization")
);

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="product/:id" element={<FullProduct />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Authorization />} />
        </Routes>
    );
}
