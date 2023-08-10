import { createSlice } from "@reduxjs/toolkit";
import initialAuthState from "./auth.initialstate";
import { login, register } from "./auth.thunk";

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout(state, action) {
      state.token = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      debugger;
      state.loading = true;
      console.log(action);
      // state.token = action.payload.token;
    });

    builder.addCase(login.rejected, (state, action) => {
      debugger;
      state.loading = false;
    });

    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
    });
  },
  // extraReducers if you are using createAsyncThunk
});

// Exports
export const { actions } = authSlice;
export default authSlice.reducer;
