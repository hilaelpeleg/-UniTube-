import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftMenu from '../homePage/LeftMenu';
import VideoItems from '../videoItem/VideoItems';
import './ViewingPage.css'

const ViewingPage = ({ videoList, setVideoList }) => {
    const { videoId } = useParams();
    const [duration, setDuration] = useState(null);

    const video = videoList.find(v => v.id === parseInt(videoId));

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

    useEffect(() => {
        if (duration !== null) {
            console.log("Video duration:", duration);
        }
    }, [duration]);

    if (!video) {
        return <div>Video not found</div>;
    }

    return (
        <div className="container-fluid viewing-pag">
            <div className="row">
                <div className="col-3 height">
                    <LeftMenu />
                </div>
            </div>
            <div className="row">
                <div className="col-8 ">
                    <h1>{video.title}</h1>
                    <video width="750" height="500" controls onLoadedMetadata={handleLoadedMetadata}>
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <p>{video.description}</p>
                </div>
                <div className="col-2 ">
                    <VideoItems videoList={videoList} colWidth={"col-12"}
                    />
                </div>
            </div>
        </div>

    );
};

export default ViewingPage;
