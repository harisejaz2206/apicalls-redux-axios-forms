import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../rootReducer';
import { AppThunkDispatch } from '../rootReducer';
import { fetchAllPosts } from '../app/features/post/post.thunk';
import { IPost } from '../app/features/post/interfaces/post.interface';
import { updatePostById } from '../app/features/post/post.thunk';
import { deletePost } from '../app/features/post/post.thunk';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'; // Import React icons
import Swal from 'sweetalert2';


const HomePage: React.FC = () => {

    const dispatch = useDispatch<AppThunkDispatch>();
    const posts = useSelector((state: RootState) => state.post.posts);
    const paginationInfo = useSelector((state: RootState) => state.post.paginationInfo);
    const postState = useSelector((state: RootState) => state.post);
    const limit = 10;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchAllPosts({ page: currentPage, limit }));
    }, [dispatch, currentPage, limit]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<IPost | null>(null);

    const handleDeletePost = async (postId: string) => {
        // const dispatch: AppThunkDispatch = useDispatch();

        // Show a confirmation dialog before deleting the post
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this post!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        // If the user confirms the deletion
        if (result.isConfirmed) {
            try {
                await dispatch(deletePost(postId)).unwrap(); // Using unwrap to handle the Promise

                // Show SweetAlert on successful deletion
                Swal.fire({
                    icon: 'success',
                    title: 'Post Deleted',
                    text: 'Your post has been successfully deleted.',
                });
            } catch (error: any) {
                // Show SweetAlert on error
                Swal.fire({
                    icon: 'error',
                    title: 'Deletion Failed',
                    text: 'Something went wrong while deleting your post.',
                    footer: `Error: ${error.message || 'Unknown error'}`, // Display the error message if available
                });
            }
        } else {
            // If the user cancels the deletion
            Swal.fire({
                icon: 'info',
                title: 'Deletion Cancelled',
                text: 'Your post has not been deleted.',
            });
        }
    };

    const handleOpenModal = (post: IPost) => {
        setEditingPost({ title: post.title, body: post.body, _id: post._id });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleUpdatePost = async (post: IPost) => {
        setModalOpen(false);
        const { _id, ...res } = post;

        try {
            await dispatch(updatePostById({ id: _id!, data: res })).unwrap(); // Using unwrap to handle the Promise
            // Show SweetAlert on successful update
            Swal.fire({
                icon: 'success',
                title: 'Post Updated',
                text: 'Your post has been successfully updated.',
            });
        } catch (error: any) {
            // Show SweetAlert on error
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Something went wrong while updating your post.',
                footer: `Error: ${error.message || 'Unknown error'}`, // Display the error message if available
            });
        }
    };







    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-4">All Posts</h1>
            <div className="flex flex-wrap justify-center">
                {posts && posts.map((post) => (
                    <div className="card m-4 p-8 bg-white shadow-lg rounded-lg w-64" key={post._id}>
                        <div className="card-header text-xl font-semibold flex justify-between">
                            <h2 className="text-2xl">{post.title}</h2>
                            <div className="flex flex-col space-y-4 items-center">
                                <button className="text-blue-500 hover:text-blue-700 text-2xl" onClick={() => handleOpenModal(post)}><AiOutlineEdit /></button>
                                <button className="text-red-500 hover:text-red-700 text-2xl" onClick={() => handleDeletePost(post._id!)}><AiOutlineDelete /></button>
                            </div>
                        </div>
                        <div className="card-body text-lg text-gray-700 mt-2">
                            <p>{post.body}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination flex justify-center space-x-2 mt-4">
                {Array.from({ length: paginationInfo?.totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`py-2 px-4 rounded-full border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {modalOpen && editingPost && (
                <div className="modal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 999 }}>
                    <div className="modal-content" style={{ width: '400px', backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxSizing: 'border-box', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>
                        <h2>Edit Post</h2>
                        <label>Title</label>
                        <input type="text" value={editingPost.title} onChange={e => setEditingPost({ ...editingPost, title: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        <label>Body</label>
                        <textarea value={editingPost.body} onChange={e => setEditingPost({ ...editingPost, body: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '100px' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={handleCloseModal} style={{ padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', backgroundColor: '#ccc' }}>Close</button>
                            <button onClick={() => handleUpdatePost(editingPost)} style={{ padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff' }}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
