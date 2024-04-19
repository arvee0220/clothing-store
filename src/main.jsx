import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { UserProvider } from "./context/user.context.jsx";
import "./index.scss";
import { ProductsProvider } from "./context/product.context.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <ProductsProvider>
                    <App />
                </ProductsProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);
