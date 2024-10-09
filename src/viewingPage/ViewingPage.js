import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LeftMenu from '../homePage/LeftMenu';
import VideoItems from '../videoItem/VideoItems';
import './ViewingPage.css';
import Comments from './Comments';
import RowButtons from './RowButtons';
import { API_URL } from '../config';

// ViewingPage component to display a single video with comments and actions
const ViewingPage = ({ setToken, token, darkMode, setDarkMode, videoList, setVideoList, logedinuser }) => {
    const { videoId } = useParams();
    const [like, setLike] = useState(0);
    const [likedVideos, setLikedVideos] = useState({});
    const [commentsList, setCommentsList] = useState([]);
    const [duration, setDuration] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [filteredVideoList, setFilteredVideoList] = useState(videoList);
    const user = logedinuser ? logedinuser : null;
    const navigate = useNavigate();

    useEffect(() => {
        setFilteredVideoList(videoList); // Initialize filteredVideoList with the original list
    }, [videoList]);

    const video = videoList.find(v => v.id === parseInt(videoId)); // Find the current video
    useEffect(() => {
        if (video) {
            setLike(video.likes); // Set the initial number of likes
            fetchComments(); // Fetch comments from the server
        }
    }, [commentsList, updateTrigger]);

    const fetchComments = async () => {
        if (!videoId) return; // אם videoId אינו קיים, אל תבצע את הבקשה

        try {
            const response = await fetch(`${API_URL}/api/comments/${videoId}`, {
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

// Function to update the video duration on the server
const updateDurationOnServer = async (videoId, duration) => {
    try {
        // Send a PUT request to the server to update the video duration
        const response = await fetch(`${API_URL}/api/videos/${videoId}`, {
            method: 'PUT', // Use PUT method for updating
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token for authorization
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify({ duration }) // Send the updated duration as JSON in the request body
        });

        console.log("Response status:", response.status); // Log the status of the response

        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Failed to update video duration on server');
        }

        // Parse the response from the server
        const updatedVideo = await response.json();
        console.log('Video duration updated on server:', updatedVideo); // Log the updated video from the server
    } catch (error) {
        console.error('Error updating video duration on server:', error); // Log error if the update fails
    }
};

// Function that is called when the video metadata is loaded (to calculate duration)
const handleLoadedMetadata = (event) => {
    const videoDuration = event.target.duration; // Get the video duration from the event
    setDuration(videoDuration); // Update the duration state
    updateVideoDuration(video.id, videoDuration); // Update the video duration in the UI and send to the server
};

// Function to update the video duration in the UI and send the update to the server
const updateVideoDuration = (id, duration) => {
    const formattedDuration = formatDuration(duration); // Format the duration for display
    setVideoList(prevList => {
        // Update the video list with the new duration
        const updatedList = prevList.map(video =>
            video.id === id ? { ...video, duration: formattedDuration } : video
        );

        // Call the server update function to update the duration on the server
        updateDurationOnServer(id, formattedDuration);

        return updatedList; // Return the updated video list to the state
    });
};

// Function to format the video duration as minutes:seconds
const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60); // Calculate minutes
    const seconds = Math.floor(duration % 60).toString().padStart(2, '0'); // Calculate seconds and pad with zero if needed
    const formattedDuration = `${minutes}:${seconds}`; // Format as "MM:SS"
    return formattedDuration; // Return the formatted duration
};

    const addComment = async (newComment) => {
        try {
            const response = await fetch(`${API_URL}/api/comments/${videoId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
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

    const handleLikeToggle = async (newLikesCount, videoId) => {
        
        try {
            const response = await fetch(`${API_URL}/api/videos/${videoId}/like`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ likes: newLikesCount }), 
            });
    
    
            if (!response.ok) {
                const errorData = await response.json(); 
                console.error('Failed to update likes on the server:', errorData);
            } else {
                const responseData = await response.json();
            }
        } catch (error) {
            console.error('Error updating likes on server:', error);
        }
    };

    if (!video) {
        return <div>Video not found</div>;
    }

    const setIsLike = (id) => {
        setLikedVideos((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Add API_URL to profilePicture if it doesn't start with 'http'
    const profileImageUrl = video.profilePicture.startsWith('http')
        ? video.profilePicture
        : `${API_URL}${video.profilePicture}`;

    const goToUserPage = () => {
        navigate(`/Account/${video.uploader}`); // Assuming video.uploader contains the username
    };

    return (
        <div className="container-fluid viewing-pag">
            <div className="row">
                <div className="col-3 height">
                    <LeftMenu setToken={setToken} token={token} darkMode={darkMode} setDarkMode={setDarkMode} videoId={video.id}
                        handleChange={() => setDarkMode(!darkMode)}
                        setFilteredVideoList={setFilteredVideoList}
                        originalVideoList={videoList} // Pass the original list here
                        user={user} />
                </div>
            </div>
            <div className="row">
                <div className="col-8 ">
                    <div className="cardV" >
                        <h1>{video.title}</h1>
                        <video className="card-img-top" key={`${API_URL}${video.url}`} controls onLoadedMetadata={handleLoadedMetadata}>
                            <source src={`${API_URL}${video.url}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="card-body">
                            <div className="box">
                                <img className="profile" onClick={goToUserPage} src={profileImageUrl} />
                                <div className="box">
                                    <p className="card-text p" onClick={goToUserPage}>{video.uploader}</p>
                                    <p className="card-text p">{video.description}</p>
                                    <p className="card-text"><small className="text-body-secondary">{video.uploadDate}</small></p>
                                </div>
                            </div>
                            <RowButtons token={token} setUpdateTrigger={setUpdateTrigger}
                                user={user} like={like} updateLikes={updateLikes}
                                video={video}
                                setVideoList={setVideoList} videoList={videoList}
                                isLike={!!likedVideos[video.id]} userLogin={logedinuser}
                                setIsLike={() => setIsLike(video.id)}
                                handleLikeToggle={() => handleLikeToggle(like, video.id)} />
                            <Comments token={token} commentsList={commentsList} addComment={addComment}
                                videoList={videoList} videoId={video.id} setVideoList={setVideoList}
                                setCommentsList={setCommentsList} user={user} />
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