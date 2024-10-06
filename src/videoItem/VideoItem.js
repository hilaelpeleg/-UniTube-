import './videoItem.css'
import { API_URL } from '../config';
import { useLocation, useNavigate } from 'react-router-dom';  // Importing useNavigate


function VideoItem({ props, onClick }) {
    const location = useLocation(); // Using useLocation to check the current route
    const navigate = useNavigate();  // Using useNavigate to navigate between pages

    // Check if we are on the Homepage or Viewing Page
    const isHomePage = location.pathname === '/'; // Checks if it's the homepage
    const isViewingPage = location.pathname.includes('/viewing'); // Checks if it's the viewing page
    const isAccountPage = location.pathname.includes('/Account'); // Checks if it's the account page
  
    // Set width and height dynamically based on the current route
    const imageStyle = {
        width: isHomePage ? '500px' : isViewingPage ? '480px' : '370px',  // 500px for Homepage, 470px for Viewing page, 370px for Account page
        height: (isHomePage || isViewingPage) ? '350px' : '250px', // 350px for Homepage and Viewing page, 250px for Account page
    };

    // Navigate to the user's page when clicking on profile image or username
    const goToUserPage = () => {
        navigate(`/Account/${props.uploader}`);  // Navigate to /Account with the user's username
    };
  
    const imageUrl = props.thumbnailUrl.startsWith('http') 
        ? props.thumbnailUrl 
        : `${API_URL}${props.thumbnailUrl}`;

          // Add API_URL to profilePicture if it doesn't start with 'http'
    const profileImageUrl = props.profilePicture.startsWith('http')
    ? props.profilePicture
    : `${API_URL}${props.profilePicture}`;

    return (
        // create the video item div 
        <div >
            <div className="thumbnail-container">
                <img src={imageUrl} style={imageStyle}  className="card-img-top" alt="profile" onClick={onClick} />
                <div className="square" >
                    {props.duration}
                </div>
            </div>
            <div className="card-body">
                <img className="profile" src={profileImageUrl} onClick={goToUserPage} />
                <div className="box">
                    <p className="card-text p"  onClick={goToUserPage}>{props.uploader}</p>
                    <p className="card-text p">{props.description}</p>
                    <p className="card-text"><small className="text-body-secondary">{props.uploadDate}</small></p>
                </div>
            </div>
        </div>
    );
}

export default VideoItem;