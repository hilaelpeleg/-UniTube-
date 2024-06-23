import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './svg icons/logo.svg';
import home from './svg icons/home.svg';
import addVideo from './svg icons/add-video.svg';
import darkmode from './svg icons/darkmode.svg';
import account from './svg icons/account.svg';
import history from './svg icons/history.svg';
import playlist from './svg icons/playlist.svg';
import switchAccount from './svg icons/switch account.svg';
import setting from './svg icons/setting.svg';
import './LeftMenu.css';
import NavItem from './NavItem';
import Search from './Search';
import login from './svg icons/login.svg';
import logout from './svg icons/logout.svg';


function LeftMenu({darkMode, setDarkMode, videoId, originalVideoList, userLogin, setFilteredVideoList }) {
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

    const handleLogin = () => {
        navigate('/logIn');
    };

    const handleLogout = () => {
        // Handle the actual logout logic here if needed
        navigate('/logIn');
    };
    return (
        <nav className="navbar bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <img className="ms-2" id="logo" src={logo} alt="Logo" width="106.4" height="23.2" />
                <form className="ms-auto">
                    <Search doSearch={doSearch} />
                </form>
                <a className="navbar-brand ms-auto" href="#">
                    {(userLogin.userName === "") && (
                        <button type="button" onClick={handleLogin} className="btn btn-light">
                            Login
                            <img src={login} alt="Dark mode toggle" />
                        </button>
                    )}
                    {(userLogin.userName !== "") && (
                        <button type="button" onClick={handleLogout} className="btn btn-light">
                            Sign Out
                            <img src={logout} alt="Dark mode toggle" />
                        </button>
                    )}
                    {!darkMode && (
                    <button type="button" className="btn btn-light">
                        <img src={darkmode} alt="Dark mode toggle" />
                    </button>
                    )}
                </a>
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <img className="ms-2" id="logo" src={logo} alt="Logo" width="106.4" height="23.2" />
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item" onClick={() => navigate('/')}>
                                <NavItem src={account} text="Your Account" />
                            </li>
                            <li className="nav-item" onClick={() => navigate('/')}>
                                <NavItem src={home} text="Home" />
                            </li>
                            {userLogin.userName !== "" && (
                                <li className="nav-item" onClick={() => navigate('/AddVideo')}>
                                    <NavItem src={addVideo} text="Add Video" />
                                </li>
                            )}
                            <li className="nav-item" onClick={() => navigate('/')}>
                                <NavItem src={history} text="History" />
                            </li>
                            <li className="nav-item" onClick={() => navigate('/')}>
                                <NavItem src={playlist} text="Playlists" />
                            </li>
                            <li className="nav-item" onClick={() => navigate('/')}>
                                <NavItem src={switchAccount} text="Switch Account" />
                            </li>
                            <li className="nav-item" onClick={() => navigate('/')}>
                                <NavItem src={setting} text="Setting" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default LeftMenu;
