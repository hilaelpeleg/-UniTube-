import './videoItem.css'
import { API_URL } from '../config';


function VideoItem({ props, onClick }) {
    const imageUrl = props.thumbnailUrl.startsWith('http') 
        ? props.thumbnailUrl 
        : `${API_URL}${props.thumbnailUrl}`;
    return (
        // create the video item div 
        <div >
            <div className="thumbnail-container">
                <img src={imageUrl} id="img-top" className="card-img-top" alt="profile" onClick={onClick} />
                <div className="square" >
                    {props.duration}
                </div>
            </div>
            <div className="card-body">
                <img className="profile" src={props.profilePicture} />
                <h5 className="card-text title">{props.title}</h5>
                <div className="box">
                    <p className="card-text p">{props.uploader}</p>
                    <p className="card-text p">{props.description}</p>
                    <p className="card-text"><small className="text-body-secondary">{props.uploadDate}</small></p>
                </div>
            </div>
        </div>
    );
}

export default VideoItem;