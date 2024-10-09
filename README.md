![Unitube](https://github.com/hilaelpeleg/-UniTube/assets/131517121/fb8af6e8-a672-42de-847b-7f7818985946)

# UniTube
🌟 Welcome to Unitube! 🌟

UniTube is a static video-sharing platform designed to showcase video content similar to YouTube. This README provides an overview of the project's features and instructions for running the application.
This README provides an overview of the project's features, setup instructions, and usage guidelines.

UniTube works with a Node.js server using MongoDB for data storage. The server exposes a RESTful API, ensuring smooth communication between the React frontend and backend for managing videos, users, and comments. All pages in the application interact with the server to fetch and update data, such as videos, user profiles, comments, likes, and more.

# running the application 🚀
- לסיים!!!!!
- Download the repository to your computer 💻
- Install dependencies (for running the app) using **npm install** 📦
- Install react-router-dom by typing **npm install react-router-dom**
- Run the app using **npm start** ▶️
- Our suggestion is to login with the user:
       - Username: Hila El peleg
       - Password: 12345678

even though it does not matter so much.

## About the App:
The name "UniTube" is a fusion of two key concepts: "University" and "YouTube," each contributing to the essence of our video-sharing platform.

## Features ✨

- ### User Page 👤
The User Page shows a user's details and their uploaded videos.
Logged-in users can access their own User Page through the My Account option in the Left Menu to manage their profile and view their uploaded content.
You can also reach the User Page of a video uploader by clicking on their profile picture or username.

- ### Edit User 🛠️
The Edit User page allows logged-in users to update their personal details, including their first name, last name, password, and profile picture. This ensures users can easily keep their information and profile picture up to date.

- ### Sign up ✍️
Users can create a new account by providing a username, password, password confirmation, display name, and a profile picture. The registration form includes validation checks to ensure all fields are correctly filled out, with password and confirmation matching.
If the username is already taken, an error message is displayed, while missing fields and other validation issues will trigger appropriate notifications.
Upon successful registration, the user receives a JWT (token), which is then used to authenticate their identity in all subsequent interactions with the server.

- ### Login Screen 🔑
Provides a simple login form where users can enter their username and password to access the application. The login form includes validation checks to ensure that all required fields are filled out and verifies that the entered username and password match an existing user in the system.
Upon successful login, the user is issued a token (JWT), which is sent with each request to the server for authentication. The server validates the token to verify the user's identity before granting access to protected actions, such as adding or editing videos.

- ### Home page 🏠
The Home Page is the starting point of the application where users can view a list of videos. Users do not need to log in to access the Home Page. If users log in, they will be able to add, edit, and delete comments and videos.
The video list displays a selection of 20 videos, including the 10 most-viewed videos and 10 randomly selected videos. The order of all 20 videos is randomized on each load.

- ### Editing and Deleting videos and comments ✏️
Editing and deleting videos and comments can only be done by the user who uploaded them. These actions are available on the video viewing page. Users are only allowed to edit or delete their own content and do not have the ability to modify or remove content uploaded by others.

- ### Add a new video 🎥
Adding a new video can be done through the "Add Video" button in the left menu. Only logged-in users can add new videos. 

- ### View Video Page 👀
Shows detailed information of a selected video, including title, description, video player, and interactive buttons like Like, Share, Comment with options to add, edit, and delete comments. Only logged-in users can add, edit, and delete comments, as well as edit the video and its details. Additionally, logged-in users can like or dislike a video.

- ### Log out 🚪
Logging out can be done through the menu, by clicking on the button.

# Pictures from the website: 📸

## User page


## edit user


## Register 📝
<img width="960" alt="register" src="https://github.com/user-attachments/assets/642e6d1b-3332-45ac-b9c6-449ce56da3f3">

## Register Validation Checks ✔️
<img width="951" alt="registervalid" src="https://github.com/user-attachments/assets/35ee2cf3-57c7-409b-aead-c996bcd2b695">

## Login  🔐
<img width="960" alt="login" src="https://github.com/user-attachments/assets/804b2254-4a23-4ea2-9578-430d0302a5b8">

## Login Validation Checks ✔️
<img width="949" alt="loginvalid" src="https://github.com/user-attachments/assets/fb7baa2b-1d12-436e-bb88-2ffc693af35f">

## Home page  🏡
<img width="959" alt="homepage" src="https://github.com/user-attachments/assets/5ad07ace-4873-4811-af38-2b72ff62bea2">

## View Video Page 📺
<img width="960" alt="viewing page" src="https://github.com/user-attachments/assets/712efc0f-5861-4866-a16f-e4f58c4d27ef">

## View Video Page (Dark mode) 🌙
<img width="960" alt="darkmodeviewingpage" src="https://github.com/user-attachments/assets/829c5979-f3ef-4a18-b46f-e19d234ecb24">

## comments 💬
<img width="960" alt="comments" src="https://github.com/user-attachments/assets/dc30d081-0403-483c-812e-91e8d0b2342e">

## Edit or deldete comment 📝🗑️
<img width="338" alt="commentszoom" src="https://github.com/user-attachments/assets/afc5d5d3-4ac1-4c50-ab26-727a708b2872">

## Add comment ✍️
<img width="957" alt="beforeaddcomment" src="https://github.com/user-attachments/assets/2105e83b-1a68-4b70-ad40-9cc59bca9d6e">
<img width="956" alt="addcomment" src="https://github.com/user-attachments/assets/6fbafc2c-032c-45e4-a559-953c3e3b6b40">

## Edit comment 📝
<img width="960" alt="editcomment" src="https://github.com/user-attachments/assets/cef577a2-4746-4735-b0c6-3f855ecb0921">

## Add video ➕🎬
<img width="960" alt="add video" src="https://github.com/user-attachments/assets/f3e7f9a0-5f41-471a-9c04-278aef84d064">

## Edit video ✂️
<img width="960" alt="edit video" src="https://github.com/user-attachments/assets/c5826367-a13e-4207-86e9-f946bfbdea5e">

## Edit or delete video ✂️🗑️
<img width="957" alt="deledtvideo" src="https://github.com/user-attachments/assets/32966317-70e8-4e16-9475-4c986782917f">




