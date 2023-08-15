import { createSlice } from "@reduxjs/toolkit";
import { initialPostState } from "./post.initialstate";
import {
  fetchAllPosts,
  fetchPostById,
  createPost,
  updatePostById,
  deletePost,
} from "./post.thunk";

const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {},
  extraReducers: (builder) => {
    // extraReducers ≠ fetchAllPosts
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload?.posts;
      console.log(
        "The action payload when the fulfilled state is triggered is:",
        action.payload?.posts
      );
      state.paginationInfo = {
        page: action.payload?.paginationInfo.page!,
        // totalRecords: action.payload?.payload.paginationInfo.totalRecords,
        totalRecords: action.payload?.paginationInfo.totalRecords!,
        totalPages: action.payload?.paginationInfo.totalPages as number,
      };
      // state.status;
    });

    builder.addCase(fetchAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // extraReducers ≠ fetchPostById
    builder.addCase(fetchPostById.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.loading = false;
      if (state.posts && action.payload) {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload?._id
        );
        if (index !== -1) {
          state.posts = [
            ...state.posts.slice(0, index),
            action.payload,
            ...state.posts.slice(index + 1),
          ];
        }
      }
    });

    builder.addCase(fetchPostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch post by ID";
    });

    // extraReducers ≠ deletePost
    builder.addCase(deletePost.pending, (state, action) => {
      state.loading = true;
      console.log("In Pending State");
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;

      const deletedId = action.payload.payload?.id;

      if (state.posts) {
        state.posts = state.posts.filter((post) => post._id !== deletedId);
      }
      console.log("In deleted state");
    });

    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch post by ID";
      console.log("In rejected state", action);
    });

    // extraReducers ≠ createPost
    builder.addCase(createPost.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      if (state.posts) {
        state.posts = [action.payload.payload?.post!, ...state.posts];
      }
    });

    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to create post";
    });

    // extraReducers ≠ updatePostById
    builder.addCase(updatePostById.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updatePostById.fulfilled, (state, action) => {
      state.loading = false;
      if (state.posts) {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload.payload?.updatedPost._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload.payload?.updatedPost!; // Assuming the payload contains the updated post
        }
      }
    });

    builder.addCase(updatePostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update post";
    });
  },
});

// exports
export const { actions } = postSlice;
export default postSlice.reducer;
