
function Video({name, onChange}) {
    return (
        <div className="mb-3">
            <label htmlFor="formFileSm" className="form-label">video upload</label>
            <input className="form-control form-control-sm" id="formFileSm" onChange={onChange}
            name={name} type="file" />
        </div>
    );
}

export default Video;