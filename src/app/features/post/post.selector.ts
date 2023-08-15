import { RootState } from "../../../rootReducer";

// to get the loading status of posts
export const selectPostsLoading = (state: RootState) => state.post.loading;

// to get all the posts
export const selectAllPosts = (state: RootState) => state.post.posts;

// to get the status of posts
export const selectPostsStatus = (state: RootState) => state.post.status;

// to get the error related to posts
export const selectPostsError = (state: RootState) => state.post.error;
