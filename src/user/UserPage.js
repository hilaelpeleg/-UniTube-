import React, { useState, useEffect } from 'react';
import LeftMenu from '../homePage/LeftMenu'; 
import './UserPage.css';
import UserProfileCard from './UserProfileCard';
import UserPageMenu from './UserPageMenu';
import VideoItems from '../videoItem/VideoItems';
import { API_URL } from '../config';
import { useParams } from 'react-router-dom';

const UserPage = ({ darkMode, setDarkMode, logedinuser, setVideoList }) => {
  const { userName } = useParams();  // Get userName from the route parameters
  const [filteredVideoList, setFilteredVideoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Identify if the user is viewing their own account
  const isMyAccount = logedinuser && userName === logedinuser.userName;

  useEffect(() => {
    const fetchUserVideos = async () => {
      const fetchUserName = isMyAccount ? logedinuser.userName : userName;  // Fetch videos for either logged-in user or for the user in the URL

      if (fetchUserName) {
        console.log("Preparing to fetch videos for user:", fetchUserName);

        try {
          const response = await fetch(`${API_URL}/api/users/${fetchUserName}/videos`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }

          const data = await response.json();
          setFilteredVideoList(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchUserVideos(); 
  }, [userName, logedinuser, isMyAccount]);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error loading videos: {error}</p>;

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {/* Left Menu */}
        <LeftMenu darkMode={darkMode} setDarkMode={setDarkMode} user={logedinuser} videoList={filteredVideoList} setVideoList={setVideoList} />
        {/* Main Content */}
        <div className="col-12">
          <div className="d-flex justify-content-end align-items-center mb-4">
            <UserProfileCard user={isMyAccount ? logedinuser : { userName }} />
          </div>
          <UserPageMenu />
          {/* Content Area */}
          <div className="text-center video-list-container">
            <div className="mb-4">
              {/* Videos */}
              <VideoItems videoList={filteredVideoList} colWidth={"col-xl-3 col-lg-3 col-md-3 col-sm-12"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
