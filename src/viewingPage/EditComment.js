import { useState, useEffect } from 'react';
import TextInput from '../register/TextInput';
import UpdateButton from './UpdateButton';


function EditComment({ handleClose, setComment, videoId, videoList,setUpdateTrigger }) {
    const video = videoList.find(v => v.id === parseInt(videoId));

    useEffect(() => {
        console.log("Video found: ", video);
    }, [video]);

    const [submittingEdit, setSubmittingEdit] = useState(false);
    const [updateCommentFields, setUpdateVideoFields] = useState({
        description: video ? video.description : "",
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setUpdateVideoFields({
            ...updateCommentFields, [name]: files ? files[0] : value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!video) {
            console.error("Video not found");
            return;
        }
        setSubmittingEdit(true);
        updateEdit(videoId);
        handleClose();
        setUpdateTrigger(prev => !prev);
    };

    const updateEdit = (id) => {
        // Log the current state of updateVideoFields
        console.log("Updating video with fields: ", updateCommentFields);

        if (!updateCommentFields.description) {
            console.error("Update fields are incomplete");
            setSubmittingEdit(false);
            return;
        }

        const updatedVideoList = videoList.map(video =>
            video.id === id ? {
                ...video,
                description: updateCommentFields.description,
            } : video
        );

        setComment(updatedVideoList);
        setSubmittingEdit(false);

        console.log("Updated Video List: ", updatedVideoList);
    };

    return (
            <div className="card custom-card-width container">
                <div className="card-body">
                    <div className="row">
                        <TextInput name="description" kind="Edit comment" value={updateCommentFields.description} onChange={handleChange} />
                    </div>
                </div>
                <div className="list-group list-group-flush">
                    <UpdateButton onClick={handleSubmit} value="Update comment" />
                </div>
            </div>
    );
}

export default EditComment;
