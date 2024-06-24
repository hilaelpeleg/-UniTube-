import './Comments.css';
import Send from './viewingsvg/sendcomment.svg';
import React, { useState } from 'react';
import dotsvertical from './viewingsvg/dots-vertical.svg';
import PopupEditComment from './PopupEditComment';

function Comments({ videoList, setVideoList, setCommentsList, videoId, video, commentsList, addComment, userLogin }) {
    const [comment, setComment] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleAddComment = () => {
        const lastCommentId = commentsList.length > 0 ? commentsList[commentsList.length - 1].id : 0;
        if (comment.trim()) {
            const newComment = {
                id: (lastCommentId + 1),
                profilePicture: video.profilePicture,
                name: video.uploader,
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

    const handleCloseModal = () => {
        setShowModal(false);
        setEditCommentId(null);
    };

    const deleteComment = (commentId) => {
        const remainingComments = commentsList.filter(comment => comment.id !== commentId);
        setCommentsList(remainingComments);
        setVideoList(prevList =>
            prevList.map(video =>
                video.id === parseInt(videoId) ? { ...video, comments: remainingComments } : video
            )
        );
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
                    <img className="profile-pic" src={video.profilePicture} />
                    <input value={comment} className='inputwidth' onChange={handleCommentChange}
                        type="text" placeholder={userLogin && userLogin.userName ? "Add a comment..." : "Login to add comment"} />
                    {userLogin && userLogin.userName && (
                        <button onClick={handleAddComment} type="button" className="btn btn-light">
                            <img src={Send} />
                        </button>
                    )}
                </div>
            </div>
            {commentsList.map((comment, index) => (
                <div key={index} className="comment">
                    <img src={comment.profilePicture} alt={`Profile picture of 
                        ${comment.name}`} className="profile-pic" />
                    <div className="comment-text">
                        <strong>{comment.name}  </strong>
                        {comment.text}
                        {userLogin && userLogin.userName && (
                            <div className="dropdown">
                                <button className="btn btn-light dotsbt" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img className="paddingdots" src={dotsvertical} />
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
