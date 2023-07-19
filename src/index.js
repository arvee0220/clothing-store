import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
// import reportWebVitals from './reportWebVitals';

import { CartProvider } from './context/cart.context';
import { CategoriesProvider } from './context/categories.context';
import { store } from './store/store';

import './index.scss';

const rootElement = document.getElementById('root');

render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <CategoriesProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </CategoriesProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    rootElement
);

// reportWebVitals();
