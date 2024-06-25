import './ButtonLog.css'


function ButtonLog({ onClick, value }) {


    return (
        // button log
        <div className="d-grid col-6 mx-auto my-3 widtL">
            <button className="btn btn-primary color" type="button" onClick={onClick}>{value} </button>
        </div>
    )
        ;
}

export default ButtonLog;