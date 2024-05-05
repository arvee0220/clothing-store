import { takeLatest, put, all, call } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import { signInFailed, signInSuccess } from "./user.action";
import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

const { CHECK_USER_SESSION, GOOGLE_SIGN_IN_START, EMAIL_SIGN_IN_START } =
    USER_ACTION_TYPES;

export const getSnapShotFromUserAuth = function* (userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additionalDetails
        );

        if (!userSnapshot) throw new Error("No user data available");

        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        );
    } catch (error) {
        yield put(signInFailed(error));
    }
};

export const signInWithGoogle = function* () {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapShotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
};

export const signInWithEmail = function* ({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );
        yield call(getSnapShotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
};

export const isUserAuthenticated = function* () {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapShotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
};

export const onGoogleSignInStart = function* () {
    yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export const onCheckUserSession = function* () {
    yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
};

export const onEmailSignInStart = function* () {
    yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
};

export const userSaga = function* () {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
    ]);
};
