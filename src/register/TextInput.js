import './TextInput.css'


function TextInput({ name, kind, onChange, error, type}) {
    return (
        // text input div for register page
        <div className="col-md-4 margin ">
            <input type={type} className="form-control"
                 placeholder={kind}
                name={name}
                onChange={onChange}
                required />
            {error && <p className="formerror">{error}</p>}
        </div>
    );
}

export default TextInput;