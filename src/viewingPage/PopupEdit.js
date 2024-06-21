import React from 'react';
import './PopupEdit.css';
import EditVideo from './EditVideo';

function PopupEdit({ show, handleClose, videoId,  videoList,setVideoList }) {
    return (
        show ? (
            <>
                <div className="modal fade show" id="staticBackdrop" style={{ display: 'block' }} aria-modal="true" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"> Edit</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                            <EditVideo setVideoList={setVideoList} videoId={videoId} videoList={videoList}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ) : null
    );
}

export default PopupEdit;
