import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./categories/catagory.saga";

export const rootSaga = function* () {
    yield all([call(categoriesSaga)]);
};
