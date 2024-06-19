import Video from './Video';
import './AddVideo.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import TextInput from '../register/TextInput';
import Button from '../button/Button';
import VideoImg from './VideoImg';

function AddVideo({ userList, videoList, setVideoList, userLogin }) {
    const [formErrorsVideo, setFormErrorsVideo] = useState({});
    const [submittingVideo, setSubmittingVideo] = useState(false);
    const [inputVideoFields, setInputVideoFields] = useState({
        "id": 0,
        "title": "",
        "description": "",
        "url": "",
        "thumbnailUrl": "",
        "uploader": userLogin ? userLogin.userName : "",
        "likes": 0,
        "comments": [],
        "uploadDate": "",
        "duration": "",
        "profilePicture": userLogin && userList.length > 0 ? userList.find(user => user.userName === userLogin.userName)?.profilePicture : null
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setInputVideoFields({
            ...inputVideoFields, [name]: files ? files[0] : value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
            errors.url = "Video is required!";
        }
        if (!inputVideoFields.thumbnailUrl) {
            errors.thumbnailUrl = "img Video is required!";
        }
        return errors;
    }

    const AddNewVideo = () => {
        const lastVideoId = videoList.length > 0 ? videoList[videoList.length - 1].id : 0;
        console.log(lastVideoId + 1)
        const newVideo = {
            "id": (lastVideoId + 1),
            "title": inputVideoFields.title,
            "description": inputVideoFields.description,
            "url": inputVideoFields.url instanceof File ? URL.createObjectURL(inputVideoFields.url) : inputVideoFields.url,
            "thumbnailUrl": inputVideoFields.thumbnailUrl instanceof File ? URL.createObjectURL(inputVideoFields.thumbnailUrl) : inputVideoFields.thumbnailUrl,
            "uploader": inputVideoFields.uploader,
            "likes": 0,
            "comments": [],
            "uploadDate": "2024-06-18",
            "duration": "03:40",
            "profilePicture": inputVideoFields.profilePicture
        }
        setVideoList([...videoList, newVideo]);
    }

    const navigate = useNavigate();


    useEffect(() => {
        if (Object.keys(formErrorsVideo).length === 0 && submittingVideo) {
            AddNewVideo();
            navigate("/HomePage");
        }

    }, [formErrorsVideo]);

    return (
        <div className="card custom-card-width container"  >
            <div className="card-body">
                <h5 className="card-title">Add Video</h5>
                <div className="row">
                    <Video name="url" onChange={handleChange} errors={formErrorsVideo.url} />
                    <VideoImg name="thumbnailUrl" onChange={handleChange}
                        errors={formErrorsVideo.thumbnailUrl} />
                    <TextInput name="title" kind="title" value={inputVideoFields.title}
                        onChange={handleChange} errors={formErrorsVideo.title} />
                    <TextInput name="description" kind="description" value={inputVideoFields.description}
                        onChange={handleChange} errors={formErrorsVideo.description} />
                </div>
            </div>
            <div className="list-group list-group-flush">
                <Button onClick={handleSubmit} value="Add video" />
            </div>
        </div>
    );
}

export default AddVideo;