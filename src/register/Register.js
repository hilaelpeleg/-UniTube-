import ButtonRegister from "./ButtonRegister";
import './Register.css';
import ProfilePicture from "./ProfilePicture";
import Username from "./username";
import TextInput from "./TextInput";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CheckUserNameExists from "./CheckUserNameExists";
import CreateUser from "./CreateUser";

function Register({ token }) {
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
        const userDetails = {
            firstName: inputFields.firstName,
            lastName: inputFields.lastName,
            password: inputFields.password,
            userName: inputFields.userName,
            profilePicture: null // Initialize profilePicture as null
        };

        // Check if a profile picture is provided
        if (inputFields.profilePicture instanceof File) {
            const profilePictureUrl = URL.createObjectURL(inputFields.profilePicture); // Create a URL for the file
            userDetails.profilePicture = profilePictureUrl; // Set the URL in userDetails
            await submitUserDetails(userDetails); // Submit user details to the server
        } else {
            // If no profile picture is provided, use a default image URL
            userDetails.profilePicture = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
            await submitUserDetails(userDetails); // Submit user details with default image
        }
    };

    // Function to send user details to the server
    const submitUserDetails = async (userDetails) => {
        const newUser = await CreateUser(userDetails, token); // Call the CreateUser function with userDetails
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
