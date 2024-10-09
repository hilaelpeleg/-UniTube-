import thumb_up from './viewingsvg/thumb_up.svg';
import download from './viewingsvg/download.svg';
import thumb_down from './viewingsvg/thumb_down.svg';
import share from './viewingsvg/share.svg';
import Dots from './viewingsvg/dots.svg';
import { useNavigate } from 'react-router-dom';
import './RowButtons.css';
import { useState } from 'react';
import PopupEdit from './PopupEdit';
import './PopupEdit.css';
import { API_URL } from '../config';

// RowButtons component to display and manage actions like like, dislike, share, download, edit, and delete
function RowButtons({userLogin, token, video, videoList, setVideoList, like, updateLikes, user, isLike,setIsLike, handleLikeToggle, setUpdateTrigger }) {
    const [showModal, setshowModal] = useState(false);
    const navigate = useNavigate();
    const [hasDisliked, setHasDisliked] = useState(false);

    // Function to delete a video by its ID
    const deleteVideo = async (id) => {
        const remainingVideos = videoList.filter(video => video.id !== id);
        setVideoList(remainingVideos);
        try {
            // Send a DELETE request to delete the video
            const response = await fetch(`${API_URL}/api/users/${user.userName}/videos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Include the token for authorization
                    'Content-Type': 'application/json',
                },
            });

            // Check for successful response
            if (!response.ok) {
                const errorData = await response.json();
                console.error(errorData.error); // Log any errors returned from the server
                throw new Error('Failed to delete video'); // Handle error
            }

            const data = await response.json();
            console.log(data.message); // Log success message if needed
        } catch (error) {
            console.error('Error deleting video:', error);
        }

        navigate("/"); // Redirect to another page after deletion
    };

    const onclickLike = () => {
        if (userLogin && userLogin.userName && !isLike) {
            const newLikesCount = like + 1; 
            updateLikes(newLikesCount); 
            setIsLike(true); 
            setHasDisliked(false); 
            handleLikeToggle(newLikesCount, video.id); 
        }
    };

    const onclickDislike = () => {
        if (userLogin && userLogin.userName && isLike) {
            const newLikesCount = like > 1 ? like - 1 : 0; 
            updateLikes(newLikesCount); 
            setIsLike(false); 
            setHasDisliked(true); 
            handleLikeToggle(newLikesCount, video.id); 
        } else if (userLogin && userLogin.userName && !isLike && !hasDisliked) {  
            const newLikesCount = like > 0 ? like - 1 : 0; 
            updateLikes(newLikesCount); 
            setHasDisliked(true); 
            handleLikeToggle(newLikesCount, video.id); 
        }
    };

    const handleEditClick = () => {
        setshowModal(true);
    };

    // Function to close the edit modal

    const handleCloseModal = () => {
        setshowModal(false);
    };

    return (
        <div className="row-buttons-container">
            <PopupEdit
            user={user}
            token={token}
                setVideoList={setVideoList}
                videoId={video.id}
                videoList={videoList}
                show={showModal}
                handleClose={handleCloseModal}
                setUpdateTrigger={setUpdateTrigger}
            />
            <div className='btn-group-container-row'>
                <div className="btn-group margin" role="group" aria-label="Basic example">
                    <button onClick={onclickLike} type="button" className="btn btn-light">
                        <img className="marginbutton" src={thumb_up} alt="Like" />
                        {like}
                    </button>
                    <button onClick={onclickDislike} type="button" className="btn btn-light">
                        <img className="marginbutton" src={thumb_down} alt="Dislike" />
                    </button>
                </div>
                <button type="button" className="btn btn-light margin">
                    <img className="marginbutton" src={share} alt="Share" />
                    Share
                </button>
                <button type="button" className="btn btn-light margin">
                    <img className="marginbutton" src={download} alt="Download" />
                    Download
                </button>
                {user && user.userName === video.uploader && (
                    <div className="dropdown">
                        <button type="button" className="btn btn-light margin dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img className="marginbutton" src={Dots} alt="Options" />
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={() => deleteVideo(video.id)}>Deleting a video</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#" onClick={handleEditClick}>Editing a video</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RowButtons;
