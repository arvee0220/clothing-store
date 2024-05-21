import { all, call } from "typed-redux-saga";
import { categoriesSaga } from "./categories/category.saga";
import { userSaga } from "./user/user.saga";

export const rootSaga = function* () {
	yield all([call(categoriesSaga), call(userSaga)]);
};
