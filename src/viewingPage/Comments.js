import './Comments.css';
import Send from './viewingsvg/sendcomment.svg';
import React, { useState } from 'react';
import dotsvertical from './viewingsvg/dots-vertical.svg';
import PopupEditComment from './PopupEditComment';
import { API_URL } from '../config';

// Comments component for handling the display and management of comments
function Comments({token, user, videoList, setVideoList, setCommentsList, videoId, commentsList, addComment}) {
    const [comment, setComment] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    // Handle adding a new comment

    const handleAddComment = () => {
        if (!user) {// Added check to see if user is defined
            console.error("User is not defined");
            return;
        }
        if (comment.trim()) {
            const newComment = {
                profilePicture: user && user.profilePicture ? user.profilePicture : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                name: user ? user.userName : 'Unknown User',
                text: comment
            };
            addComment(newComment);
            setComment("");
        }
    };

    const handleEditClick = (commentId) => {
        setEditCommentId(commentId);
        setShowModal(true);
    };

        // Handle closing the edit comment modal

    const handleCloseModal = () => {
        setShowModal(false);
        setEditCommentId(null);
    };

    // Handle deleting a comment
    const deleteComment = async(commentId) => {
        try {
        const response = await fetch(`${API_URL}/api/comments/${commentId}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
            });
            if (response.ok) {  
                const remainingComments = commentsList.filter(comment => comment.id !== commentId);
                setCommentsList(remainingComments);
                setVideoList(prevList =>
                    prevList.map(video =>
                        video.id === parseInt(videoId) ? { ...video, comments: remainingComments } : video
                    )
                );
            } else {
                throw new Error('Failed to delete the comment.');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="comment-section">
            <PopupEditComment
                setVideoList={setVideoList}
                videoId={videoId}
                videoList={videoList}
                show={showModal}
                handleClose={handleCloseModal}
                setCommentsList={setCommentsList}
                commentId={editCommentId}
                commentsList={commentsList}
            />
            <div className="new-comment">
                <div className="comment-text-input">
                    <img className="profile-pic" src={user && user.profilePicture ? user.profilePicture : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} alt="Profile" />
                    <input
                        value={comment}
                        className='inputwidth'
                        onChange={handleCommentChange}
                        type="text"
                        placeholder={user && user.userName ? "Add a comment..." : "Login to add comment"}
                    />
                    {user && user.userName && (
                        <button onClick={handleAddComment} type="button" className="btn btn-light">
                            <img src={Send} alt="Send" />
                        </button>
                    )}
                </div>
            </div>
            {commentsList.map((comment, index) => (
                <div key={index} className="comment">
                    <img src={comment.profilePicture || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} alt={`Profile picture of ${comment.name}`} className="profile-pic" />
                    <div className="comment-text">
                        <strong>{comment.name}  </strong>
                        {comment.text}
                        {user && user.userName === comment.name &&(
                            <div className="dropdown">
                                <button className="btn btn-light dotsbt" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img className="paddingdots" src={dotsvertical} alt="Menu" />
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={() => deleteComment(comment.id)} href="#">Delete comment</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" onClick={() => handleEditClick(comment.id)} href="#">Edit comment</a></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Comments;
