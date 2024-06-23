# UniTube
UniTube is a static video-sharing platform designed to showcase video content similar to YouTube. This README provides an overview of the project's features and instructions for running the application.


# running the application
Download the repository to your computer
Install dependencies (for running the app) using npm install
Install react-router-dom by typing npm install react-router-dom
Run the app using npm start
Our suggestion is to login with the user: user name: Hila El peleg, password: 12345, even though it does not matter so much.


# Features
Registration Screen: Allows users to create a new account with username, password, password confirmation, display name, and upload profile picture.

Login Screen: Provides a simple login form where users can enter their username and password to access the application.

Video List Screen: Displays a scrollable list of videos similar to the homepage of YouTube, including left menu, search functionality, and login button.

Video Playback Screen: Shows detailed information of a selected video, including title, description, video player, and interactive buttons like Like, Share, Comment with options to add, edit, and delete comments.

Add New Video Screen: Allows authenticated users to add new videos to the platform. The newly added videos are displayed in the video list screen but are not stored permanently (only in-memory for the session).

Theme Toggle: Includes a button to switch between dark mode and light mode for the application's theme.

Project Workflow
Development: The project utilizes React components for the frontend development, managing different screens such as Registration, Login, Video List, Video Playback, and Add New Video.

Styling: CSS is used for styling components, ensuring a user-friendly and visually appealing interface inspired by the real YouTube application.

 Data Handling: Video information is loaded dynamically from a JSON file, which contains at least 10 pre-defined videos. New videos added through the Add New Video screen are stored temporarily for the current session.

User Authentication: Basic authentication is implemented where users can register and login with their credentials. User data is managed within the application without external dependencies like Google accounts.

Notes
This application is a static prototype and does not feature server communication or persistent data storage. Future iterations may include these functionalities to enable real-time interaction between users and server-side data management.