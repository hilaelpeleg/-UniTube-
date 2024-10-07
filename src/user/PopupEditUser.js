import React from 'react';
import '../viewingPage/PopupEdit.css';
import EditUser from './EditUser';

function PopupEditUser({ token, user, show, handleClose, setUpdateTrigger }) {
    return (
        show ? (
            <>
                <div className="overlay" onClick={handleClose}></div>
                <div className="modal fade show" id="staticBackdrop" style={{ display: 'block' }} aria-modal="true" role="dialog">
                    <div className="modal-dialog wrapperEdit">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <EditUser
                                    user={user}
                                    token={token}
                                    handleClose={handleClose}
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

export default PopupEditUser;