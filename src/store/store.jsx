import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import {
	persistStore,
	persistReducer,
	REHYDRATE,
	PURGE,
	REGISTER,
	FLUSH,
	PAUSE,
	PERSIST,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

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
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			.concat(import.meta.env.VITE_ENV !== "production" ? logger : [])
			.concat(sagaMiddleware),
	preloadedState: {},
});

export const persistor = persistStore(store);
