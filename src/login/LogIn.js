import TextInput from "../register/TextInput";
import Button from "../button/Button";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';


function Login({ userList, setUserLogin }) {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        const user = userList.find(user => user.userName === userName && user.password === password);
        if (user) {
            setUserLogin({ userName: userName, password: password });
            navigate('/homePage');
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="wrapper">
        <div className="card custom-card-width container" >
            <div className="card-body">
            <h5 className="card-title">Log In</h5>
                <TextInput className="form-control" name="userName" kind="user name"
                    value={userName} onChange={(event) => setUserName(event.target.value)} />
                <div className="row">
                    <TextInput name="password" kind="password" type="password"
                        value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
            </div>
            <div className="list-group list-group-flush">
                <Button onClick={handleLogin} value="LogIn" />
            </div>
            <div className="list-group list-group-flush">
                <Button onClick={() => navigate('/register')} value="Create a new account!" />
            </div>
        </div>
        </div>
    );

}

export default Login;