import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    const { SIGN_IN_SUCCESS, SIGN_IN_FAILED } = USER_ACTION_TYPES;

    switch (type) {
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload,
            };
        case SIGN_IN_FAILED:
            return { ...state, error: payload };
        default:
            return state;
    }
};
