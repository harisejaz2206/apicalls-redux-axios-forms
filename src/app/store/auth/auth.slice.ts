import { createSlice } from "@reduxjs/toolkit";
import initialAuthState from "./auth.initialstate";

const postSlice = createSlice({
  name: "posts",
  initialState: initialAuthState,
  reducers: {
    // your reducers here
  },
  // extraReducers if you are using createAsyncThunk
});

// Exports
export const { actions } = postSlice;
export default postSlice.reducer;
