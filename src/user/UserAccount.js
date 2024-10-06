import React from 'react';
import LeftMenu from '../homePage/LeftMenu'; // Import the LeftMenu component
import './UserAccount.css';
import UserProfileCard from './UserProfileCard';
import UserPageMenu from './UserPageMenu';

const UserAccount = ({ darkMode, setDarkMode, logedinuser, videoList, setVideoList }) => {
  const user = logedinuser ? logedinuser : null;
  console.log(user);

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {/* Left Menu */}
        <LeftMenu darkMode={darkMode} setDarkMode={setDarkMode}
          user={user} videoList={videoList} setVideoList={setVideoList} />
        {/* Main Content */}
        <div className="col-12">
          <div className="d-flex justify-content-end align-items-center mb-4">
          <UserProfileCard user={user} />
          </div>
          {/* Navigation Bar */}
          <UserPageMenu />
          {/* Content Area */}
          <div className="text-center">
            <div className="mb-4">
              {/* Videos */}
            </div>
            <p className="lead">
              Create content from anywhere. Upload and record at home or from anywhere, and everything you create will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
