import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../services/user.service";
import { ILogInInterface } from "./interfaces/login.interface";
import { ISignUpInterface } from "./interfaces/sign-up.interface";
import { RootState } from "../../../rootReducer";
import { selectAuthToken } from "./auth.selector";

// ASYNC THUNKS
// Async thunk for logging in
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: ILogInInterface, thunkAPI) => {
    try {
      const response = await userService.loginUser(credentials);
      // console.log("AUTH.THUNK.TS - The response data is:", response);
      return response;
    } catch (error: any) {
      // console.error("Error during login:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error during login"
      );
    }
  }
);

// Async thunk for registering
export const register = createAsyncThunk(
  "auth/register",
  async (credentials: ISignUpInterface, { getState }) => {
    const token = selectAuthToken(getState() as RootState);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // const response = await userService.signUpUser(credentials, config);
    const response = await userService.signUpUser(credentials);
    return response;
  }
);
