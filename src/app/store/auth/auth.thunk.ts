import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialAuthState from "./auth.initialstate";
import axios from "axios";

// ASYNC THUNKS
// Async thunk for logging in
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post(
      "http://localhost:8081/api/v1/auth/login",
      credentials
    );
    const token = response.data.token;

    // You may want to store the token somewhere, such as in the Redux state or local storage
    // Here you could dispatch an action to save the token in your state:
    // dispatch(saveToken(token));

    return response.data;
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
      "/api/v1/auth/register",
      credentials,
      config
    );
    return response.data;
  }
);
