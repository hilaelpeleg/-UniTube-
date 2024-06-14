import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftMenu from '../homePage/LeftMenu';
import VideoItems from '../videoItem/VideoItems';
import './ViewingPage.css'
import thumb_up from './viewingsvg/thumb_up.svg'
import download from './viewingsvg/download.svg'
import thumb_down from './viewingsvg/thumb_down.svg'
import share from './viewingsvg/share.svg'

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
                    <div className="card" >
                    <h1>{video.title}</h1>
                    <video className="card-img-top" key={video.id} width="850" height="500" controls onLoadedMetadata={handleLoadedMetadata}>
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="card-body">
                    <h5>{video.title}</h5>
                    <div className="card-body">
                        <img className="profile" src={video.profilePicture} />
                        <div className="box">
                            <p className="card-text p">{video.uploader}</p>
                            <p className="card-text p">{video.description}</p>
                            <p className="card-text"><small className="text-body-secondary">{video.uploadDate} {video.likes}</small></p>
                        </div>
                        <div className="video-actions">
                            <div className="btn-group margin" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-light"> <img className='like' src={thumb_up} />
                                    like</button>
                                <button type="button" className="btn btn-light">
                                    <img className='like' src={thumb_down} /> </button>
                            </div>
                            <button type="button" className="btn btn-light margin">
                                <img className='like' src={share} />
                                Share
                            </button>
                            <button type="button" className="btn btn-light margin">
                                <img className='like' src={download} />
                                Download</button>

                        </div>
                    </div>
                    </div>


                    </div>
                </div>




                <div className="col-4 ">
                    <VideoItems videoList={videoList} colWidth={"col-12"}
                    />
                </div>
            </div>
        </div>

    );
};

export default ViewingPage;
