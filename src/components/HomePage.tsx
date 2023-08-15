import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../rootReducer';
import { AppThunkDispatch } from '../rootReducer';
import { fetchAllPosts } from '../app/features/post/post.thunk';
import { IPost } from '../app/features/post/interfaces/post.interface';
import { updatePostById } from '../app/features/post/post.thunk';
import { deletePost } from '../app/features/post/post.thunk';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'; // Import React icons

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


    // const handleUpdatePost = (post: IPost) => {
    //     // You can open a modal or navigate to a different page to edit the post
    //     // Then call your updatePost thunk with the updated post data
    //     dispatch(updatePostById({ id: post._id!, data: post }));
    // };


    const handleDeletePost = (postId: string) => {
        // You can show a confirmation dialog before deleting the post
        // Then call your deletePost thunk with the post ID
        dispatch(deletePost(postId));
    };

    const handleOpenModal = (post: IPost) => {
        setEditingPost({ title: post.title, body: post.body, _id: post._id });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleUpdatePost = (post: IPost) => {
        setModalOpen(false);
        const { _id, ...res } = post
        dispatch(updatePostById({ id: _id!, data: res }));
    };



    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">All Posts</h1>
            <div className="flex flex-wrap justify-center">
                {posts && posts.map((post) => (
                    <div className="card m-4 p-4 bg-white shadow-lg rounded-lg" key={post._id}>
                        <div className="card-header text-xl font-semibold flex justify-between">
                            <h2>{post.title}</h2>
                            <div>
                                <button onClick={() => handleOpenModal(post)}><AiOutlineEdit /></button>
                                <button onClick={() => handleDeletePost(post._id!)}><AiOutlineDelete /></button>
                            </div>
                        </div>
                        <div className="card-body text-lg text-gray-700">
                            <p>{post.body}</p>
                        </div>
                    </div>
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
            <div className="pagination">
                {Array.from({ length: paginationInfo?.totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
