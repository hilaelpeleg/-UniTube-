import VideoItem from "./VideoItem";
import './videoItems.css';

function VideoItems({videoList }) {

    return (
        <div className="row gx-3">
            {videoList.map(video => (
                <div key={video.id} className="col-xl-4 col-lg-4 col-md-4 col-sm-12 hover">
                    <VideoItem
                        props={video}
                    />
                </div>
            ))}
        </div>
    );
}

export default VideoItems;