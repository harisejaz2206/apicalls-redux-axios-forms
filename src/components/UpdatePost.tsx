import React from 'react';
import { useDispatch } from 'react-redux';
import { updatePostById } from '../app/features/post/post.thunk';
import { AppThunkDispatch } from '../rootReducer';
import { IPost } from '../app/features/post/interfaces/post.interface';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

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

export function UpdatePostComponent({ postToUpdate }: { postToUpdate: IPost }) {
    const dispatch = useDispatch<AppThunkDispatch>();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>(
        {
            resolver: yupResolver(schema),
            defaultValues: { title: postToUpdate.title, body: postToUpdate.body },
        }
    );

    const onSubmit: SubmitHandler<FormData> = (data) => {
        dispatch(updatePostById({ id: postToUpdate._id!, data: { ...data, _id: postToUpdate._id } })).unwrap()
            .then((result) => {
                console.log("Update post was successful. The result is:", result);
            })
            .catch((error) => {
                // Handle error - you can show an error message here
                console.log("The error from the submit handler is:", { error });
            });
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    {...register('title')}
                />
                {errors.title && <div>{errors.title.message}</div>}
            </div>
            <div>
                <textarea
                    placeholder="Body"
                    {...register('body')}
                />
                {errors.body && <div>{errors.body.message}</div>}
            </div>
            <button type="submit">Update Post</button>
        </form>
    );
}
