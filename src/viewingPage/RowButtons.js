import thumb_up from './viewingsvg/thumb_up.svg'
import download from './viewingsvg/download.svg'
import thumb_down from './viewingsvg/thumb_down.svg'
import share from './viewingsvg/share.svg'
import Dots from './viewingsvg/dots.svg';
import { useNavigate } from 'react-router-dom';
import './RowButtons.css';



function RowButtons({videoid, videoList , setVideoList, like, updateLikes }) {

    const navigate = useNavigate();

    const deleteVideo = (id) => {
        // Use filter to create a new array without the video with the specified id
        const remainingVideos = videoList.filter(video => video.id !== id);
        // Update the state with the new array
        setVideoList(remainingVideos);
        navigate("/homepage");
    };

    const onclickLike = () => {
        updateLikes(like + 1)
    }

    const onclickDislike = () => {
        if (like > 0) updateLikes(like - 1);
    }

    return (
        <div className="row-buttons-container">
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
                <button type="button" data-bs-toggle="dropdown" className="btn btn-light margin dropdown-toggle"  >
                    <img className='marginbutton' src={Dots} />
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => deleteVideo(videoid)}>Deleting a video</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Editing a video</a></li>
                </ul>
            </div>
        </div>


    );
}

export default RowButtons;