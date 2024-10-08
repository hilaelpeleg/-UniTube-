import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import subscribe from '../homePage/svg icons/subscribe.svg';

const UserProfileCard = ({ userName }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details from the server
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/${userName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        setUserDetails(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userName]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error loading user details: {error}</p>;

  // In case the data is not properly fetched or userDetails is null
  if (!userDetails) return <p>User details not found</p>;

  // Display user details after fetching
  return (
    <div className="menu-navigation">
      <div className="me-3 custom-margin-reset">
        <div className="cardUserA Profilecard">
          <div className="card-body">
            <div>
              <div className="profile-container">
                <div className="circular-profile">
                  {/* Display profile picture, or default if not available */}
                  <img
                    src={userDetails.profilePicture ? `${API_URL}${userDetails.profilePicture}` : 'path-to-default-image'}
                    alt="Profile"
                  />
                </div>
                <div className="user-info userSub">
                  {/* Display username */}
                  <h1 className="user-username">{userDetails.userName}</h1>
                  {/* Display first and last name */}
                  <p className="user-fullname">
                    {userDetails.firstName} {userDetails.lastName}
                  </p>
                  {/* Subscribe button */}
                  <div className="row-buttons-container marginupSUb">
                    <div className="btn-group-container-row widthSub">
                      <button type="button" className="btn btn-light margin marginSub">
                        <img className="marginbutton" src={subscribe} alt="subscribe" />
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
