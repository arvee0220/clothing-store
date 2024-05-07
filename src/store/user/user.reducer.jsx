import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    const {
        SIGN_IN_SUCCESS,
        SIGN_IN_FAILED,
        SIGN_OUT_FAILED,
        SIGN_OUT_SUCCESS,
        SIGN_UP_FAILED,
    } = USER_ACTION_TYPES;

    switch (type) {
        case SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload };
        case SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null };
        case SIGN_OUT_FAILED:
        case SIGN_IN_FAILED:
        case SIGN_UP_FAILED:
            return { ...state, error: payload };
        default:
            return state;
    }
};
