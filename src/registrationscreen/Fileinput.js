import './Registrationscreen.css';


function Fileinput() {
    return (
        <div className="mb-3">
            <label for="formFileSm" className="form-label">choose profile picture</label>
            <input className="form-control form-control-sm" id="formFileSm" type="file" />
        </div>
    );

}

export default Fileinput;