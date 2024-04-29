import { CATEGORY_ACTION_TYPES } from "./category.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const { SET_CATEGORIES } = CATEGORY_ACTION_TYPES;

export const setCategories = (category) =>
    createAction(SET_CATEGORIES, category);
