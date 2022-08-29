import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./store/store";

const rootElem = document.getElementById("root");

if (rootElem) {
    const root = ReactDOM.createRoot(rootElem);

    root.render(
        <Provider store={store}>
            <BrowserRouter>
                <React.Suspense fallback={<h4>'Загрузка авторизации...'</h4>}>
                    <App />
                </React.Suspense>
            </BrowserRouter>
        </Provider>
    );
}
