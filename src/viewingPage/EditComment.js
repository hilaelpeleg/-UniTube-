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
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!comment) {
            console.error("Comment not found");
            return;
        }
        setSubmittingEdit(true);
        updateEdit(commentId);
        handleClose();
    };

    const updateEdit = async (id) => {
        if (!updateCommentFields.newcomment) {
            console.error("Update fields are incomplete");
            setSubmittingEdit(false);
            return;
        }

        try {
            // Sending a request to the server to update the comment
            const response = await fetch(`${API_URL}/api/comments/${id}`, {
                method: 'PUT', // or 'PATCH' depending on your API
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // If authentication is needed
                },
                body: JSON.stringify({
                    text: updateCommentFields.newcomment // The new text for the comment
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update the comment.');
            }

            // If successful, update the comments list in the state
            const updatedCommentsList = commentsList.map(comment =>
                comment.id === id ? {
                    ...comment,
                    text: updateCommentFields.newcomment,
                } : comment
            );

            setCommentsList(updatedCommentsList);
            setSubmittingEdit(false);

            // Update the videoList with the updated comments
            const updatedVideoList = videoList.map(video =>
                video.id === videoId ? {
                    ...video,
                    comments: updatedCommentsList
                } : video
            );

            setVideoList(updatedVideoList);
        } catch (error) {
            console.error('Error updating comment:', error);
            setSubmittingEdit(false);
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
