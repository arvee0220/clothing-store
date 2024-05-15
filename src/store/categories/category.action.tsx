import { CATEGORY_ACTION_TYPES, Category } from "./category.types";
import { createAction, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";

const { FETCH_CATEGORIES_START, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILED } = CATEGORY_ACTION_TYPES;

export type FetchCategoriesStart = Action<typeof FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<typeof FETCH_CATEGORIES_SUCCESS, Category[]>;
export type FetchCategoriesFailed = ActionWithPayload<typeof FETCH_CATEGORIES_FAILED, Error>;

export const fetchCategoriesStart = (): FetchCategoriesStart => createAction(FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray: Category[]): FetchCategoriesSuccess =>
	createAction(FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error: Error): FetchCategoriesFailed =>
	createAction(FETCH_CATEGORIES_FAILED, error);

// Union
export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;
