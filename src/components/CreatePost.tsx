import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ErrorComponent from './ErrorComponent';
import { useDispatch } from 'react-redux';
import { createPost } from '../app/features/post/post.thunk';
import { AppThunkDispatch } from '../rootReducer';
import { IPost } from '../app/features/post/interfaces/post.interface';

type FormData = {
    title: string;
    body: string;
};

const schema = yup
    .object({
        title: yup.string().required('Title is required'),
        body: yup.string().required('Body is required'),
    })
    .required();

export function CreatePost() {
    const dispatch = useDispatch<AppThunkDispatch>();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>(
        {
            resolver: yupResolver(schema),
        }
    );

    const onSubmit: SubmitHandler<FormData> = (data) => {
        dispatch(createPost(data as IPost))
            .then((result) => {
                console.log("Create post was successful. The result is:", result);
            })
            .catch((error) => {
                console.log("An error occurred while creating the post:", error);
            });
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-semibold mb-6 text-center">Create Post</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <input className="mt-1 p-2 w-full border rounded-md" placeholder="Title" type="text" {...register('title')} />
                        <div className="mt-1"><ErrorComponent message={errors.title?.message} /></div>
                    </div>
                    <div className="mb-4">
                        <textarea className="mt-1 p-2 w-full border rounded-md" placeholder="Body" {...register('body')} />
                        <div className="mt-1"><ErrorComponent message={errors.body?.message} /></div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-yellow-500 text-white p-2 rounded-md hover:from-pink-500 hover:to-indigo-500 transition duration-300 ease-in-out" type="submit">Create Post</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
