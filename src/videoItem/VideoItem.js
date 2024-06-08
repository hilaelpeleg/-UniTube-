import '../app/profile.css'


function VideoItem({ thumbnailUrl, title, uploader, description, likes, uploadDate, duration }) {
    return (
        <div>
            <img src={thumbnailUrl} class="card-img-top" alt="..." />
            <div className="square" >
                {duration}
            </div>
            <div class="card-body">
                <img id="profile" src="noa.jpg" />
                <h5 className="card-text">{title}</h5>
                <p className="card-text">{uploader}</p>
                <p className="card-text">{description}</p>
                <p className="card-text">{likes}</p>
                <p className="card-text">{uploadDate}</p>
            </div>
        </div>
    );
}

export default VideoItem;