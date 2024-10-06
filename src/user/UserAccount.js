import React, { useState, useEffect } from 'react';
import LeftMenu from '../homePage/LeftMenu'; // Import the LeftMenu component
import './UserAccount.css';
import UserProfileCard from './UserProfileCard';
import UserPageMenu from './UserPageMenu';
import VideoItems from '../videoItem/VideoItems';
import { API_URL } from '../config'; // Importing API_URL from config

const UserAccount = ({ token, darkMode, setDarkMode, logedinuser, setVideoList }) => {
  const user = logedinuser ? logedinuser : null;
  const [filteredVideoList, setFilteredVideoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserVideos = async () => {
      if (user && user.userName) {
        console.log("Preparing to fetch videos for user:", user.userName);

        try {
          const response = await fetch(`${API_URL}/api/users/${user.userName}/videos`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Authorization token is passed correctly
            },
          });

          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }

          const data = await response.json();
          console.log("Data fetched successfully:", data); // Log the fetched data
          setFilteredVideoList(data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching videos:", err);
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchUserVideos(); // Call the async function to fetch data
  }, [user]);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error loading videos: {error}</p>;

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {/* Left Menu */}
        <LeftMenu darkMode={darkMode} setDarkMode={setDarkMode}
          user={user} videoList={filteredVideoList} setVideoList={setVideoList}
          handleChange={() => setDarkMode(!darkMode)} 
          />
        {/* Main Content */}
        <div className="col-12">
          <div className="d-flex justify-content-end align-items-center mb-4">
            <UserProfileCard user={user} />
          </div >
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

export default UserAccount;
