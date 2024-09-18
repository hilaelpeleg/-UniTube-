function CheckUserNameExists(userName) {

    const checkUserNameExists = async (userName) => {
        try {
            const response = await fetch(`http://localhost:8200/api/users/${userName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const user = await response.json();
                return !!user;  // If the user exists, return true, otherwise false
            } else if (response.status === 404) {
                return false;  // If 404, user does not exist
            } else {
                console.error("Error checking username:", response.statusText);
                return false;
            }
        } catch (error) {
            console.error("Error checking username:", error);
            return false;
        }
    };

    return checkUserNameExists(userName);  // Return the result of checkUserNameExists
}


export default CheckUserNameExists;