import { takeLatest, put, all, call } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import {
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    signUpSuccess,
} from "./user.action";
import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
} from "../../utils/firebase/firebase.utils";

const {
    CHECK_USER_SESSION,
    GOOGLE_SIGN_IN_START,
    EMAIL_SIGN_IN_START,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    SIGN_OUT_START,
} = USER_ACTION_TYPES;

// Sign-in Sagas
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

// Sign-up Sagas
export const signUp = function* ({
    payload: { email, password, displayName },
}) {
    try {
        const { user } = yield call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
};

export const signInAfterSignUp = function* ({
    payload: { user, additionalDetails },
}) {
    yield call(getSnapShotFromUserAuth, user, additionalDetails);
};

export const onSignUpStart = function* () {
    yield takeLatest(SIGN_UP_START, signUp);
};

export const onSignUpSuccess = function* () {
    yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp);
};

// Sign-out saga
export const signOut = function* () {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed, error);
    }
};

export const onSignOutStart = function* () {
    yield takeLatest(SIGN_OUT_START, signOut);
};

export const userSaga = function* () {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
};
