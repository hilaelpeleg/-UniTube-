import VideoItem from "./VideoItem";
import React, { useEffect } from 'react';
import videosData from '../app/videos.json';
import './videoItem.css';

function VideoItems({videoList, setVideoList}) {
    useEffect(() => {
        // Set the video list when the component mounts
        setVideoList(videosData);
    }, [setVideoList]);


    return (
        <div className="row gx-3">
            {videoList.map(video => (
                <div key={video.id} className="col-xl-4 col-lg-4 col-md-4 col-sm-12 hover"> 
                    <VideoItem
                        thumbnailUrl={video.thumbnailUrl}
                        title={video.title}
                        uploader={video.uploader}
                        description={video.description}
                        likes={video.likes}
                        uploadDate={video.uploadDate}
                        duration={video.duration}
                    />
                </div>
            ))}
        </div>
    );
}

export default VideoItems;