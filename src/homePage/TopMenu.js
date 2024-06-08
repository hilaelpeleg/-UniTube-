import logo from '../homePage/logo.svg';
import search from '../homePage/search.svg'
import './LeftMenu.css'

function TopMenu() {
    return (
        <div>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <img className="ms-2" id="logo" src={logo} alt="Logo" width="106.4" height="23.2" />
            <form className="ms-auto search-form">
                <div className="search">
                    <img className="ms-2" id="logo" src={search} alt="search" />
                    <input className="searchinput" type="search" placeholder="Search" />
                </div>
            </form>
        </div>
    );
}

export default TopMenu;