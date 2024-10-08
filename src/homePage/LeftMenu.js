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
import { API_URL } from '../config';
import deleteuser from './svg icons/delete-user.svg';
import editeuserlight from './svg icons/edituserlight.svg';
import editeuserdark from './svg icons/edituserdark.svg';
import DeleteUser from '../user/DeleteUser';
import PopupEditUser from '../user/PopupEditUser';

function LeftMenu({setToken, token, user, handleChange, darkMode, videoId, originalVideoList, setFilteredVideoList })
// Function to handle the search input and filter the video list
{
    const [isMenuOpen, setIsMenuOpen] = useState(true);  // ניהול המצב של התפריט השמאלי
    const navigate = useNavigate();
    const [updateTriggerEditUser, setUpdateTriggerEditUser] = useState(false);
    const [showModalEditUser, setshowModalEditUser] = useState(false);

    const handleCloseModalEditUser = () => {
        setshowModalEditUser(false);
        setIsMenuOpen(true);
    };

    const handleEditClickUser = () => {
        setshowModalEditUser(true);
        setIsMenuOpen(false);
    };

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

    // Handle login button click
    const handleLogin = () => {
        navigate('/logIn');
    };
    // Handle logout button click

    const handleLogout = () => {
        navigate('/logIn');
    };

    // Function to delete the user
    const handleDeleteUser = async () => {
        console.log('Authori ppppp:', token);
        const success = await DeleteUser(user.userName, token);
        setToken("");
        if (success) {
            navigate('/logIn'); // Navigate to login page after successful deletion
        }
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
                    {(user.userName === "") && (
                        <button type="button" onClick={handleLogin} className="btn btn-light btnrigtmargin">
                            <img src={login} alt="Dark mode toggle" />
                        </button>
                    )}
                    {(user.userName !== "") && (
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
                <div className={`offcanvas offcanvas-start ${isMenuOpen ? '' : 'd-none'}`} tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <img className="ms-2" id="logo" src={darkMode ? logodark : logolight} alt="Logo" width="106.4" height="23.2" />
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {user && (
                                <div className='user'>
                                    {user.userName && <img className="edit-icon" src={darkMode ? editeuserdark : editeuserlight} alt="Edit User" onClick={handleEditClickUser} />}
                                    <div className={`user-info ${user.userName ? 'logged-in' : 'logged-out'}`}>
                                        <img className="profile-pic" src={user.profilePicture ? `${API_URL}${user.profilePicture}` : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} alt="Profile" />
                                        <strong className="username">{user.userName}</strong>
                                    </div>
                                </div>
                            )}
                            {user.userName !== "" && (
                                <li className="nav-item" onClick={() => navigate(`/Account/${user.userName}`)}>
                                    <NavItem src={darkMode ? accountdrak : accountlight} text="Your Account" />
                                </li>
                            )}
                            <li className="nav-item" onClick={() => navigate('/')}>
                                <NavItem src={darkMode ? homedark : homelight} text="Home" />
                            </li>
                            {user.userName !== "" && (
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
                            <li className="nav-item deleteh" style={{ marginTop: 'auto', marginBottom: '20px' }} onClick={() => handleDeleteUser()}>
                                {user && user.userName !== "" && (
                                    <div className='delete'>
                                        <img className="profile-pic" src={deleteuser} alt="Profile" />
                                        <strong className="deleteuser">Delete my account</strong>
                                    </div>
                                )}
                            </li >
                        </ul>
                    </div>
                </div>
            </div>
            <PopupEditUser
                token={token}
                user={user}
                show={showModalEditUser}
                handleClose={handleCloseModalEditUser}
                setUpdateTrigger={setUpdateTriggerEditUser}
            />
        </nav>
    );
}

export default LeftMenu;
