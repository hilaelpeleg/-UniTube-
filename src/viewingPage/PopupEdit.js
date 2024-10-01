import React from 'react';
import './PopupEdit.css';
import EditVideo from './EditVideo';

function PopupEdit({token, user,  show, handleClose, videoId, videoList, setVideoList,setUpdateTrigger }) {
    return (
        show ? (
            // popup edit modal
            <>
                <div className="modal fade show" id="staticBackdrop" style={{ display: 'block' }} aria-modal="true" role="dialog">
                    <div className="modal-dialog wrapperEdit">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"> Edit</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <EditVideo
                                user={user}
                                token={token}
                                    handleClose={handleClose}
                                    setVideoList={setVideoList}
                                    videoId={videoId}
                                    videoList={videoList}
                                    setUpdateTrigger={setUpdateTrigger}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ) : null
    );
}

export default PopupEdit;
