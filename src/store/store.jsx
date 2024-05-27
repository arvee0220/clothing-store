import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

const persistConfig = {
    key: "root", // The key for the persist
    storage, // The storage to use
    blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// root-reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(import.meta.env.VITE_ENV !== "production" ? logger : []),

    preloadedState: {},
});

export const persistor = persistStore(store);
