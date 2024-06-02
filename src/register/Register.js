import Button from "../button";
import './Register.css';
import ProfilePicture from "./ProfilePicture";
import Username from "./username";
import TextInput from "./TextInput";
import React, { useState, useEffect } from "react";


function Register({ userList, setUserList }) {

    const [inputFields, setInputFields] = useState({
        firstName: "",
        lastName: "",
        password: "",
        reEnterPassword: "",
        userName: "",
        profilePicture: ""
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });

    };

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


    useEffect(() => {
        console.log("Updated userList:", userList); // Log updated userList in the next render cycle
    }, [userList]);

    return (
        <div className="card custom-card-width container" >
            <div className="card-body">
                <h5 className="card-title">Sign up</h5>
                <div className="row">
                <ProfilePicture name= "profilePicture"  onChange={handleChange} />
                    <TextInput name="firstName" kind="first name" value={inputFields.firstName} onChange={handleChange} />
                    <TextInput name="lastName" kind="last name" value={inputFields.lastName} onChange={handleChange} />
                    <TextInput name="password" kind="password" value={inputFields.password} onChange={handleChange} />
                    <TextInput name="reEnterPassword" kind="re-enter password" value={inputFields.reEnterPassword} onChange={handleChange} />
                </div>
                <Username name="userName" value={inputFields.userName} onChange={handleChange} />
            </div>
            <div className="list-group list-group-flush">
                <Button onClick={addNewUser} value="Sign me up!" />
            </div>
            <div id="Login" className="list-group list-group-flush">
                <Button value="Already have an account? Login! " />
            </div>
        </div>
    );

}

export default Register;