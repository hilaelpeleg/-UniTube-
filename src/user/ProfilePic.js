function ProfpilePic({name, onChange, errors}) {
    return (
        // img of the video
        <div className="mb-3">
            <label htmlFor="formFileSm" className="form-label">please upload profile Picture</label>
            <input className="form-control form-control-sm" onChange={onChange}
            name={name} type="file" />
             <p className="formerror">{errors}</p>
        </div>
    );
}

export default ProfpilePic;