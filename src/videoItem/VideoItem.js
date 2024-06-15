import './VideoItem.css'


function VideoItem({ props, onClick}) {
    return (
        
        <div >
            <div className="thumbnail-container">
                <img src={props.thumbnailUrl} id="img-top" className="card-img-top" alt="profile" onClick={onClick}/>
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
                    <p className="card-text"><small className="text-body-secondary">{props.uploadDate} {props.likes}</small></p>
                </div>
            </div>
        </div>
    );
}

export default VideoItem;