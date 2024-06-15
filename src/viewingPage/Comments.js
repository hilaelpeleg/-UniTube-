import './Comments.css';
import Send from './viewingsvg/sendcomment.svg';
import React, { useState } from 'react';



function Comments({ video, commentsList, addComment }) {
    const [comment, setComment] = useState("");

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddComment = () => {
        if (comment.trim()) {
            const newComment = {
                profilePicture: video.profilePicture, // Assuming this is the user profile picture
                name: video.uploader, // Assuming a placeholder name for now
                text: comment
            };
            addComment(newComment);
            setComment("");
        }
    };


    return (
        <div className="comment-section">
            <div className="new-comment">
                <div className="comment-text">
                    <img className="profile-pic" src={video.profilePicture} />
                    <input className='inputwidth' onChange={handleCommentChange} type="text" placeholder="Share your thoughts..." />
                    <button onClick={handleAddComment} type="button" className="btn btn-light">
                        <img src={Send} />
                    </button>
                </div>
            </div>
            {commentsList.map((comment, index) => (
                <div key={index} className="comment">
                    <img src={comment.profilePicture} alt={`Profile picture of ${comment.name}`} className="profile-pic" />
                    <div className="comment-text">
                        <strong>{comment.name}  </strong>
                        {comment.text}
                    </div>
                </div>
            ))}

        </div>
    );
}


export default Comments;