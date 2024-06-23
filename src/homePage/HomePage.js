import VideoItems from '../videoItem/VideoItems';
import './HomePage.css'
import LeftMenu from './LeftMenu'
import React, { useState, useEffect } from 'react';

function HomePage({darkMode, setDarkMode, userLogin, videoList, handleChange}) {
    const [filteredVideoList, setFilteredVideoList] = useState(videoList);

    useEffect(() => {
        setFilteredVideoList(videoList); // Initialize filteredVideoList with the original list
    }, [videoList]);

       return (
        <div className="container-fluid ">
            <div className="row">   
                <div className="col-3 height">
                    <LeftMenu darkMode={darkMode} setDarkMode={setDarkMode} originalVideoList={videoList}
                        handleChange={() => setDarkMode(!darkMode)} setFilteredVideoList={setFilteredVideoList}
                        userLogin={userLogin} />
                </div>
            </div>
            <div className="row">
                <div className="col video-list-container">
                <VideoItems videoList={filteredVideoList}
                colWidth={"col-xl-4 col-lg-4 col-md-4 col-sm-12 hover"} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;

