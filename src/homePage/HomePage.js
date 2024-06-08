import VideoItems from '../videoItem/VideoItems';
import './HomePage.css'
import LeftMenu from './LeftMenu'
import React from 'react';



function HomePage({videoList, setVideoList}) {

    return (
        <div className="container-fluid">
            <div className="row">   
                <div className="col-3 height">
                    <LeftMenu />
                </div>
            </div>
            <div className="row">
                <div className="col ">
                <VideoItems videoList={videoList} setVideoList={setVideoList} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;