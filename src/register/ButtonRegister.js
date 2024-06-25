import './ButtonRegister.css';

function ButtonRegister({ onClick, value }) {

    return (
        // button register
        <div className="d-grid col-6 my-3 widthR">
            <button className="btn btn-primary color" type="button" onClick={onClick}>{value} </button>
        </div>
    )
        ;
}

export default ButtonRegister;