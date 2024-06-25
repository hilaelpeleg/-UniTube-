function Video({name, onChange, errors}) {
    return (
        // file of video input
        <div className="mb-3">
            <label htmlFor="formFileSm" className="form-label">please upload video </label>
            <input className="form-control form-control-sm"  onChange={onChange}
            name={name} type="file" />
             <p className="formerror">{errors}</p>
        </div>
    );
}

export default Video;