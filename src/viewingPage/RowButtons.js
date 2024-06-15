import thumb_up from './viewingsvg/thumb_up.svg'
import download from './viewingsvg/download.svg'
import thumb_down from './viewingsvg/thumb_down.svg'
import share from './viewingsvg/share.svg'
import Dots from './viewingsvg/dots.svg';
import './RowButtons.css';




function RowButtons({ like, updateLikes }) {
    const onclickLike = () => {
        updateLikes(like + 1)
    }

    const onclickDislike = () => {
        if (like > 0)
            updateLikes(like - 1);
    }

    return (
        <div className="row-buttons-container">
            <div >
                <div className="btn-group margin" role="group" aria-label="Basic example">
                    <button onClick={onclickLike} type="button" className="btn btn-light">
                        <img className='like' src={thumb_up} />
                        {like}</button>
                    <button onClick={onclickDislike} type="button" className="btn btn-light">
                        <img className='like' src={thumb_down} /> </button>
                </div>
                <button type="button" className="btn btn-light margin">
                    <img className='like' src={share} />
                    Share
                </button>
                <button type="button" className="btn btn-light margin">
                    <img className='like' src={download} />
                    Download</button>
                <button type="button" className="btn btn-light margin">
                    <img className='like' src={Dots} />
                </button>
            </div>
        </div>


    );
}

export default RowButtons;