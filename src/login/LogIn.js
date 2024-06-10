import TextInput from "../register/TextInput";
import Button from "../button";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login({ userList, setUserLogin }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        const user = userList.find(user => user.userName === userName && user.password === password);
        if (user) {
            setUserLogin({ userName: userName, password: password });
            console.log(userName, password);
            console.log("Login successful!");
            navigate('/homePage');
        } else {
            console.log(":(((((((((((!");
            setError("Invalid username or password");
        }
    };

    return (
        <div className="card custom-card-width container" >
            <div className="card-body">
                <TextInput className="form-control" name="userName" kind="user name"
                    value={userName} onChange={(e) => setUserName(e.target.value)} />
                <div className="row">
                    <TextInput name="password" kind="password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className="list-group list-group-flush">
                <Button onClick={handleLogin} value="LogIn" />
            </div>
            <div className="list-group list-group-flush">
                <Button onClick={() => navigate('/register')} value="Create a new account!" />
            </div>
        </div>

    );

}

export default Login;