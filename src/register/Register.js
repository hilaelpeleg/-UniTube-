import Button from "../button";
import './Register.css';
import ProfilePicture from "./ProfilePicture";
import Username from "./username";
import TextInput from "./TextInput";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';



function Register({ userList, setUserList }) {
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [inputFields, setInputFields] = useState({
        firstName: "",
        lastName: "",
        password: "",
        reEnterPassword: "",
        userName: "",
        profilePicture: ""
    });

    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(inputFields));
        setSubmitting(true);
    }

    const validate = (inputFields) => {
        const errors = {}
        if (!inputFields.userName) {
            errors.userName = "user name is required!";
        }
        if (!inputFields.firstName) {
            errors.firstName = "first name is required!";
        }
        if (!inputFields.lastName) {
            errors.lastName = "last name is required!";
        }
        if (!inputFields.password) {
            errors.password = "password is required!";
        }
        if (inputFields.password.length < 5) {
            errors.password = "password is too short";
          }
        if (!inputFields.reEnterPassword) {
            errors.reEnterPassword = "re enter password is required!";
        }
    
        return errors;
    }



    const addNewUser = () => {
        const user = {
            "firstName": inputFields.firstName,
            "lastName": inputFields.lastName,
            "password": inputFields.password,
            "reEnterPassword": inputFields.reEnterPassword,
            "userName": inputFields.userName,
            "profilePicture": inputFields.profilePicture
        }
        setUserList([...userList, user]);
        console.log(userList);
    }

    const navigate = useNavigate();


    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length == 0 && submitting) {
            addNewUser();
            console.log(inputFields);
            navigate('/login'); // Redirect to login page
        }

    }, [formErrors]);

    return (
        <div className="card custom-card-width container"  >
            <div className="card-body">
                <h5 className="card-title">Sign up</h5>
                <div className="row">
                    <ProfilePicture name="profilePicture" onChange={handleChange} />
                    <TextInput name="firstName" kind="first name" value={inputFields.firstName} onChange={handleChange} errors={formErrors.firstName}/>
                    <TextInput name="lastName" kind="last name" value={inputFields.lastName} onChange={handleChange} errors={formErrors.lastName}/>
                    <TextInput name="password" kind="password" value={inputFields.password} onChange={handleChange} errors={formErrors.password}/>
                    <TextInput name="reEnterPassword" kind="re-enter password" value={inputFields.reEnterPassword} onChange={handleChange} errors={formErrors.reEnterPassword}/>
                </div>
                <Username name="userName" value={inputFields.userName} onChange={handleChange} error={formErrors.userName}/>
            </div>
            <div className="list-group list-group-flush">
                <Button onClick={handleSubmit} value="Sign me up!" />
            </div>
            <div id="Login" className="list-group list-group-flush">
                <Button onClick={() => navigate('/login')} value="Already have an account? Log in!" />
            </div>
        </div>
    );

}

export default Register;