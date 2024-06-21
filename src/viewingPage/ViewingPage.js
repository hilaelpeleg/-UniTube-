import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftMenu from '../homePage/LeftMenu';
import VideoItems from '../videoItem/VideoItems';
import './ViewingPage.css';
import Comments from './Comments';
import RowButtons from './RowButtons';

const ViewingPage = ({ videoList, setVideoList, userLogin }) => {
    const { videoId } = useParams();
    const [like, setLike] = useState(0);
    const [likedVideos, setLikedVideos] = useState({});
    const [commentsList, setCommentsList] = useState([]);
    const [duration, setDuration] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [filteredVideoList, setFilteredVideoList] = useState(videoList);

    useEffect(() => {
        setFilteredVideoList(videoList); // Initialize filteredVideoList with the original list
    }, [videoList]);

    const video = videoList.find(v => v.id === parseInt(videoId));
    useEffect(() => {
        if (video) {
            setLike(video.likes);
            setCommentsList(video.comments || []);
        }
    }, [video, updateTrigger]);

    const handleLoadedMetadata = (event) => {
        const videoDuration = event.target.duration;
        setDuration(videoDuration);
        updateVideoDuration(video.id, videoDuration);
    };

    const updateVideoDuration = (id, duration) => {
        setVideoList(prevList =>
            prevList.map(video =>
                video.id === id ? { ...video, duration: formatDuration(duration) } : video
            )
        );
    };

    const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const addComment = (newComment) => {
        const updatedComments = [...commentsList, newComment];
        setCommentsList(updatedComments);
        setVideoList(prevList =>
            prevList.map(video =>
                video.id === parseInt(videoId) ? { ...video, comments: updatedComments } : video
            )
        );
    };

    const updateLikes = (newLikes) => {
        setLike(newLikes);
        setVideoList(prevList =>
            prevList.map(video =>
                video.id === parseInt(videoId) ? { ...video, likes: newLikes } : video
            )
        );
    };

    const handleLikeToggle = (id) => {
        setLikedVideos((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (!video) {
        return <div>Video not found</div>;
    }

    return (
        <div className="container-fluid viewing-pag">
            <div className="row">
                <div className="col-3 height">
                    <LeftMenu videoId={video.id}
                        setFilteredVideoList={setFilteredVideoList}
                        originalVideoList={videoList} // Pass the original list here
                        userLogin={userLogin} />
                </div>
            </div>
            <div className="row">
                <div className="col-8 ">
                    <div className="cardV" >
                        <h1>{video.title}</h1>
                        <video className="card-img-top" key={video.url} controls onLoadedMetadata={handleLoadedMetadata}>
                            <source src={video.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="card-body">
                            <div className="box">
                                <img className="profile" src={video.profilePicture} />
                                <div className="box">
                                    <p className="card-text p">{video.uploader}</p>
                                    <p className="card-text p">{video.description}</p>
                                    <p className="card-text"><small className="text-body-secondary">{video.uploadDate}</small></p>
                                </div>
                            </div>
                            <RowButtons setUpdateTrigger={setUpdateTrigger}
                                userLogin={userLogin} like={like} updateLikes={updateLikes}
                                videoId={video.id}
                                setVideoList={setVideoList} videoList={videoList}
                                isLike={!!likedVideos[video.id]}
                                setIsLike={() => handleLikeToggle(video.id)} />
                            <Comments commentsList={commentsList} addComment={addComment}
                                video={video} />
                        </div>
                    </div>
                </div>
                <div className="col-4 ">
                    <VideoItems videoList={filteredVideoList} colWidth={"col-12"}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewingPage;
