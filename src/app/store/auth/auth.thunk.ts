import { createAsyncThunk } from "@reduxjs/toolkit";
// import initialAuthState from "./auth.initialstate";
import axios from "axios";

// ASYNC THUNKS
// Async thunk for logging in
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/auth/login",
        credentials
      );
      console.log("The response data is:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error during login:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error during login"
      );
    }
  }
);

// Async thunk for registering
export const register = createAsyncThunk(
  "auth/register",
  async (credentials: {
    username: string;
    password: string;
    email: string;
  }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      "http://localhost:8081/api/v1/auth/register",
      credentials,
      config
    );
    return response.data;
  }
);
