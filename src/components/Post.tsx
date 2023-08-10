import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import ErrorComponent from './ErrorComponent';

type FormData = {
    title: string;
    body: string;
    author: string;
};

const schema = yup
    .object({
        title: yup.string().required('Title is required'),
        body: yup.string().required('Body is required'),
        author: yup.string()
            .required('This field is required')
            .matches(/^[0-9a-fA-F]{24}$/, 'Must be a valid ObjectId') // 24-character hexadecimal string
    })
    .required();

export function PostComponent() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        // Handle form submission here
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-black">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-semibold mb-6 text-center">Create Post</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <input className="mt-1 p-2 w-full border rounded-md" placeholder="Title" {...register('title')} />
                        <div className="mt-1"><ErrorComponent message={errors.title?.message} /></div>
                    </div>
                    <div className="mb-4">
                        <textarea className="mt-1 p-2 w-full border rounded-md" placeholder="Body" {...register('body')} />
                        <div className="mt-1"><ErrorComponent message={errors.body?.message} /></div>
                    </div>
                    <div className="mb-4">
                        <input className="mt-1 p-2 w-full border rounded-md" placeholder="Author" {...register('author')} />
                        <div className="mt-1"><ErrorComponent message={errors.author?.message} /></div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-yellow-500 text-white p-2 rounded-md hover:from-pink-500 hover:to-indigo-500 transition duration-300 ease-in-out" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
