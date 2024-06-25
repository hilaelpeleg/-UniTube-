import './NavItem.css'

function NavItem({src, text}){
    return(
        // create the button one the left menu
        <a className="nav-link" aria-current="page" href="#">
        <div className="nav-item-container">
            <img className="nav-icon iconleftli" src={src} alt="Home Icon" />
            <span className="nav-text LeftMenu">{text}</span>
        </div>
    </a>
    );
}

export default NavItem;