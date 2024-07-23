import ButtonRegister from "./ButtonRegister";
import './Register.css';
import ProfilePicture from "./ProfilePicture";
import Username from "./username";
import TextInput from "./TextInput";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function Register({ userList, setUserList }) {
        // useState hooks to manage local state for form errors, submission status, and input fields

    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [inputFields, setInputFields] = useState({
        firstName: "",
        lastName: "",
        password: "",
        reEnterPassword: "",
        userName: "",
        profilePicture: null
    });
    // handleChange function to update state when input fields change

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setInputFields({ ...inputFields, [name]: files ? files[0] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(inputFields));
        setSubmitting(true);
    }

        // validate function to check if input fields meet the required criteria

    const validate = (inputFields) => {
        // create limits for the inputs
        const errors = {}
        if (!inputFields.userName) {
            errors.userName = "user name is required!";
        }
        if(userList.find(user => user.userName == inputFields.userName)){
            errors.userName ="the username is already taken";
        }
        if (!inputFields.firstName) {
            errors.firstName = "first name is required!";
        }
        if (!inputFields.lastName) {
            errors.lastName = "last name is required!";
        }
        if (inputFields.password.length < 8) {
            errors.password = "password is too short";
        }
        if (!inputFields.password) {
            errors.password = "password is required!";
        }
        if (!inputFields.reEnterPassword) {
            errors.reEnterPassword = "re enter password is required!";
        }
        else if (inputFields.password !== inputFields.reEnterPassword) {
            errors.reEnterPassword = "Passwords do not match";
        }
        return errors;
    }


    // addNewUser function to add a new user to the user list

    const addNewUser = () => {
        let profilePictureUrl = inputFields.profilePicture;

        // Check if profilePicture is a file and create a URL if it is
        if (profilePictureUrl instanceof File) {
            profilePictureUrl = URL.createObjectURL(inputFields.profilePicture);
        } else if (!profilePictureUrl) {
            // Default profile picture URL
            profilePictureUrl = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
        }
        const user = {
            "firstName": inputFields.firstName,
            "lastName": inputFields.lastName,
            "password": inputFields.password,
            "reEnterPassword": inputFields.reEnterPassword,
            "userName": inputFields.userName,
            "profilePicture": profilePictureUrl
        }
        setUserList([...userList, user]);
        console.log(userList);
    }

    const navigate = useNavigate();

    // useEffect hook to handle form submission and navigation

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length == 0 && submitting) {
            addNewUser();
            console.log(inputFields);
            navigate('/logIn'); // Redirect to login page
        }

    }, [formErrors]);

    return (
        <div className="wrapper">
        <div className="card custom-card-width container"  >
            <div className="cardR">
                <h5 className="card-title">Sign up</h5>
                <div className="row">
                    <ProfilePicture name="profilePicture" onChange={handleChange} />
                    <TextInput name="firstName" kind="first name" 
                    value={inputFields.firstName}
                        onChange={handleChange} error={formErrors.firstName} type={"text"}/>
                    <TextInput name="lastName"  kind="last name" value={inputFields.lastName}
                        onChange={handleChange} error={formErrors.lastName} type={"text"}/>
                     <div className="form-text-pass">password must include 8 numbers!</div>
                    <TextInput name="password"  kind="password" value={inputFields.password}
                        onChange={handleChange} error={formErrors.password} type="password"/>
                    <TextInput name="reEnterPassword"  kind="re-enter password" value={inputFields.reEnterPassword}
                        onChange={handleChange} error={formErrors.reEnterPassword} type="password"/>
                </div>
                <Username name="userName" value={inputFields.userName} onChange={handleChange} error={formErrors.userName} />
            </div>
            <div className="list-group list-group-flush">
                <ButtonRegister onClick={handleSubmit} value="Sign me up!" />
            </div>
            <div id="Login" className="list-group list-group-flush">
                <ButtonRegister onClick={() => navigate('/logIn')} value="Already have an account? Log in!" />
            </div>
        </div>
        </div>
    );

}

export default Register;