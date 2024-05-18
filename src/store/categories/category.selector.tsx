import { createSelector } from "reselect";
import { CategoriesState } from "./category.reducer";
import { Category, CategoryMap } from "./category.types";
import { RootState } from "../store";

// Input selector
const selectCategoriesReducer = (state: RootState): CategoriesState => state.categories;
const selectCategoryItems = createSelector(
	[selectCategoriesReducer],
	(categoriesState): Category[] => categoriesState.categories
);

export const selectCategoriesMap = createSelector(
	[selectCategoryItems],
	(categories): CategoryMap =>
		categories.reduce((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
	[selectCategoriesReducer],
	(categories) => categories.isLoading
);
