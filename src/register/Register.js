import ButtonRegister from "./ButtonRegister";
import './Register.css';
import ProfilePicture from "./ProfilePicture";
import Username from "./username";
import TextInput from "./TextInput";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CheckUserNameExists from "./CheckUserNameExists";
import CreateUser from "./CreateUser";

function Register() {
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
        setInputFields({
            ...inputFields, [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const errors = await validate(inputFields); // Validate input fields
        setFormErrors(errors); // Update form errors state

        if (Object.keys(errors).length === 0) { // Proceed only if there are no errors
            setSubmitting(true); // Indicate submission is in progress
            addNewUser(); // Call the function to add the new user
        }
    };

    // validate function to check if input fields meet the required criteria
    const validate = async (inputFields) => {
        const errors = {};
        // Check if username is provided
        if (!inputFields.userName) {
            errors.userName = "User name is required!";
        } else {
            // Check if username already exists by calling the async function
            const usernameExists = await CheckUserNameExists(inputFields.userName);
            if (usernameExists) {
                errors.userName = "The username is already taken";
            }
        }

        if (!inputFields.firstName) {
            errors.firstName = "First name is required!";
        }
        if (!inputFields.lastName) {
            errors.lastName = "Last name is required!";
        }
        if (!inputFields.password) {
            errors.password = "Password is required!";
        } else if (inputFields.password.length < 8) {
            errors.password = "Password is too short";
        }
        if (!inputFields.reEnterPassword) {
            errors.reEnterPassword = "Re-enter password is required!";
        } else if (inputFields.password !== inputFields.reEnterPassword) {
            errors.reEnterPassword = "Passwords do not match";
        }
        return errors;
    };

    // addNewUser function to add a new user to the server
    const addNewUser = async () => {
        const formData = new FormData(); // Create a FormData object

        // Check if profilePicture is a file and create a URL if it is
        let profilePictureUrl = inputFields.profilePicture;

        // Check if profilePicture is a file and append it to formData if it is
        if (profilePictureUrl instanceof File) {
            formData.append('profilePicture', profilePictureUrl); // Append the file to FormData
        }

        // Append other input fields to formData
        Object.keys(inputFields).forEach(key => {
            if (key !== 'profilePicture') { // Avoid appending profilePicture again since it's already handled
                formData.append(key, inputFields[key]); // Append each field
            }
        });

        // Log the FormData entries for debugging
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value instanceof File ? value.name : value}`);
        }

        // Call the CreateUser function to send the FormData to the server
        const newUser = await CreateUser(formData);

        if (newUser) {
            console.log('User created and added to the server:', newUser); // Log success message
            navigate('/logIn');  // Redirect to login page after successful registration
        } else {
            console.error('Failed to create user'); // Log error message
            setFormErrors({ userName: "Failed to create user" }); // Update form errors state
        }
    };


    const navigate = useNavigate();

    // useEffect hook to handle form submission and navigation
    useEffect(() => {
        console.log(formErrors);
        // The submission logic has been moved to handleSubmit now
    }, [formErrors]);

    return (
        <div className="wrapper">
            <div className="card custom-card-width container">
                <div className="cardR">
                    <h5 className="card-title">Sign up</h5>
                    <div className="row">
                        <ProfilePicture name="profilePicture" onChange={handleChange} />
                        <TextInput name="firstName" kind="first name"
                            value={inputFields.firstName}
                            onChange={handleChange} error={formErrors.firstName} type={"text"} />
                        <TextInput name="lastName" kind="last name" value={inputFields.lastName}
                            onChange={handleChange} error={formErrors.lastName} type={"text"} />
                        <div className="form-text-pass">Password must include 8 characters!</div>
                        <TextInput name="password" kind="password" value={inputFields.password}
                            onChange={handleChange} error={formErrors.password} type="password" />
                        <TextInput name="reEnterPassword" kind="re-enter password" value={inputFields.reEnterPassword}
                            onChange={handleChange} error={formErrors.reEnterPassword} type="password" />
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
