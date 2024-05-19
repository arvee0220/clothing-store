import { USER_ACTION_TYPES } from "./user.types";
import {
	createAction,
	withMatcher,
	Action,
	ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { AdditionalInformation, UserData } from "../../utils/firebase/firebase.utils";

const {
	SET_CURRENT_USER,
	CHECK_USER_SESSION,
	EMAIL_SIGN_IN_START,
	GOOGLE_SIGN_IN_START,
	SIGN_IN_FAILED,
	SIGN_IN_SUCCESS,
	SIGN_UP_START,
	SIGN_UP_SUCCESS,
	SIGN_UP_FAILED,
	SIGN_OUT_START,
	SIGN_OUT_SUCCESS,
	SIGN_OUT_FAILED,
} = USER_ACTION_TYPES;

export type CheckUserSession = Action<typeof CHECK_USER_SESSION>;

export type SetCurrentUser = ActionWithPayload<typeof SET_CURRENT_USER, UserData>;

export type GoogleSignInStart = Action<typeof GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<
	typeof EMAIL_SIGN_IN_START,
	{ email: string; password: string }
>;

export type SignInSuccess = ActionWithPayload<typeof SIGN_IN_SUCCESS, UserData>;

export type SignInFailed = ActionWithPayload<typeof SIGN_IN_FAILED, Error>;

export type SignUpStart = ActionWithPayload<
	typeof SIGN_UP_START,
	{ email: string; password: string; displayName: string }
>;

export type SignUpSuccess = ActionWithPayload<
	typeof SIGN_UP_SUCCESS,
	{ user: UserData; additionalDetails: AdditionalInformation }
>;

export type SignUpFailed = ActionWithPayload<typeof SIGN_UP_FAILED, Error>;

export type SignOutStart = Action<typeof SIGN_OUT_START>;

export type SignOutSuccess = Action<typeof SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<typeof SIGN_OUT_FAILED, Error>;

export const checkUserSession = withMatcher(
	(): CheckUserSession => createAction(CHECK_USER_SESSION)
);

export const setCurrentUser = withMatcher(
	(user: UserData): SetCurrentUser => createAction(SET_CURRENT_USER, user)
);

export const googleSignInStart = withMatcher(
	(): GoogleSignInStart => createAction(GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher((email: string, password: string) =>
	createAction(EMAIL_SIGN_IN_START, { email, password })
);

export const signInSuccess = withMatcher(
	(user: UserData & {id: string}): SignInSuccess => createAction(SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher(
	(error: Error): SignInFailed => createAction(SIGN_IN_FAILED, error)
);

export const signUpStart = withMatcher(
	(email: string, password: string, displayName: string): SignUpStart =>
		createAction(SIGN_UP_START, { email, password, displayName })
);

export const signUpSuccess = withMatcher(
	(user: UserData, additionalDetails: AdditionalInformation): SignUpSuccess =>
		createAction(SIGN_UP_SUCCESS, { user, additionalDetails })
);

export const signUpFailed = withMatcher(
	(error: Error): SignUpFailed => createAction(SIGN_UP_FAILED, error)
);

export const signOutStart = withMatcher((): SignOutStart => createAction(SIGN_OUT_START));

export const signOutSuccess = withMatcher((): SignOutSuccess => createAction(SIGN_OUT_SUCCESS));

export const signOutFailed = withMatcher(
	(error: Error): SignOutFailed => createAction(SIGN_OUT_FAILED, error)
);
