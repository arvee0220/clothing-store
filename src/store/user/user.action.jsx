import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const { SET_CURRENT_USER } = USER_ACTION_TYPES;

export const setCurrentUser = (user) => createAction(SET_CURRENT_USER, user);
