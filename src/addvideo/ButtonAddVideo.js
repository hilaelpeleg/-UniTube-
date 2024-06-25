import './ButtonAddVideo.css'


function ButtonAddVideo({ onClick, value }) {

    return (
        // button
        <div className="d-grid col-6 mx-auto my-3 widthBV">
            <button className="btn btn-primary color" type="button" onClick={onClick}>{value} </button>
        </div>
    )
        ;
}

export default ButtonAddVideo;