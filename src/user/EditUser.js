import { API_URL } from '../config';
import TextInput from '../register/TextInput';
import ProfilePic from './ProfilePic';
import UpdateButton from '../viewingPage/UpdateButton';
import { useState} from 'react';
import '../register/TextInput.css';


const EditUser = ({ user, token, setUpdateTrigger, handleClose }) => {
    const [submittingEdit, setSubmittingEdit] = useState(false);
    const [updateUserFields, setUpdateUserFields] = useState({
        firstName: "",
        lastName: "",
        password: "",
        profilePicture: null,
    });

    // Handle field changes (either text or file input)
    const handleChange = (event) => {
        const { name, value, files } = event.target;
        console.log(`Changing field: ${name}, value: ${value}`); // Log the changed field for debugging
        setUpdateUserFields({
            ...updateUserFields,
            [name]: files ? files[0] : value // Handle file uploads if applicable
        });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!user) {
            console.error("User not found");
            return;
        }
        setSubmittingEdit(true);
        updateEdit(user.userName);
        handleClose();
        setUpdateTrigger(prev => !prev);
    };

    // Function to update user details by making a PUT request to the API
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
        try {
            const response = await fetch(`${API_URL}/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const updatedUser = await response.json();
                console.log('User updated successfully:', updatedUser);
            } else {
                console.error('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="wrapperEdit">
            <div className="card custom-card-width container">
                <div className="card-body">
                    <div className="row">
                        <ProfilePic name="profilePicture" onChange={handleChange} />
                        <TextInput 
                            name="firstName" 
                            kind="first name" 
                            defaultValue={updateUserFields.firstName}  
                            onChange={handleChange} 
                        />
                        <TextInput 
                            name="lastName" 
                            kind="last name" 
                            defaultValue={updateUserFields.lastName} 
                            onChange={handleChange} 
                        />
                        <TextInput 
                            name="password" 
                            kind="password" 
                            type="password" 
                            defaultValue={updateUserFields.password} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>
                <div className="list-group list-group-flush">
                    <UpdateButton onClick={handleSubmit} value="Update user" />
                </div>
            </div>
        </div>
    );
}

export default EditUser;
