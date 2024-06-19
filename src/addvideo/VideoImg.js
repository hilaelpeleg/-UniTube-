function VideoImg({name, onChange, errors}) {
    return (
        <div className="mb-3">
            <label htmlFor="formFileSm" className="form-label">please upload video img</label>
            <input className="form-control form-control-sm" onChange={onChange}
            name={name} type="file" />
             <p className="formerror">{errors}</p>
        </div>
    );
}

export default VideoImg;