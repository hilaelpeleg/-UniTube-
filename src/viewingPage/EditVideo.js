import Video from '../addvideo/Video';
import { useState, useEffect } from 'react';
import TextInput from '../register/TextInput';
import VideoImg from '../addvideo/VideoImg';
import UpdateButton from './UpdateButton';


function EditVideo({ handleClose, setVideoList, videoId, videoList,setUpdateTrigger }) {
    const video = videoList.find(v => v.id === parseInt(videoId));

    useEffect(() => {
        console.log("Video found: ", video);
    }, [video]);

    const [submittingEdit, setSubmittingEdit] = useState(false);
    const [updateVideoFields, setUpdateVideoFields] = useState({
        title: video ? video.title : "",
        description: video ? video.description : "",
        url: video ? video.url : "",
        thumbnailUrl: video ? video.thumbnailUrl : "",
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setUpdateVideoFields({
            ...updateVideoFields, [name]: files ? files[0] : value
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
        console.log("Updating video with fields: ", updateVideoFields);

        if (!updateVideoFields.title || !updateVideoFields.description || !updateVideoFields.url || !updateVideoFields.thumbnailUrl) {
            console.error("Update fields are incomplete");
            setSubmittingEdit(false);
            return;
        }

        const updatedVideoList = videoList.map(video =>
            video.id === id ? {
                ...video,
                title: updateVideoFields.title,
                description: updateVideoFields.description,
                url: updateVideoFields.url instanceof File ? URL.createObjectURL(updateVideoFields.url) : updateVideoFields.url,
                thumbnailUrl: updateVideoFields.thumbnailUrl instanceof File ? URL.createObjectURL(updateVideoFields.thumbnailUrl) : updateVideoFields.thumbnailUrl,
            } : video
        );

        setVideoList(updatedVideoList);
        setSubmittingEdit(false);

        console.log("Updated Video List: ", updatedVideoList);
    };

    return (
        <div className="wrapperEdit">
            <div className="card custom-card-width container">
                <div className="card-body">
                    <div className="row">
                        <Video name="url" onChange={handleChange} />
                        <VideoImg name="thumbnailUrl" onChange={handleChange} />
                        <TextInput name="title" kind="title" value={updateVideoFields.title} onChange={handleChange} />
                        <TextInput name="description" kind="description" value={updateVideoFields.description} onChange={handleChange} />
                    </div>
                </div>
                <div className="list-group list-group-flush">
                    <UpdateButton onClick={handleSubmit} value="Update Video" />
                </div>
            </div>
        </div>
    );
}

export default EditVideo;
