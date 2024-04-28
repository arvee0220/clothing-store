import { createContext, useCallback, useEffect, useReducer } from "react";
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";
import { USER_ACTION_TYPES } from "../reducerActionTypes/userActionTypes";
import { createAction } from "../utils/reducer/reducer.utils";

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

const INITIAL_STATE = {
    currentUser: null,
};

const userReducer = (state, action) => {
    const { type, payload } = action;
    const { SET_CURRENT_USER } = USER_ACTION_TYPES;

    switch (type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const { SET_CURRENT_USER } = USER_ACTION_TYPES;

    const { currentUser } = state;

    const setCurrentUser = useCallback(
        (user) => {
            dispatch(createAction(SET_CURRENT_USER, user));
        },
        [dispatch, SET_CURRENT_USER]
    );

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }

            setCurrentUser(user);
        });

        return unsubscribe;
    }, [setCurrentUser]);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
