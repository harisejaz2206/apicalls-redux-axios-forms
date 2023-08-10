import { RootState } from "../rootReducer";

// to get the auth status
export const selectAuthStatus = (state: RootState) => state.auth.loading;

// to get the user info
export const selectAuthEntities = (state: RootState) => state.auth.user;

// to get the auth token
export const selectAuthToken = (state: RootState) => state.auth.token;
