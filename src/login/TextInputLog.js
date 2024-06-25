import './TextInputLog.css'



function TextInputLog({ name, kind, onChange, error, type}) {
    return (
        // text input for the login page
        <div className="col-md-4 margin ">
            <input type={type} className="form-control log" 
                 placeholder={kind}
                name={name}
                onChange={onChange}
                required />
            {error && <p className="formerror">{error}</p>}
        </div>
    );
}

export default TextInputLog;