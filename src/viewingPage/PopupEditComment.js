// PopupEditComment.js
import React from 'react';
import EditComment from './EditComment';
import './PopupEditComment.css';

function PopupEditComment({videoId, setVideoList, videoList, handleClose, show, setCommentsList, commentId, commentsList }) {
    return (
        show ? (
            <>     
                <div className="modal fade show" id="staticBackdrop" style={{ display: 'block' }} aria-modal="true" role="dialog">
                    <div className="modal-dialog wrapperEdit">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <EditComment
                                    handleClose={handleClose}
                                    setCommentsList={setCommentsList}
                                    commentId={commentId}
                                    commentsList={commentsList}
                                    videoList={videoList}
                                    setVideoList={setVideoList}
                                    videoId={videoId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ) : null
    );
}

export default PopupEditComment;
