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

    useEffect(() => {
        if (comment) {
            setUpdateCommentFields({ newcomment: comment.text });
        }
    }, [comment]);

    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdateCommentFields({
            ...updateCommentFields, [name]: value
        });
        console.log(`Changing ${name} to ${value}`); // Log the change in input

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!comment) {
            console.error("Comment not found");
            return;
        }
        console.log("Submitting comment update:", updateCommentFields); // Log the fields before submitting
        setSubmittingEdit(true);
    // העברת ה-commentId לשימוש בתוך updateEdit
    updateEdit(commentId).then(() => {
        handleClose(); // סגור את המודאל רק לאחר סיום העדכון
    });
    };

    const updateEdit = async (id) => {
        console.log("this is good");
        console.log(updateCommentFields); // לוג של השדות
    
        // בדוק אם השדה חדש לא ריק
        if (!updateCommentFields.newcomment) {
            console.error("Update fields are incomplete");
            setSubmittingEdit(false);
            return Promise.reject(new Error("Update fields are incomplete")); // החזר שגיאה
        }
    
        try {
            // שלח בקשה לשרת לעדכן את התגובה
            const response = await fetch(`${API_URL}/api/comments/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    text: updateCommentFields.newcomment // שלח את הטקסט החדש
                }),
            });
    
            // בדוק אם הבקשה הצליחה
            if (!response.ok) {
                throw new Error('Failed to update the comment.'); // זרוק שגיאה אם לא הצליח
            }
    
            const updatedComment = await response.json(); // קבל את התגובה המתקדמת
            console.log('Comment updated successfully:', updatedComment); // לוג הצלחה
    
            // עדכון רשימת התגובות
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
            setSubmittingEdit(false); // סיים את מצב העדכון
            return Promise.reject(error); // החזר שגיאה אם נכשלה
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
