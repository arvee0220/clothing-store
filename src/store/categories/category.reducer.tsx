import { UnknownAction } from "@reduxjs/toolkit";
import { Category } from "./category.types";
import {
	fetchCategoriesStart,
	fetchCategoriesSuccess,
	fetchCategoriesFailed,
} from "./category.action";

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

export const categoriesReducer = (
	state = CATEGORIES_INITIAL_STATE,
	action: UnknownAction
): CategoriesState => {
	if (fetchCategoriesStart.match(action)) ({ ...state, isLoading: true });

	if (fetchCategoriesSuccess.match(action))
		({ ...state, categories: action.payload, isLoading: false });

	if (fetchCategoriesFailed.match(action))
		({ ...state, error: action.payload, isLoading: false });

	return state;
};
