import React from 'react';
import LeftMenu from '../homePage/LeftMenu'; // Import the LeftMenu component
import './UserAccount.css';
import { API_URL } from '../config';



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
            {/* Profile Picture */}
            <div className="me-3">
              <div className="cardUserA" >
                <div className="card-body">
                  <div>
                    <div className="profile-container">
                      <div className="circular-profile">
                        <img src={user && user.profilePicture ? `${API_URL}${user.profilePicture}` : 'path-to-default-image'} alt="Profile" />
                      </div>
                      <div className="user-info">
                        {/* שם המשתמש */}
                        <h1 className="user-username">{user.userName}</h1>
                        {/* שם פרטי ושם משפחה מתחת לשם המשתמש */}
                        <p className="user-fullname">
                          {user.firstName} {user.lastName}
                        </p>



                        <div className="row-buttons-container">
            <div className='btn-group-container-row'>
                <button type="button" className="btn btn-light margin">
                    {/* <img className="marginbutton" src={share} alt="Share" /> */}
                    Share
                </button>
                <button type="button" className="btn btn-light margin">
                    {/* <img className="marginbutton" src={download} alt="Download" /> */}
                    Download
                </button>
                            </div>
        </div>
















                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Profile Info */}
          </div>
          {/* Navigation Bar */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Playlists
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Community
              </a>
            </li>
          </ul>

          {/* Content Area */}
          <div className="text-center">
            <div className="mb-4">
              <img src="path-to-image" alt="Illustration" width="200" />
            </div>
            <p className="lead">
              Create content from anywhere. Upload and record at home or from anywhere, and everything you create will appear here.
            </p>
            <button className="btn btn-dark">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
