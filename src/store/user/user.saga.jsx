import { takeLatest, put, all, call } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import { signInFailed, signInSuccess } from "./user.action";
import {
    getCurrenUser,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const { CHECK_USER_SESSION } = USER_ACTION_TYPES;

export const getSnapShotFromUserAuth = function* (userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        );
    } catch (error) {
        yield put(signInFailed(error));
    }
};

export const isUserAuthenticated = function* () {
    try {
        const userAuth = yield call(getCurrenUser);
        if (!userAuth) return;
        yield call(getSnapShotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
};

export const onCheckUserSession = function* () {
    yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
};

export const userSaga = function* () {
    yield all([call(onCheckUserSession)]);
};
