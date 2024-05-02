import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const {
    SET_CURRENT_USER,
    CHECK_USER_SESSION,
    EMAIL_SIGN_IN_START,
    GOOGLE_SIGN_IN_START,
    SIGN_IN_FAILED,
    SIGN_IN_SUCCESS,
} = USER_ACTION_TYPES;

export const setCurrentUser = (user) => createAction(SET_CURRENT_USER, user);

export const checkUserSession = () => createAction(CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
    createAction(EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) => createAction(SIGN_IN_SUCCESS, user);

export const signInFailed = (error) => createAction(SIGN_IN_FAILED, error);
