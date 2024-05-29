import Button from "../button";
import './Registrationscreen.css';
import Fileinput from "./Fileinput";
import Username from "./username";
import Name from "./name";
import { useState } from "react";

function RegisterScreen() {
    const [searchUsername, setSearchUsername] = useState('');

    return (
        <div className="card custom-card-width container" >
            <div className="card-body">
                <h5 className="card-title">Sign up</h5>
                <div className="row">
                    <Fileinput />
                    <Name kind="fisrt name" />
                    <Name kind="last name" />
                    <Name kind="password" />
                    <Name kind="re-enter password" />
                </div>
                <Username setSearchUsername={setSearchUsername} />
            </div>
            <div className="list-group list-group-flush">
                <Button value="Sign me up!" />
            </div>
            <div id="Login" className="list-group list-group-flush">
                <Button value="Already have an account? Login! " />
            </div>
        </div>
    );

}

export default RegisterScreen;