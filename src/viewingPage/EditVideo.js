import Video from '../addvideo/Video';
import { useState, useEffect } from 'react';
import TextInput from '../register/TextInput';
import VideoImg from '../addvideo/VideoImg';
import './EditVideo.css'
import UpdateButton from './UpdateButton';


function EditVideo({ setVideoList, videoId, videoList }) {
    const video = videoList.find(v => v.id === parseInt(videoId));

    const [submittingEdit, setSubmittingEdit] = useState(false);
    const [formErrorsVideo, setFormErrorsVideo] = useState({});
    const [updateVideoFields, setUpdateVideoFields] = useState({
        title: "",
        description: "",
        url: "",
        thumbnailUrl: "",
    });

    useEffect(() => {
        if (video) {
            setUpdateVideoFields({
                title: video.title,
                description: video.description,
                url: video.url,
                thumbnailUrl: video.thumbnailUrl,
            });
        }
    }, [video]);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setUpdateVideoFields({
            ...updateVideoFields, [name]: files ? files[0] : value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateEdit(updateVideoFields);
        setFormErrorsVideo(errors);
        if (Object.keys(errors).length === 0) {
            setSubmittingEdit(true);
            updateEdit(videoId);
        }
    };

    const validateEdit = (fields) => {
        const errors = {};
        if (!fields.title) {
            errors.title = "Title is required!";
        }
        if (!fields.description) {
            errors.description = "Description is required!";
        }
        if (!fields.url) {
            errors.url = "Video is required!";
        }
        if (!fields.thumbnailUrl) {
            errors.thumbnailUrl = "Thumbnail is required!";
        }
        return errors;
    };

    const updateEdit = (id) => {
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
    };

    return (
        <div className="wrapperEdit">
            <div className="card custom-card-width container">
                <div className="card-body">
                    <div className="row">
                        <Video name="url" onChange={handleChange} errors={formErrorsVideo.url} />
                        <VideoImg name="thumbnailUrl" onChange={handleChange} errors={formErrorsVideo.thumbnailUrl} />
                        <TextInput name="title" kind="title" value={updateVideoFields.title} onChange={handleChange} errors={formErrorsVideo.title} />
                        <TextInput name="description" kind="description" value={updateVideoFields.description} onChange={handleChange} errors={formErrorsVideo.description} />
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
