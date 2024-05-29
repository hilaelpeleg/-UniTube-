import { useRef } from "react";
import './username.css'

function Username({ setSearchUsername }) {

    const nameInput = useRef(null);

    const NameInput = function () {
        setSearchUsername(nameInput.current.value);
    }


    return (
        <div className="col-md-6 position-relative margin">
            <div className="input-group has-validation">
                <span className="input-group-text" id="validationTooltipUsernamePrepend">@</span>
                <input ref={nameInput} onKeyUp={NameInput}
                    type="text" className="form-control" id="validationTooltipUsername"
                    aria-describedby="validationTooltipUsernamePrepend" placeholder="user name"
                    required />
                <div className="invalid-tooltip">
                    Please choose a unique and valid username.
                </div>
            </div>
        </div>
    )
        ;
}

export default Username;