import { configureStore, Middleware } from "@reduxjs/toolkit";
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
	PersistConfig,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import { USER_ACTION_TYPES } from "./user/user.types";
import { PersistPartial } from "redux-persist/es/persistReducer";

const { SIGN_IN_SUCCESS } = USER_ACTION_TYPES;

export type RootState = ReturnType<typeof rootReducer>;

// redux-persist
const persistConfig: PersistConfig<RootState> = {
	key: "root", // The key for the persist
	storage, // The storage to use
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// root-reducer
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		const middlewares = getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
					SIGN_IN_SUCCESS,
				],
				ignoredPaths: ["user.currentUser.createdAt"],
			},
		});

		if (import.meta.env.VITE_ENV !== "production") middlewares.push(logger as Middleware);

		middlewares.push(sagaMiddleware);

		return middlewares;
	},
	preloadedState: {} as RootState & PersistPartial,
});

// Run the saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
