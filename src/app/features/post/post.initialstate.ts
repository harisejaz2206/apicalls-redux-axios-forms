import { IPost } from "./interfaces/post.interface";

export interface IPaginationInfo {
  page: number;
  totalRecords: number;
  totalPages: number;
}

export interface IPostsState {
  posts?: IPost[];
  paginationInfo: IPaginationInfo;
  loading: boolean;
  status: boolean;
  error?: string | null;
}

export const initialPostState: IPostsState = {
  posts: [],
  paginationInfo: {
    page: 1,
    totalRecords: 0,
    totalPages: 0,
  },
  loading: false,
  status: false,
  error: null,
};

//Pagination
//page, limit/resPerPage
//$skip, $limit

//page=1, limit=10

//$skip = (page - 1) * limit
//limit = $limit
