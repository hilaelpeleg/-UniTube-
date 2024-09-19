import VideoItem from "./VideoItem";
import { useNavigate } from 'react-router-dom';

// VideoItems component receives videoList and colWidth as props

function VideoItems({ videoList, colWidth }) {

    // useNavigate hook from react-router-dom to navigate programmatically

    const navigate = useNavigate();
    // Function to handle video click event

    const handleVideoClick = (video) => {
        // Navigate to the viewing page of the clicked video

        navigate(`/viewing/${video.id}`);
    };

    return (
        <div className="row gx-3">
            {videoList && videoList.length > 0 ? (
                videoList.map(video => (
                    <div key={video.id} className={`${colWidth} hover`}>
                        <VideoItem
                            onClick={() => handleVideoClick(video)}
                            props={video}
                        />
                    </div>
                ))
            ) : (
                <p>No videos available</p> // Fallback message if no videos are available
            )}
        </div>
    );
}

export default VideoItems;