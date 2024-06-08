import '../app/profile.css'


function VideoItem({ thumbnailUrl, title, uploader, description, likes, uploadDate, duration }) {
    return (
        <div >
            <div className="thumbnail-container">
            <img src={thumbnailUrl} class="card-img-top" alt="profile" />
            <div className="square" >
                {duration}
            </div>
            </div>
            
            <div class="card-body">
                <img id="profile" src="noa.jpg" />
                <h5 className="card-text title">{title}</h5>
                <div className="box">
                <p className="card-text p">{uploader}</p>
                <p className="card-text p">{description}</p>
                <p class="card-text"><small class="text-body-secondary">{uploadDate} { likes}</small></p>
                </div>
            </div>
        </div>
    );
}

export default VideoItem;