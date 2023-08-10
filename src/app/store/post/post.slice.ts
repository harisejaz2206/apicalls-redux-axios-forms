import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialPostState from "./post.initialstate";
import axios from "axios";

const postSlice = createSlice({
  name: "posts",
  initialState: initialPostState,
  reducers: {
    // your reducers here
  },
  // extraReducers if you are using createAsyncThunk
});

// Exports
export const { actions } = postSlice;
export default postSlice.reducer;
