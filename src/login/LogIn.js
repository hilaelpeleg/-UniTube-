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
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

        // Function to handle login logic

        const handleLogin = () => {
            const errors = validateLogin(userName, password);
            setFormErrors(errors);
    
            if (Object.keys(errors).length === 0) {
                const user = userList.find(user => user.userName === userName && user.password === password);
                if (user) {
                    setUserLogin({ userName: userName, password: password });
                    navigate('/');
                } else {
                    setFormErrors(prevErrors => ({ ...prevErrors, userName: "Invalid username or password" }));
                }
            }
        };

    const validateLogin = (userName, password) => {
        const errors = {};
        if (!userName) {
            errors.userName = "User name is required!";
        }
        if (!password) {
            errors.password = "Password is required!";
        }
        return errors;
    };

    return (
        <div className="wrapper">
        <div className="card custom-card-width-L container" >
            <div className="card-body">
            <h5 className="card-title">Log In</h5>
                <TextInputLog className="form-control" name="userName" kind="user name"
                    value={userName} onChange={(event) => setUserName(event.target.value)}  error={formErrors.userName}/>
                <div className="row">
                    <TextInputLog name="password" kind="password" type="password"
                        value={password} onChange={(event) => setPassword(event.target.value)}  error={formErrors.password}/>
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