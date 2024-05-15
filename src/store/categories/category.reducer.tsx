import { CATEGORY_ACTION_TYPES, Category } from "./category.types";
import { CategoryAction } from "./category.action";

export type CategoriesState = {
	readonly categories: Category[];
	readonly isLoading: boolean;
	readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE = {
	categories: [],
	isLoading: false,
	error: null,
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as CategoryAction) => {
	const { FETCH_CATEGORIES_START, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILED } =
		CATEGORY_ACTION_TYPES;

	switch (action.type) {
		case FETCH_CATEGORIES_START:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_CATEGORIES_SUCCESS:
			return {
				...state,
				isLoading: false,
				categories: action.payload,
			};
		case FETCH_CATEGORIES_FAILED:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
