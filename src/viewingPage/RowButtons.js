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

// RowButtons component to display and manage actions like like, dislike, share, download, edit, and delete
function RowButtons({ videoId, videoList, setVideoList, like, updateLikes, user, isLike, setIsLike, setUpdateTrigger }) {
    const [showModal, setshowModal] = useState(false);
    const navigate = useNavigate();
    const [hasDisliked, setHasDisliked] = useState(false);

    
    // Function to delete a video by its ID

    const deleteVideo = (id) => {
        const remainingVideos = videoList.filter(video => video.id !== id);
        setVideoList(remainingVideos);
        navigate("/");
    };

    const onclickLike = () => {
        if (user && user.userName && !isLike) {
            if (hasDisliked) {
                updateLikes(like + 1);
                setHasDisliked(false);
            } else {
                updateLikes(like + 1);
            }
            setIsLike(true);
        }
    };

    const onclickDislike = () => {
        if (user && user.userName && isLike) {
            if (like > 1) updateLikes(like -1);
            else updateLikes(0); // Handle edge case if likes is 1 or less
            setIsLike(false);
            setHasDisliked(true);
        } else if (user && user.userName && !isLike && !hasDisliked) {
            if (like > 0) updateLikes(like - 1);
            setHasDisliked(true);
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
                setVideoList={setVideoList}
                videoId={videoId}
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
                {user && user.userName && (
                    <div className="dropdown">
                        <button type="button" className="btn btn-light margin dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img className="marginbutton" src={Dots} alt="Options" />
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={() => deleteVideo(videoId)}>Deleting a video</a></li>
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
