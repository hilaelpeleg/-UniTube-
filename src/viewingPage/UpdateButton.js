import './UpdateButton.css';

function UpdateButton({ onClick, value }){
    return(
        // the "update" button div
        <div className="d-grid col-6 mx-auto my-3 widthEdit">
            <button className="btn btn-primary color" type="button" onClick={onClick}>{value} </button>
        </div>
    );
}

export default UpdateButton;