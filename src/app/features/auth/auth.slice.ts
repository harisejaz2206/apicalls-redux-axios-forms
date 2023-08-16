import { createSlice } from "@reduxjs/toolkit";
import initialAuthState from "./auth.initialstate";
import { login, register } from "./auth.thunk";
import { logoutUser } from "../../services/logoutuser";

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      state.token = "";
      state.user = null;
      state.isLoggedIn = false;
      // logoutUser();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.token = action.payload.payload?.token;
      state.user = action.payload.payload?.user;
      // console.log("AUTH.SLICE.TS - The action payload is:", action.payload);
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
    });

    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.payload?.user;
      // localStorage.setItem()
    });

    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  // extraReducers if you are using createAsyncThunk
});

// Exports
export const { actions } = authSlice;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
