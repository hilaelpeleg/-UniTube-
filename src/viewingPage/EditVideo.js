import Video from '../addvideo/Video';
import { useState, useEffect } from 'react';
import TextInput from '../register/TextInput';
import VideoImg from '../addvideo/VideoImg';
import UpdateButton from './UpdateButton';
import { API_URL } from '../config';


// Component to handle the editing of a video

function EditVideo({token, user, handleClose, setVideoList, videoId, videoList,setUpdateTrigger }) {
        // Find the video to edit based on videoId

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

    const updateEdit = async (id) => {
        const formData = new FormData();
        if (updateVideoFields.title) {
            formData.append('title', updateVideoFields.title);
        }
        if (updateVideoFields.description) {
            formData.append('description', updateVideoFields.description);
        }
        if (updateVideoFields.url instanceof File) {
            formData.append('url', updateVideoFields.url);
        }
        if (updateVideoFields.thumbnailUrl instanceof File) {
            formData.append('thumbnailUrl', updateVideoFields.thumbnailUrl);
        }
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value instanceof File ? value.name : value}`);
        }
        console.log(user.userName, videoId);

        try {
            const response = await fetch(`${API_URL}/api/users/${user.userName}/videos/${videoId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const updatedVideo = await response.json();
                console.log('Video updated successfully:', updatedVideo);
                // Update local video list
                const updatedVideoList = videoList.map(video =>
                    video.id === id ? { ...video, ...updatedVideo } : video
                );
                setVideoList(updatedVideoList);
            } else {
                console.error('Failed to update video');
            }
        } catch (error) {
            console.error('Error updating video:', error);
        }
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
