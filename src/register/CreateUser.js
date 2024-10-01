import { API_URL } from '../config';

// CreateUser function to send the new user to the server
const CreateUser = async (formData) => {  // Change parameter to formData
    try {
        const response = await fetch(`${API_URL}/api/users`, {
            method: 'POST',
            body: formData  // Send FormData directly
        });

        console.log("client side", formData);
        if (response.ok) {
            const result = await response.json();
            console.log('User created successfully:', result);
            return result;  // Return the created user data
        } else {
            const errorData = await response.json();
            console.error('Failed to create user:', errorData.error);
            return null;
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
};

export default CreateUser;
