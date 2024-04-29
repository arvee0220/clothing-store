import { CATEGORY_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
    categories: [],
};

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE,
    action = {}
) => {
    const { type, payload } = action;

    const { SET_CATEGORIES } = CATEGORY_ACTION_TYPES;

    switch (type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: payload,
            };
        default:
            return state;
    }
};
