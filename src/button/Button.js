import './button.css'


function Button({ onClick, value }) {


    return (
        <div className="d-grid col-6 mx-auto my-3 widthb">
            <button className="btn btn-primary color" type="button" onClick={onClick}>{value} </button>
        </div>
    )
        ;
}

export default Button;