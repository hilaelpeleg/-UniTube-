import thumb_up from './viewingsvg/thumb_up.svg'
import download from './viewingsvg/download.svg'
import thumb_down from './viewingsvg/thumb_down.svg'
import share from './viewingsvg/share.svg'
import Dots from './viewingsvg/dots.svg';
import { useNavigate } from 'react-router-dom';
import './RowButtons.css';
import { useState } from 'react';
import PopupEdit from './PopupEdit';
import './PopupEdit.css';



function RowButtons({ videoId, videoList, setVideoList, like, updateLikes, userLogin, isLike,setIsLike }) {

    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const deleteVideo = (id) => {
        // Use filter to create a new array without the video with the specified id
        const remainingVideos = videoList.filter(video => video.id !== id);
        // Update the state with the new array
        setVideoList(remainingVideos);
        navigate("/HomePage");
    };

    const onclickLike = () => {
        
        if (userLogin && userLogin.userName && !isLike){
        updateLikes(like + 1)
        setIsLike(true);
        }
    }

    const onclickDislike = () => {
        if (userLogin && userLogin.userName && !isLike){
        if (like > 0) updateLikes(like - 1);
        setIsLike(true);
        }
    }
    

    const handleEditClick = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div className="row-buttons-container">
            <PopupEdit setVideoList={setVideoList} videoId={videoId} videoList={ videoList} show={showModal} handleClose={handleCloseModal} />
            <div >
                <div className="btn-group margin" role="group" aria-label="Basic example">
                    <button onClick={onclickLike} type="button" className="btn btn-light">
                        <img className='marginbutton' src={thumb_up} />
                        {like}</button>
                    <button onClick={onclickDislike} type="button" className="btn btn-light">
                        <img className='marginbutton' src={thumb_down} /> </button>
                </div>
                <button type="button" className="btn btn-light margin">
                    <img className='marginbutton' src={share} />
                    Share
                </button>
                <button type="button" className="btn btn-light margin">
                    <img className='marginbutton' src={download} />
                    Download</button>
                {userLogin && userLogin.userName && ( // Conditional rendering based on userLogin
                    <button type="button" data-bs-toggle="dropdown" className="btn btn-light margin dropdown-toggle"  >
                        <img className='marginbutton' src={Dots} />
                    </button>
                )}
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => deleteVideo(videoId)}>Deleting a video</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" onClick={handleEditClick}>Editing a video</a></li>
                </ul>
            </div>
        </div>


    );
}

export default RowButtons;