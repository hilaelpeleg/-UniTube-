import VideoItems from '../videoItem/VideoItems';
import './HomePage.css'
import LeftMenu from './LeftMenu'
import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';


function HomePage({setToken, token, logedinuser, darkMode, setDarkMode, videoList, setVideoList}) {
    const [filteredVideoList, setFilteredVideoList] = useState(videoList);
    const user = logedinuser ? logedinuser : null;

    useEffect(() => {
        const fetchVideos = async () => {
          try {
            const res = await fetch(`${API_URL}/api/videos/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await res.json();
            setVideoList(data ?? []);
          } catch (error) {
            console.error('Error fetching videos:', error);
          }
        };
    
        fetchVideos();
      }, [logedinuser.profilePicture, logedinuser.firstName, logedinuser.lastName, logedinuser.userName ]);

    useEffect(() => {
        setFilteredVideoList(videoList); // Initialize filteredVideoList with the original list
    }, [videoList]);

    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col-3 height">
                    <LeftMenu logedinuser={logedinuser} setToken={setToken}  token= {token} user={user} darkMode={darkMode} setDarkMode={setDarkMode} originalVideoList={videoList}
                        handleChange={() => setDarkMode(!darkMode)} setFilteredVideoList={setFilteredVideoList}
                         />
                </div>
            </div>
            <div className="row">
                <div className="col video-list-container">
                    <VideoItems videoList={filteredVideoList}
                       logedinuser={logedinuser} colWidth={"col-xl-4 col-lg-4 col-md-4 col-sm-12 hover"} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;

