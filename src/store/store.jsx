import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import {
    // persistStore,
    persistReducer,
    /* REHYDRATE,
    PURGE,
    REGISTER,
    FLUSH,
    PAUSE,
    PERSIST, */
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
// import { USER_ACTION_TYPES } from "./user/user.types";

// const { SIGN_IN_SUCCESS } = USER_ACTION_TYPES;

// redux-persist
const persistConfig = {
    key: "root", // The key for the persist
    storage, // The storage to use
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// root-reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false /* {
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
            } */,
        })
            .concat(import.meta.env.VITE_ENV !== "production" ? logger : [])
            .concat(sagaMiddleware),
    preloadedState: {},
});

// Run the saga
sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);
