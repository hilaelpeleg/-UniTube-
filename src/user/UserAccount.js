import React from 'react';
import LeftMenu from '../homePage/LeftMenu'; // Import the LeftMenu component

const UserAccount = ({ darkMode, setDarkMode, logedinuser, videoList, setVideoList }) => {
  const user = logedinuser ? logedinuser : null;

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {/* Left Menu */}
        <div className="col-3 height">
          <LeftMenu darkMode={darkMode} setDarkMode={setDarkMode}
            user={user} videoList={videoList} setVideoList={setVideoList} />
        </div>

        {/* Main Content */}
        <div className="col-9">
          <div className="d-flex justify-content-end align-items-center mb-4">
            {/* Profile Picture */}
            <div className="me-3">
              <div
                className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                style={{ width: '120px', height: '120px' }}
              >
                <h1>{user && user.name ? user.name[0].toUpperCase() : 'H'}</h1>
              </div>
            </div>
            {/* Profile Info */}
            <div>
              <h2>{user ? user.name : 'Hila 2344'}</h2>
              <p>@{user ? user.username : 'hila2344'}</p>
              <p className="text-muted">Learn more about this channel...</p>
              {/* Buttons */}
              <button className="btn btn-outline-secondary me-2">
                Channel Settings
              </button>
              <button className="btn btn-outline-secondary">Manage Videos</button>
            </div>
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
            <li className="nav-item">
              <a className="nav-link" href="#">
                Channels
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
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
