import { takeLatest, put, call, all } from "typed-redux-saga";

import { USER_ACTION_TYPES } from "./user.types";
import {
	EmailSignInStart,
	SignUpStart,
	SignUpSuccess,
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
	UserData,
	AdditionalInformation,
} from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

const {
	CHECK_USER_SESSION,
	GOOGLE_SIGN_IN_START,
	EMAIL_SIGN_IN_START,
	SIGN_UP_START,
	SIGN_UP_SUCCESS,
	SIGN_OUT_START,
} = USER_ACTION_TYPES;

// Sign-in Sagas
export const getSnapShotFromUserAuth = function* (
	userAuth: User,
	additionalDetails?: AdditionalInformation
) {
	try {
		const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);

		if (userSnapshot) {
			yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
};

export const signInWithGoogle = function* () {
	try {
		const { user } = yield* call(signInWithGooglePopup);
		yield* call(getSnapShotFromUserAuth, user);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
};

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
	try {
		const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);

		if (userCredential) {
			const { user } = userCredential;

			yield* call(getSnapShotFromUserAuth, user);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export const isUserAuthenticated = function* () {
	try {
		const userAuth = yield* call(getCurrentUser);
		if (!userAuth) return;
		yield* call(getSnapShotFromUserAuth, userAuth);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
};

export const onGoogleSignInStart = function* () {
	yield* takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export const onCheckUserSession = function* () {
	yield* takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
};

export const onEmailSignInStart = function* () {
	yield* takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
};

// Sign-up Sagas
export const signUp = function* ({ payload: { email, password, displayName } }: SignUpStart) {
	try {
		const userCredentials = yield* call(createAuthUserWithEmailAndPassword, email, password);

		if (userCredentials) {
			const { user } = userCredentials;

			yield* put(signUpSuccess(user, { displayName }));
		}
	} catch (error) {
		yield* put(signUpFailed(error as Error));
	}
};

export const signInAfterSignUp = function* ({
	payload: { user, additionalDetails },
}: SignUpSuccess) {
	yield* call(getSnapShotFromUserAuth, user, additionalDetails);
};

export const onSignUpStart = function* () {
	yield* takeLatest(SIGN_UP_START, signUp);
};

export const onSignUpSuccess = function* () {
	yield* takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp);
};

// Sign-out saga
export const signOut = function* () {
	try {
		yield* call(signOutUser);
		yield* put(signOutSuccess());
	} catch (error) {
		yield* put(signOutFailed(error as Error));
	}
};

export const onSignOutStart = function* () {
	yield* takeLatest(SIGN_OUT_START, signOut);
};

export const userSaga = function* () {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
};
