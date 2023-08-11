import { FaUser, FaLock } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import ErrorComponent from './ErrorComponent';
import { login } from '../app/store/auth/auth.thunk';
import { useDispatch } from 'react-redux';
// import { selectAuthStatus, selectAuthEntities, selectAuthToken } from '../app/store/auth/auth.selector';
import { AppThunkDispatch } from '../app/store/rootReducer';
import { useNavigate } from "react-router-dom";


type FormData = {
    email: string;
    password: string;
};

const schema = yup
    .object({
        email: yup.string().required('Valid email is required'),
        password: yup.string().required('Valid password is required')
    })
    .required()

export function LoginComponent() {
    const dispatch = useDispatch<AppThunkDispatch>();
    const navigate = useNavigate();
    // const authState = useSelector(selectAuthStatus);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>(
        {
            resolver: yupResolver(schema),
        }
    );



    const onSubmit: SubmitHandler<FormData> = (data) => {
        dispatch(login(data)).unwrap()
            .then((result) => {
                console.log("inside the result", result)
                // Check the result and if success, redirect
                if (result.payload.token) {
                    console.log(result.payload) // Adjust this condition based on your actual response structure
                    navigate("/home", { replace: true });
                }
            })
            .catch((error) => {
                console.log("The error from the submit handler is:", { error })
            });
    };
    console.log(errors)
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-black">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <div className="flex items-center">
                            <FaUser className="text-gray-400 text-xl mr-2" />
                            <input className="mt-1 p-2 w-full border rounded-md" placeholder="Username" type="text" id="email" {...register('email')} />
                        </div>
                        <div className="mt-1"><ErrorComponent message={errors.email?.message} /></div>
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center">
                            <FaLock className="text-gray-400 text-xl mr-2" /> {/* Change to FaLock */}
                            <input className="mt-1 p-2 w-full border rounded-md" placeholder="Password" type="password" id="password" {...register('password')} /> {/* Change type and id */}
                        </div>
                        <div className="mt-1"><ErrorComponent message={errors.password?.message} /></div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-yellow-500 text-white p-2 rounded-md hover:from-pink-500 hover:to-indigo-500 transition duration-300 ease-in-out" type="submit">Login</button>
                </form>
                <div className="text-center mt-4 text-gray-500">
                    <p>Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
}