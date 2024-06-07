import './username.css'

function Username({name, onChange, error }) {


    return (
        <div className="col-md-6 position-relative margin">
            <div className="input-group has-validation">
                <span className="input-group-text" id="validationTooltipUsernamePrepend">@</span>
                <input
                    type="text" className="form-control" id="validationTooltipUsername"
                    aria-describedby="validationTooltipUsernamePrepend" placeholder="user name"
                    onChange={onChange} name={name}
                    required />
            <p>{error}</p>
            </div>
        </div>
    )
        ;
}

export default Username;
