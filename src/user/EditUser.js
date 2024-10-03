import { API_URL } from '../config';
import TextInput from '../register/TextInput';
import ProfilePic from './ProfilePic';
import UpdateButton from '../viewingPage/UpdateButton';
import { useState } from 'react';


const EditUser = (user, token, setUpdateTriggerEditUser, handleCloseEditUser) => {
    const [submittingEdit, setSubmittingEdit] = useState(false);
    const [updateUserFields, setUpdateUserFields] = useState({
        firstName: user ? user.firstName : "",
        lastName: user ? user.lastName : "",
        password: user ? user.password : "",
        profilePicture: user ? user.profilePicture : "",
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setUpdateUserFields({
            ...updateUserFields, [name]: files ? files[0] : value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!user) {
            console.error("User not found");
            return;
        }
        setSubmittingEdit(true);
        updateEdit(user.userName);
        handleCloseEditUser();
        setUpdateTriggerEditUser(prev => !prev);
    };

    const updateEdit = async (id) => {
        const formData = new FormData();
        if (updateUserFields.firstName) {
            formData.append('firstName', updateUserFields.firstName);
        }
        if (updateUserFields.lastName) {
            formData.append('lastName', updateUserFields.lastName);
        }
        if (updateUserFields.password) {
            formData.append('password', updateUserFields.password);
        }
        if (updateUserFields.profilePicture instanceof File) {
            formData.append('profilePicture', updateUserFields.profilePicture);
        }

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value instanceof File ? value.name : value}`);
        }
        console.log(user.userName);
    };

    return (
        <div className="wrapperEdit">
            <div className="card custom-card-width container">
                <div className="card-body">
                    <div className="row">
                        <ProfilePic name="profilePicture" onChange={handleChange} />
                        <TextInput name="first name" kind="first name" value={updateUserFields.firstName} onChange={handleChange} />
                        <TextInput name="last name" kind="last name" value={updateUserFields.lastName} onChange={handleChange} />
                    </div>
                </div>
                <div className="list-group list-group-flush">
                    <UpdateButton onClick={handleSubmit} value="Update Video" />
                </div>
            </div>
        </div>
    );
}

export default EditUser;