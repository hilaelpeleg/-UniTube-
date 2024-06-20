import React from 'react';
import './PopupEdit.css';

function PopupEdit({ show, handleClose }) {
    return (
        show ? (
            <>
                <div className="modal fade show" id="staticBackdrop" style={{ display: 'block' }} aria-modal="true" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel"> title</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                                <button type="button" className="btn btn-primary">Edit vide</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ) : null
    );
}

export default PopupEdit;
