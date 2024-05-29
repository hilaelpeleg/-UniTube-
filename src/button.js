import './button.css'


function Button({value}) {
    return (
        <div className="d-grid col-6 mx-auto my-3">
            <button className="btn btn-primary" type="button">{value}</button>
        </div>
        
    )
        ;
}

export default Button;