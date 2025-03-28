import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logolight from './svg icons/logolight.svg';
import homedark from './svg icons/homedark.svg';
import homelight from './svg icons/homelight.svg';
import addVideolight from './svg icons/add-videolight.svg';
import addVideodark from './svg icons/add-videodark.svg';
import darkmode from './svg icons/darkmode.svg';
import historydark from './svg icons/historydark.svg';
import historylight from './svg icons/historylight.svg';
import accountdrak from './svg icons/accountdark.svg';
import accountlight from './svg icons/accountlight.svg';
import playlistdark from './svg icons/playlistdark.svg';
import playlistlight from './svg icons/playlistlight.svg';
import switchAccountdark from './svg icons/switchdark.svg';
import switchAccountlight from './svg icons/switchlight.svg';
import settingdark from './svg icons/settingdark.svg';
import settinglight from './svg icons/settinglight.svg';
import './LeftMenu.css';
import NavItem from './NavItem';
import Search from './Search';
import login from './svg icons/login.svg';
import logout from './svg icons/logout.svg';
import lightMode from './svg icons/lightMode.svg';
import logodark from './svg icons/logodark.png';


function LeftMenu({ userList, handleChange, darkMode, videoId, originalVideoList, userLogin, setFilteredVideoList })
// Function to handle the search input and filter the video list

{
    const user = userLogin && userList ? userList.find(user => user.userName === userLogin.userName) : null;

    const doSearch = (input) => {
        if (!originalVideoList) {
            return;
        }

        if (input.trim() === "") {
            setFilteredVideoList(originalVideoList);
        } else {
            setFilteredVideoList(originalVideoList.filter(video =>
                (!videoId || video.id !== parseInt(videoId)) && video.title.toLowerCase().includes(input.toLowerCase())
            ));
        }
    };

    const navigate = useNavigate();

    // Handle login button click
    const handleLogin = () => {
        navigate('/logIn');
    };
    // Handle logout button click

    const handleLogout = () => {
        navigate('/logIn');
    };

    const svgFillColor = darkMode ? '#FFFFFF' : '#64728F';

    return (
        <nav className="navbar bg-body-tertiary fixed-top" >
            <div className="container-fluid">
                <button className="navbar-toggler" data-bs-theme={darkMode ? "dark" : "light"} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <img className="ms-2" id="logo" src={darkMode ? logodark : logolight} alt="Logo" width="106.4" height="23.2" />
                <form className="ms-auto">
                    <Search doSearch={doSearch} />
                </form>
                <a className="navbar-brand ms-auto" href="#">
                    {(userLogin.userName === "") && (
                        <button type="button" onClick={handleLogin} className="btn btn-light btnrigtmargin">
                            <img src={login} alt="Dark mode toggle" />
                        </button>
                    )}
                    {(userLogin.userName !== "") && (
                        <button type="button" onClick={handleLogout} className="btn btn-light btnrigtmargin">
                            <img src={logout} alt="Dark mode toggle" />
                        </button>
                    )}
                    {!darkMode && (
                        <button onClick={handleChange} type="button" className="btn btn-light btnrigtmargin">
                            <img src={darkmode} alt="Dark mode toggle" />
                        </button>
                    )}
                    {darkMode && (
                        <button onClick={handleChange} type="button" className="btn btn-light btnrigtmargin">
                            <img src={lightMode} alt="Dark mode toggle" />
                        </button>
                    )}
                </a>
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <img className="ms-2" id="logo" src={darkMode ? logodark : logolight} alt="Logo" width="106.4" height="23.2" />
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {user && (
                                <div className='user'>
                                    <img className="profile-pic" src={user.profilePicture ? user.profilePicture : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} alt="Profile" />
                                    <strong className="username">{user.userName}</strong>
                                </div>
                            )}
                            <li className="nav-item" onClick={() => navigate('/')}>
                                <NavItem src={darkMode ? accountdrak : accountlight} text="Your Account" />
                            </li>
                            <li className="nav-item" onClick={() => navigate('/')}>
                                <NavItem src={darkMode ? homedark : homelight} text="Home" />
                            </li>
                            {userLogin.userName !== "" && (
                                <li className="nav-item" onClick={() => navigate('/AddVideo')}>
                                    <NavItem src={darkMode ? addVideodark : addVideolight} text="Add Video" />
                                </li>
                            )}
                            <li className="nav-item" onClick={() => navigate('/')}>
                                <NavItem src={darkMode ? historydark : historylight} text="History" fill={svgFillColor} />
                            </li>
                            <li className="nav-item" onClick={() => navigate('/')}>
                                <NavItem src={darkMode ? playlistdark : playlistlight} text="Playlists" />
                            </li>
                            <li className="nav-item" onClick={() => navigate('/')}>
                                <NavItem src={darkMode ? switchAccountdark : switchAccountlight} text="Switch Account" />
                            </li>
                            <li className="nav-item" onClick={() => navigate('/')}>
                                <NavItem src={darkMode ? settingdark : settinglight} text="Setting" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default LeftMenu;
