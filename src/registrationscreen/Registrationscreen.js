import Button from "../button";
import './Registrationscreen.css';

function RegisterScreen() {
    return (
        <div className="card custom-card-width container" >
            <div className="card-body">
                <h5 className="card-title">Sign up</h5>
                <p className="card-text">choose profile picture</p> 
            </div>
            <div className="list-group list-group-flush">
                <Button value="Sign me up!"/>
            </div>
            <div id="Login" className="list-group list-group-flush">
                <Button value="Already have an account? Login! "/>
            </div>
        </div>
    );

}

export default RegisterScreen;