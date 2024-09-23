import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftMenu from '../homePage/LeftMenu';
import VideoItems from '../videoItem/VideoItems';
import './ViewingPage.css';
import Comments from './Comments';
import RowButtons from './RowButtons';
import { API_URL } from '../config';

// ViewingPage component to display a single video with comments and actions
const ViewingPage = ({token, darkMode,setDarkMode, videoList, setVideoList, logedinuser }) => {
    const { videoId } = useParams();
    const [like, setLike] = useState(0);
    const [likedVideos, setLikedVideos] = useState({});
    const [commentsList, setCommentsList] = useState([]);
    const [duration, setDuration] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [filteredVideoList, setFilteredVideoList] = useState(videoList);
    const user = logedinuser ? logedinuser : null;

    useEffect(() => {
        setFilteredVideoList(videoList); // Initialize filteredVideoList with the original list
    }, [videoList]);

    const video = videoList.find(v => v.id === parseInt(videoId)); // Find the current video
    useEffect(() => {
        if (video) {
            setLike(video.likes); // Set the initial number of likes
            fetchComments(); // Fetch comments from the server
        }
    }, [video, updateTrigger]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`${API_URL}/api/comments/${videoId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            const data = await response.json();
            setCommentsList(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

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

    const addComment = async (newComment) => {
        try {
            const response = await fetch(`${API_URL}/api/comments/${videoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });
            if (response.ok) {
                const savedComment = await response.json();
                const updatedComments = [...commentsList, savedComment];
                setCommentsList(updatedComments);
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
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
                    <LeftMenu darkMode={darkMode} setDarkMode={setDarkMode} videoId={video.id}
                        handleChange={() => setDarkMode(!darkMode)} 
                        setFilteredVideoList={setFilteredVideoList}
                        originalVideoList={videoList} // Pass the original list here
                        user={user}  />
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
                            <RowButtons token={token} setUpdateTrigger={setUpdateTrigger}
                                user={user} like={like} updateLikes={updateLikes}
                                video={video}
                                setVideoList={setVideoList} videoList={videoList}
                                isLike={!!likedVideos[video.id]}
                                setIsLike={() => handleLikeToggle(video.id)} />
                            <Comments commentsList={commentsList} addComment={addComment}
                                videoList={videoList} videoId={video.id} setVideoList={setVideoList} 
                                setCommentsList={setCommentsList} user={user}/>
                        </div>
                    </div>
                </div>
                <div className="col-4 scrollable">
                    <VideoItems videoList={filteredVideoList} colWidth={"col-12"}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewingPage;
