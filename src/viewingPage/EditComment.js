import React, { useState, useEffect } from 'react';
import TextInput from '../register/TextInput';
import UpdateButton from './UpdateButton';

function EditComment({videoId,setVideoList, videoList, handleClose, setCommentsList, commentId, commentsList }) {
    const comment = commentsList.find(c => c.id === commentId);

    useEffect(() => {
        if (comment) {
            setUpdateCommentFields({ newcomment: comment.text });
        }
    }, [comment]);

    const [submittingEdit, setSubmittingEdit] = useState(false);
    const [updateCommentFields, setUpdateCommentFields] = useState({
        newcomment: comment ? comment.text : "",
    });

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

    const updateEdit = (id) => {
        if (!updateCommentFields.newcomment) {
            console.error("Update fields are incomplete");
            setSubmittingEdit(false);
            return;
        }

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

        console.log("Updated Comments List: ", updatedCommentsList);
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
