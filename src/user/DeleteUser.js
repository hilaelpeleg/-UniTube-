import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const DeleteUser = async (userName, token) => {
    const navigate = useNavigate();

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
            navigate('/logIn');
        } else {
            const errorData = await response.json();
            console.error('Failed to delete user:', errorData.error);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

export default DeleteUser;