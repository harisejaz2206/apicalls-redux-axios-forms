import { createAsyncThunk } from "@reduxjs/toolkit";
import { postService } from "../../services/post.service";
import { ICreatePostRequest } from "./interfaces/createpost.interface";
import { IPost } from "./interfaces/post.interface";
import { selectAuthToken } from "../auth/auth.selector";
import { RootState } from "../../../rootReducer";

export const fetchAllPosts = createAsyncThunk(
  "post/getAllPost",
  async (params: { page: number; limit: number }) => {
    const response = await postService.getAllPosts(params.page, params.limit);

    console.log("Response:", response);
    console.log("Response Payload:", response.payload);

    if (response && response.payload) {
      return response.payload;
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "post/fetchById",
  async (id: string) => {
    const response = await postService.getPostById(id);
    return response.payload?.post;
  }
);

export const createPost = createAsyncThunk(
  "post/create",
  async (post: IPost, { getState }) => {
    const state = getState() as RootState;

    const response = await postService.create(post);
    return response;
  }
);

export const updatePostById = createAsyncThunk(
  "post/updateById",
  async ({ id, data }: { id: string; data: IPost }) => {
    const response = await postService.update(id, data);
    return response;
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id: string, thunkAPI) => {
    try {
      debugger;
      console.log("id", id);
      const response = await postService.deletePost(id);
      return response;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue("Error during login");
    }
  }
);
