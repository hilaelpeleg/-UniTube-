import logo from '../homePage/logo.svg';
import search from '../homePage/search.svg';
import home from '../homePage/home.svg';
import './LeftMenu.css';


function LeftMenu() {
    return (
        <nav className="navbar bg-body-tertiary fixed-top">
            <div className="container-fluid ">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <img className="ms-2" id="logo" src={logo} alt="Logo" width="106.4" height="23.2" />
                <form className="ms-auto ">
                    <div className="search">
                    <img className="ms-2" id="logo" src={search} alt="search"  />
                    <input className="searchinput" type="search" placeholder="Search"/>
                    </div>
                </form>
                <a className="navbar-brand ms-auto" href="#">dark\light mode</a>
                <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <img className="ms-2" id="logo" src={logo} alt="Logo" width="106.4" height="23.2" />
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                            <a className="nav-link " aria-current="page" href="#">Account</a>
                            </li>
                            <div className=''>
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="#">Home</a>
                                <img className="ms-2" id="logo" src={home} alt="Logo" width="106.4" height="23.2" />
                            </li>
                            </div>
                            <li className="nav-item">
                                <a className="nav-link" href="#">History</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Playlists</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Switch account
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>);
}

export default LeftMenu;