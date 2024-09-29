import Video from './Video';
import './AddVideo.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import TextInputVideo from './TextInputVideo';
import VideoImg from './VideoImg';
import ButtonAddVideo from './ButtonAddVideo';
import { API_URL } from '../config';

function AddVideo({token, videoList, setVideoList, logedinuser }) {
    const [formErrorsVideo, setFormErrorsVideo] = useState({});
    const [submittingVideo, setSubmittingVideo] = useState(false);
    const [inputVideoFields, setInputVideoFields] = useState({
        id: 0,
        title: "",
        description: "",
        url: null, // Use null for file uploads
        thumbnailUrl: null, // Use null for file uploads
        uploader: logedinuser ? logedinuser.userName : "",
        likes: 0,
        comments: [],
        uploadDate: new Date().toISOString(), // Set the current date
        duration: "00:00", // Initialize duration
        profilePicture: logedinuser && logedinuser.length > 0 ? logedinuser.profilePicture : null
    });

    const navigate = useNavigate(); // Initialize the navigate function

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setInputVideoFields({
            ...inputVideoFields, 
            [name]: files ? files[0] : value // Update state with the file or value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        setFormErrorsVideo(validate(inputVideoFields)); // Validate input fields
        setSubmittingVideo(true); // Indicate submission is in progress
    };

    const validate = (inputVideoFields) => {
        const errors = {};
        if (!inputVideoFields.title) {
            errors.title = "Title is required!"; // Title must be provided
        }
        if (!inputVideoFields.description) {
            errors.description = "Description is required!"; // Description must be provided
        }
        if (!inputVideoFields.url) {
            errors.url = "Video is required!"; // Video file must be provided
        }
        if (!inputVideoFields.thumbnailUrl) {
            errors.thumbnailUrl = "Thumbnail is required!"; // Thumbnail image must be provided
        }
        return errors;
    };

    const addNewVideo = async () => {
        const lastVideoId = videoList.length > 0 ? videoList[videoList.length - 1].id : 0; // Get the last video ID
        const newId = lastVideoId + 1; // Increment ID for the new video
        const formData = new FormData(); // Create a FormData object
        const formattedDate = new Date().toLocaleDateString('en-GB');

        formData.append('id', newId); // Append new ID to FormData
        formData.append('title', inputVideoFields.title); // Append title to FormData
        formData.append('description', inputVideoFields.description); // Append description
        formData.append('url', inputVideoFields.url); // Append video file
        formData.append('thumbnailUrl', inputVideoFields.thumbnailUrl); // Append thumbnail file
        formData.append('uploader', inputVideoFields.uploader); // Append uploader's name
        formData.append('uploadDate', formattedDate);
        formData.append('duration', inputVideoFields.duration); // Append duration
        formData.append('likes', inputVideoFields.likes); // Append initial likes count
        formData.append('profilePicture', logedinuser && logedinuser.length > 0 ? logedinuser.profilePicture : null); // Append profile picture


        // Send API request to upload the video with token
        const response = await fetch(`${API_URL}/api/users/${inputVideoFields.uploader}/videos`, {
            method: 'POST',
            headers: {
                'Authorization':  `Bearer ${token}`,
                 // Include the token for authentication
            },
            body: formData // Send the FormData
        });

        if (response.ok) {
            const newVideo = await response.json(); // Get the newly created video data
            setVideoList([...videoList, newVideo]); // Update local video list with the new video
            console.log("Video added successfully:", newVideo); // Log success message
        } else {
            console.error("Failed to add video"); // Log error message
        }
    };

    useEffect(() => {
        if (Object.keys(formErrorsVideo).length === 0 && submittingVideo) {
            addNewVideo(); // Call function to add new video
            navigate("/"); // Navigate back after submission
        }
    }, [formErrorsVideo]);


    return (
        // Defining fields that need to be filled when adding a video 
        <div className="wrapper">
            <div className="card custom-card-width container"  >
                <div className="card-body">
                    <h5 className="card-title">Add video</h5>
                    <div className="row">
                    <Video name="url" onChange={handleChange} errors={formErrorsVideo.url} />
                        <VideoImg name="thumbnailUrl" onChange={handleChange}
                            errors={formErrorsVideo.thumbnailUrl} />
                        <TextInputVideo name="title" kind="title" value={inputVideoFields.title}
                            onChange={handleChange} errors={formErrorsVideo.title} />
                        <TextInputVideo name="description" kind="description" value={inputVideoFields.description}
                            onChange={handleChange} errors={formErrorsVideo.description} />
                    </div>
                </div>
                <div className="list-group list-group-flush">
                    <ButtonAddVideo onClick={handleSubmit} value="Add video" />
                </div>
            </div>
        </div>
    );
}

export default AddVideo;