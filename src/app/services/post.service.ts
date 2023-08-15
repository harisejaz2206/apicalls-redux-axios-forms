// Importing interfaces
import { IResponseInterface } from "../interfaces/api-response.interface";
import { IPost } from "../features/post/interfaces/post.interface";
import { ICreatePostRequest } from "../features/post/interfaces/createpost.interface";
import { IPaginationInfo } from "../features/post/post.initialstate";

// Importing base class
import { HttpService } from "./base.service";

class PostService extends HttpService {
  private readonly prefix: string = "api/v1/posts";

  create = (
    data: ICreatePostRequest
  ): Promise<IResponseInterface<{ post: IPost }>> =>
    this.post(`${this.prefix}`, data);

  getAllPosts = (
    page: number = 1,
    limit: number = 10
  ): Promise<
    IResponseInterface<{ posts: IPost[]; paginationInfo: IPaginationInfo }>
  > => this.get(`${this.prefix}`, { page, limit });

  update = (
    id: string,
    data: ICreatePostRequest
  ): Promise<IResponseInterface<{ updatedPost: IPost }>> =>
    this.put(`${this.prefix}/${id}`, data);

  getPostById = (id: string): Promise<IResponseInterface<{ post: IPost }>> =>
    this.get(`${this.prefix}/${id}`);

  deletePost = (id: string): Promise<IResponseInterface<{ id: string }>> =>
    this.delete(`${this.prefix}/${id}`);
}

export const postService = new PostService();
