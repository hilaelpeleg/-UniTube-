import React, { useState, useEffect } from 'react';
import TextInput from '../register/TextInput';
import UpdateButton from './UpdateButton';
import { API_URL } from '../config';

// Component to handle the editing of a comment

function EditComment({ token, videoId, setVideoList, videoList, handleClose, setCommentsList, commentId, commentsList }) {
    // Find the comment to edit

    const comment = commentsList.find(c => c._id === commentId);

    // Initialize the state with the comment's text
    const [submittingEdit, setSubmittingEdit] = useState(false);
    const [updateCommentFields, setUpdateCommentFields] = useState({
        newcomment: comment ? comment.text : "",
    });

    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdateCommentFields({
            ...updateCommentFields, [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!comment) {
            console.error("Comment not found");
            return;
        }
        setSubmittingEdit(true);
    updateEdit(commentId).then(() => {
        handleClose(); 
    });
    };

    const updateEdit = async (id) => {
        console.log("this is good");
        console.log(updateCommentFields); 
    
        if (!updateCommentFields.newcomment) {
            console.error("Update fields are incomplete");
            setSubmittingEdit(false);
            return Promise.reject(new Error("Update fields are incomplete")); 
        }
    
        try {
            const response = await fetch(`${API_URL}/api/comments/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    text: updateCommentFields.newcomment 
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update the comment.'); 
            }
    
            const updatedComment = await response.json(); 
            console.log('Comment updated successfully:', updatedComment); 
    
            const updatedCommentsList = commentsList.map(comment =>
                comment._id === id ? { ...comment, text: updatedComment.text } : comment
            );
    
            setCommentsList(updatedCommentsList); // עדכן את רשימת התגובות
            setSubmittingEdit(false); // סיים את מצב העדכון
    
            // עדכון רשימת הסרטונים
            const updatedVideoList = videoList.map(video =>
                video.id === videoId ? { ...video, comments: updatedCommentsList } : video
            );
    
            setVideoList(updatedVideoList); // עדכן את רשימת הסרטונים
            
            return Promise.resolve(); // החזר Promise להצלחה
        } catch (error) {
            console.error('Error updating comment:', error);
            setSubmittingEdit(false); 
            return Promise.reject(error); 
        }
    };
    


    return (
        <div className="card custom-card-width container">
            <div className="card-body">
                <div className="row">
                    <TextInput name="newcomment" kind="Edit comment" value={updateCommentFields.newcomment} onChange={handleChange} />
                </div>
            </div>
            <div className="list-group list-group-flush">
                <UpdateButton onClick={handleSubmit} value="Update comment" />
            </div>
        </div>
    );
}

export default EditComment;
