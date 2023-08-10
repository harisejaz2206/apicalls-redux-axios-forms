import { combineReducers } from "redux";
import postSlice from "./post/post.slice";
import authSlice from "./auth/auth.slice";

const rootReducer = combineReducers({
  auth: authSlice,
  post: postSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

// Purpose: This file is responsible for combining all the individual reducers (slices of state) into a single root reducer.

// combineReducers: A function provided by Redux that takes an object with all the slice reducers and combines them into a single reducer function.
// RootState: A TypeScript type that represents the entire state tree. It's used to help TypeScript understand the structure of the state.
