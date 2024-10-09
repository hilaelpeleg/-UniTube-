import './TextInput.css';

function TextInput({ name, kind, defaultValue, onChange, error, type = "text" }) {
    return (
        <div className="col-md-4 margin">
            <input 
                type={type} 
                className="form-control"
                placeholder={kind}  
                name={name}
                defaultValue={defaultValue}  
                onChange={onChange} 
                required 
            />
            {error && <p className="formerror">{error}</p>}
        </div>
    );
}

export default TextInput;
