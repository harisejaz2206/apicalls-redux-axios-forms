interface Auth {
  username: string;
  email: string;
  password: string;
}

interface AuthState {
  entities: Auth[];
  status: "pending" | "succeeded" | "failed";
  token: string | null;
  error: string | null;
}

const initialAuthState: AuthState = {
  entities: [],
  status: "pending",
  token: null,
  error: null,
};

export default initialAuthState;
