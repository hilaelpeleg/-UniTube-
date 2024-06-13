import VideoItem from "./VideoItem";
import './videoItems.css';
import { useNavigate } from 'react-router-dom';


function VideoItems({ videoList, colWidth }) {

    const navigate = useNavigate();

    const handleVideoClick = (video) => {
        navigate(`/viewing/${video.id}`);
    };


    return (
        <div className="row gx-3">
            {videoList.map(video => (
                <div key={video.id} className={colWidth}>
                    <VideoItem
                        onClick={() => handleVideoClick(video)}
                        props={video}
                    />
                </div>
            ))}
        </div>
    );
}

export default VideoItems;