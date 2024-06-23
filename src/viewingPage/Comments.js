import './Comments.css';
import Send from './viewingsvg/sendcomment.svg';
import React, { useState } from 'react';
import dotsvertical from './viewingsvg/dots-vertical.svg';
import PopupEditComment from './PopupEditComment';


function Comments({videoList, setVideoList, setCommentsList, videoId, video, commentsList, addComment, userLogin }) {
    const [comment, setComment] = useState("");
    const [showModal, setshowModal] = useState(false);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleAddComment = () => {
        const lastCommentId = commentsList.length > 0 ? commentsList[commentsList.length - 1].id : 0;
        if (comment.trim()) {
            const newComment = {
                id: (lastCommentId + 1),
                profilePicture: video.profilePicture, // Assuming this is the user profile picture
                name: video.uploader, // Assuming a placeholder name for now
                text: comment
            };
            addComment(newComment);
            setComment("");
        }
    };

    const handleEditClick = () => {
        setshowModal(true);
    };

    const handleCloseModal = () => {
        setshowModal(false);
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
                setComment={setCommentsList}
            />
            <div className="new-comment">
                <div className="comment-text">
                    <img className="profile-pic" src={video.profilePicture} />
                    <input value={comment} className='inputwidth' onChange={handleCommentChange} type="text" placeholder="Add a comment..." />
                    <button onClick={handleAddComment} type="button" className="btn btn-light">
                        <img src={Send} />
                    </button>
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
                                <button className="btn btn-light dotsbt" type="button" onClick={handleAddComment} data-bs-toggle="dropdown" aria-expanded="false">
                                    <img className="paddingdots" src={dotsvertical} />
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={() => deleteComment(comment.id)}  href="#">Deleting a comment</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" onClick={handleEditClick} href="#">Edit a comment</a></li>
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