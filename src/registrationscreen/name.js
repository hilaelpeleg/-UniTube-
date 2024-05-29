import './name.css'


function Name({ kind }) {
    return (
        <div className="col-md-4 margin">
            <input type="text" className="form-control"
                id="validationDefault01" placeholder={kind} required />
        </div>
    );
}

export default Name;