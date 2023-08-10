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
}

const initialAuthState: IAuthState = {
  token: null,
  error: null,
  loading: false,
};

export default initialAuthState;
