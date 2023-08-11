interface IAuth {
  username: string;
  email: string;
  password: string;
}

interface IAuthState {
  user?: IAuth | null;
  loading: boolean;
  token?: string | null;
  error?: string | null;
  isLoggedIn: boolean;
}

const initialAuthState: IAuthState = {
  token: null,
  error: null,
  loading: false,
  isLoggedIn: false,
};

export default initialAuthState;
