import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
} from "./category.action";
import { CATEGORY_ACTION_TYPES } from "./category.types";

const { FETCH_CATEGORIES_START } = CATEGORY_ACTION_TYPES;

export const fetchCategoriesAsync = function* () {
    try {
        const categoriesArray = yield call(
            getCategoriesAndDocuments,
            "categories"
        );
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
};

export const onFetchCategories = function* () {
    yield takeLatest(FETCH_CATEGORIES_START, fetchCategoriesAsync);
};

export const categoriesSaga = function* () {
    yield all([call(onFetchCategories)]);
};
