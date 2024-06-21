import VideoItems from '../videoItem/VideoItems';
import './HomePage.css'
import LeftMenu from './LeftMenu'
import React from 'react';

function HomePage({setVideoList, userLogin, videoList}) {
       return (
        <div className="container-fluid ">
            <div className="row">   
                <div className="col-3 height">
                    <LeftMenu videoList={videoList} setVideoList={setVideoList} userLogin={userLogin} />
                </div>
            </div>
            <div className="row">
                <div className="col video-list-container">
                <VideoItems videoList={videoList}
                colWidth={"col-xl-4 col-lg-4 col-md-4 col-sm-12 hover"} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;

