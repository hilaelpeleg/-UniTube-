import './TextInput.css'


function TextInput({name, kind, onChange}) {
    return (
        <div className="col-md-4 margin">
            <input type="text" className="form-control"
                id="validationDefault01" placeholder={kind} 
                name={name}
                onChange={onChange} 
                required />
        </div>
    );
}

export default TextInput;