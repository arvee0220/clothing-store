import { createSelector } from "reselect";

// Input selector
const selectCategoriesReducer = (state) => state.categories;
const selectCategoryItems = (state) => state.categories.categories;

export const selectCategoriesMap = createSelector(
    [selectCategoryItems],
    (categories) =>
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoriesReducer],
    (categories) => categories.isLoading
);
