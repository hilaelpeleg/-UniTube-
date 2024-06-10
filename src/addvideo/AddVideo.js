import Video from './Video';
import './AddVideo.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import TextInput from '../register/TextInput';
import Button from '../button';
import VideoImg from './VideoImg';

function AddVideo({ videoList, setVideoList, userLogin }) {

    const [formErrorsVideo, setFormErrorsVideo] = useState({});
    const [submittingVideo, setSubmittingVideo] = useState(false);
    const [inputVideoFields, setInputVideoFields] = useState({
        "id": "",
        "title": "",
        "description": "",
        "url": "",
        "thumbnailUrl": "",
        "uploader": "",
        "likes": 0,
        "uploadDate": "",
        "duration": ""
    });

    const handleChange = (e) => {
        setInputVideoFields({ ...inputVideoFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrorsVideo(validate(inputVideoFields));
        setSubmittingVideo(true);
    }

    const validate = (inputVideoFields) => {
        const errors = {}
        if (!inputVideoFields.title) {
            errors.title = "Title is required!";
        }
        if (!inputVideoFields.description) {
            errors.description = "Description is required!";
        }
        if (!inputVideoFields.url) {
            errors.url = "URL is required!";
        }
        if (!inputVideoFields.thumbnailUrl) {
            errors.thumbnailUrl = "Thumbnail URL is required!";
        }
        if (!inputVideoFields.uploadDate) {
            errors.uploadDate = "Upload date is required!";
        }
        if (!inputVideoFields.duration) {
            errors.duration = "Duration is required!";
        }
        return errors;
    }

    const AddNewVideo = () => {
        const lastVideoId = videoList.length > 0 ? videoList[videoList.length - 1].id : 0;
        const Video = {
            "id": lastVideoId + 1,
            "title": inputVideoFields.title,
            "description": inputVideoFields.description,
            "url": "",
            "thumbnailUrl": "",
            "uploader": userLogin,
            "likes": 0,
            "uploadDate": "just now",
            "duration": "03:40"
        }
        setVideoList([Video, ...videoList]);
        console.log(videoList);
    }

    const navigate = useNavigate();


    useEffect(() => {
        console.log(formErrorsVideo);
        if (Object.keys(formErrorsVideo).length == 0 && submittingVideo) {
            AddNewVideo();
            console.log(inputVideoFields);
            navigate('/homepage');
        }

    }, [formErrorsVideo]);


    return (
        <div className="card custom-card-width container"  >
            <div className="card-body">
                <h5 className="card-title">Add Video</h5>
                <div className="row">
                    <Video name="Video" onChange={handleChange} />
                    <VideoImg name="Video" onChange={handleChange} />
                    <TextInput name="title" kind="title" value={inputVideoFields.title}
                        onChange={handleChange} errors={formErrorsVideo.title} />
                    <TextInput name="description" kind="description" value={inputVideoFields.description}
                        onChange={handleChange} errors={formErrorsVideo.description} />
                    // add video
                </div>
            </div>
            <div className="list-group list-group-flush">
                <Button onClick={handleSubmit} value="Add video" />
            </div>
        </div>
    );
}




export default AddVideo;