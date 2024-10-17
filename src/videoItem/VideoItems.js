import VideoItem from "./VideoItem";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

// VideoItems component receives videoList and colWidth as props

function VideoItems({logedinuser, videoList, colWidth }) {

    // useNavigate hook from react-router-dom to navigate programmatically

    const navigate = useNavigate();
    // Function to handle video click event

    // Function to handle video click event
    const handleVideoClick = async (video) => {
        const userId = logedinuser ? logedinuser.id : 'guest'; 
        try {
            // Increment views for the clicked video
            await fetch(`${API_URL}/api/videos/${video.id}/increment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId}) 
            });
            // Navigate to the viewing page of the clicked video
            navigate(`/viewing/${video.id}`);
        } catch (error) {
            console.error('Error updating views:', error);
            // Optionally, handle the error (e.g., show a notification)
        }
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