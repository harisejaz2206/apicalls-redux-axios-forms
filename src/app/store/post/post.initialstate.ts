interface Post {
  title: string;
  body: string;
  author: string;
}

interface PostState {
  entities: Post[];
  status: "pending" | "succeeded" | "failed";
}

const initialPostState: PostState = {
  entities: [],
  status: "pending",
};

export default initialPostState;
