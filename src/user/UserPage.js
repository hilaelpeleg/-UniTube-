import React, { useState, useEffect } from 'react';
import LeftMenu from '../homePage/LeftMenu'; 
import './UserPage.css';
import UserProfileCard from './UserProfileCard';
import UserPageMenu from './UserPageMenu';
import VideoItems from '../videoItem/VideoItems';
import { API_URL } from '../config';
import { useParams, useLocation } from 'react-router-dom';

const UserPage = ({ token, logedinuser, darkMode, setDarkMode, videoList }) => {
  const { userName } = useParams();  // Get userName from the route parameters
  const [filteredVideoList, setFilteredVideoList] = useState([]); // State to store filtered video list
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages

  const location = useLocation(); // Get location object
  const { darkMode: stateDarkMode, setDarkMode: stateSetDarkMode } = location.state || {}; // Extract from state if available

  // Identify if the user is viewing their own account
  const isMyAccount = logedinuser && userName === logedinuser.userName; // Checking if the logged-in user is the same as userName

  useEffect(() => {
    const fetchUserVideos = async () => {
      const fetchUserName = isMyAccount ? logedinuser.userName : userName;  // Determine the user for whom to fetch videos

      if (fetchUserName) {
        try {
          const response = await fetch(`${API_URL}/api/users/${fetchUserName}/videos`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Check if the response is okay
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`); // Throw an error if server response is not okay
          }

          const data = await response.json(); // Parse the JSON data
          setFilteredVideoList(data); // Set the filtered video list in state
          setLoading(false); // Update loading state
        } catch (err) {
          setError(err.message); // Set the error message
          setLoading(false); // Update loading state
        }
      }
    };

    fetchUserVideos(); // Call the function to fetch user videos
  }, [userName, logedinuser, isMyAccount]); // Dependency array

  // Display loading message while fetching data
  if (loading) return <p>Loading videos...</p>;
  // Show error message if there was an error during fetch
  if (error) return <p>Error loading videos: {error}</p>;

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {/* Left Menu */}
        <LeftMenu 
          token={token} 
          user={logedinuser} 
          darkMode={stateDarkMode !== undefined ? stateDarkMode : darkMode} 
          setDarkMode={stateSetDarkMode || setDarkMode} 
          originalVideoList={videoList} 
          handleChange={() => setDarkMode(!darkMode)} 
          setFilteredVideoList={setFilteredVideoList} 
        />
        {/* Main Content */}
        <div className="col-12">
          <div className="d-flex justify-content-end align-items-center mb-4">
            {/* Passing only userName to UserProfileCard */}
            <UserProfileCard userName={isMyAccount ? logedinuser.userName : userName} /> 
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
