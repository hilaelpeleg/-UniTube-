function NavItem({src, text}){
    return(
        <a className="nav-link" aria-current="page" href="#">
        <div className="nav-item-container">
            <img className="nav-icon iconleftli" src={src} alt="Home Icon" />
            <span className="nav-text">{text}</span>
        </div>
    </a>
    );
}

export default NavItem;