import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./context/user_context/user.context";
import "./index.scss";
import { CategoriesProvider } from "./context/categories_context/categories.context";
import { CartProvider } from "./context/cart _context/cart.context";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new ApolloClient({
	uri: "https://crwn-clothing.com/",
	cache: new InMemoryCache(),
});

root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<UserProvider>
					<CategoriesProvider>
						<CartProvider>
							<App />
						</CartProvider>
					</CategoriesProvider>
				</UserProvider>
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>
);
