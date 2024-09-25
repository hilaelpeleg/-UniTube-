import TextInputLog from "./TextInputLog";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';
import ButtonLog from "./ButtonLog";
import { API_URL } from '../config';

function LogIn({ setlogedinuser, setToken }) {
    // useState hooks to manage local state for password, and error messages
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    // Function to handle login logic
    
    const handleLogin = async () => {
        const errors = validateLogin(userName, password);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch(`${API_URL}/api/tokens/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userName, password })
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const token = responseData.token;
                    console.log("Token received:", token);
                    
                    const userResponse = await fetch(`${API_URL}/api/users/${userName}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,  // Send token in the header
                            'Content-Type': 'application/json',
                        },
                    });

                    if (userResponse.ok) {
                        const user = await userResponse.json();
                        console.log("User details received:", user);
    
                        if (!user.firstName) throw new Error("First name is missing.");
                        if (!user.lastName) throw new Error("Last name is missing.");
                        if (!user.userName) throw new Error("Username is missing.");
                        if (!user.profilePicture) throw new Error("Profile picture is missing.");
    
                        setlogedinuser({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            userName: user.userName,
                            profilePicture: user.profilePicture
                        });
    
                        setToken(token);
                        navigate('/'); // Redirect to homepage or any other protected route
                    } else {
                        setFormErrors({ userName: "Invalid username or password" });
                    }
                } else {
                    setFormErrors({ userName: "Invalid username or password" });
                }
            } catch (error) {
                console.error("Login failed:", error);
                setError("Login failed. Please try again later.");
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
                        value={userName} onChange={(event) => setUserName(event.target.value)} error={formErrors.userName} />
                    <div className="row">
                        <TextInputLog name="password" kind="password" type="password"
                            value={password} onChange={(event) => setPassword(event.target.value)} error={formErrors.password} />
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