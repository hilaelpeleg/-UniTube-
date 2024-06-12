import './Register.css';


function ProfilePicture({name, onChange}) {
    return (
        <div className="mb-3">
            <label htmlFor="formFileSm" className="form-label">choose profile picture</label>
            <input className="form-control form-control-sm" onChange={onChange}
            name={name} type="file" />
        </div>
    );

}

export default ProfilePicture;