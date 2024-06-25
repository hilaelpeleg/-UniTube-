import TextInputLog from "./TextInputLog";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';
import ButtonLog from "./ButtonLog";


function LogIn({ userList, setUserLogin }) {
    // useState hooks to manage local state for username, password, and error messages
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

        // Function to handle login logic

    const handleLogin = () => {
                // Find the user in the userList with the provided username and password

        const user = userList.find(user => user.userName === userName && user.password === password);
        if (user) {
                        // If user is found, update the userLogin state and navigate to the home page

            setUserLogin({ userName: userName, password: password });
            navigate('/');
        } else {
                        // If user is not found, set an error message

            setError("Invalid username or password");
        }
    };

    return (
        <div className="wrapper">
        <div className="card custom-card-width-L container" >
            <div className="card-body">
            <h5 className="card-title">Log In</h5>
                <TextInputLog className="form-control" name="userName" kind="user name"
                    value={userName} onChange={(event) => setUserName(event.target.value)} />
                <div className="row">
                    <TextInputLog name="password" kind="password" type="password"
                        value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
            </div>
            <div className="list-group list-group-flush">
                <ButtonLog onClick={handleLogin} value="LogIn" />
            </div>
            <div className="list-group list-group-flush">
                <ButtonLog onClick={() => navigate('/Register')} value="Create a new account!" />
            </div>
        </div>
        </div>
    );

}

export default LogIn;