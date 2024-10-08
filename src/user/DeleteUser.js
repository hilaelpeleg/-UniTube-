import { API_URL } from '../config';

const DeleteUser = async (userName, token) => {
    try {
        const response = await fetch(`${API_URL}/api/users/${userName}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log('User deleted successfully');
            return true;  // Return true to indicate success
        } else {
            const errorData = await response.json();
            console.error('Failed to delete user:', errorData.error);
            return false;  // Return false to indicate failure
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;  // Return false to indicate failure
    }
}

export default DeleteUser;
