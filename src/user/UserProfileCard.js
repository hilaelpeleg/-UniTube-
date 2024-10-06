import React from 'react';
import { API_URL } from '../config';
import subscribe from '../homePage/svg icons/subscribe.svg';

const UserProfileCard = ({ user }) => {
  return (
    <div className="menu-navigation">
      <div className="me-3 custom-margin-reset" >
        <div className="cardUserA Profilecard" >
          <div className="card-body">
            <div>
              <div className="profile-container">
                <div className="circular-profile">
                  {/* Display profile picture, or default if not available */}
                  <img src={user && user.profilePicture ? `${API_URL}${user.profilePicture}` : 'path-to-default-image'} alt="Profile" />
                </div>
                <div className="user-info userSub">
                  {/* Display username */}
                  <h1 className="user-username">{user.userName}</h1>
                  {/* Display first and last name */}
                  <p className="user-fullname">
                    {user.firstName} {user.lastName}
                  </p>
                  {/* Subscribe button */}
                  <div className="row-buttons-container marginupSUb">
                    <div className='btn-group-container-row widthSub'>
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
