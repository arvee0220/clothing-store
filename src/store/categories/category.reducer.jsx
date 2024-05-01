import { CATEGORY_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
    categories: [],
};

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE,
    action = {}
) => {
    const { type, payload } = action;

    const {
        FETCH_CATEGORIES_START,
        FETCH_CATEGORIES_SUCCESS,
        FETCH_CATEGORIES_FAILED,
    } = CATEGORY_ACTION_TYPES;

    switch (type) {
        case FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: payload,
            };
        case FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};
