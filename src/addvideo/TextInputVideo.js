import './TextInputVideo.css'

function TextInputVideo({ name, kind, onChange, error, type}) {
    return (
        <div className="col-md-4 margin ">
            <input type={type} className="form-control" id="Addvideo"
                 placeholder={kind}
                name={name}
                onChange={onChange}
                required />
            {error && <p className="formerror">{error}</p>}
        </div>
    );
}

export default TextInputVideo;