import logo from '../homePage/logo.svg';
import search from './svg icons/search.svg';
import home from './svg icons/home.svg';
import addVideo from './svg icons/add-video.svg';
import darkmode from './svg icons/darkmode.svg';
import './LeftMenu.css';
import NavItem from './NavItem';
import { useNavigate } from 'react-router-dom';

function LeftMenu() {
    const navigate = useNavigate();
    return (
        <nav className="navbar bg-body-tertiary fixed-top">
            <div className="container-fluid ">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <img className="ms-2" id="logo" src={logo} alt="Logo" width="106.4" height="23.2" />
                <form className="ms-auto ">
                    <div className="search">
                        <img className="ms-2" id="logo" src={search} alt="search" />
                        <input className="searchinput" type="search" placeholder="Search" />
                    </div>
                </form>
                <a className="navbar-brand ms-auto" href="#">
                <img src={darkmode} />
                </a>
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <img className="ms-2" id="logo" src={logo} alt="Logo" width="106.4" height="23.2" />
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item" onClick={() => navigate('/HomePage')}>
                                <NavItem src={home} text="home" />
                            </li>
                            <li className="nav-item" onClick={() => navigate('/AddVideo')}>
                                <NavItem src={addVideo} text="Addvideo" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>);
}

export default LeftMenu;