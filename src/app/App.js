import Register from '../register/Register';
import './App.css';
import '../index.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../login/LogIn';
import HomePage from '../homePage/HomePage';
import AddVideo from '../addvideo/AddVideo';
import ViewingPage from '../viewingPage/ViewingPage';
import { API_URL } from '../config';
import UserPage from '../user/UserPage';

function App() {
  const [videoList, setVideoList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [logedinuser, setlogedinuser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    profilePicture: ""
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/videos/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setVideoList(data ?? []);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  // New useEffect to fetch updated user details whenever logedinuser changes
  useEffect(() => {
    const fetchUserDetails = async () => {
      console.log("pleeeee", token);
      if (logedinuser.userName) {
        try {
          const res = await fetch(`${API_URL}/api/users/${logedinuser.userName}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const userData = await res.json();
          setlogedinuser(userData);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      } else {
        console.log('User name or token is missing.');
      }
    };
  
    fetchUserDetails();
  }, [logedinuser.userName]);
   // Dependency array to trigger on userName change


  return (
    <Router>
      <div className="App" data-theme={darkMode ? "dark" : "light"}>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/logIn" element={<Login setlogedinuser={setlogedinuser} setToken={setToken} />} />
          <Route path="/" element={<HomePage setToken={setToken} token={token} logedinuser={logedinuser} darkMode={darkMode}
            setDarkMode={setDarkMode} videoList={videoList} />} />
          <Route path="/AddVideo" element={<AddVideo token={token} logedinuser={logedinuser} videoList={videoList}
            setVideoList={setVideoList} />} />
          <Route path="/Viewing/:videoId" element={<ViewingPage setToken={setToken} token={token} videoList={videoList}
            handleChange={() => setDarkMode(!darkMode)} darkMode={darkMode} setDarkMode={setDarkMode}
            setVideoList={setVideoList} logedinuser={logedinuser} />} />
          <Route  path="/Account/:userName"  element={<UserPage token={token} logedinuser={logedinuser} darkMode={darkMode}
            setDarkMode={setDarkMode} videoList={videoList} />} />  
           </Routes>
      </div>
    </Router>
  );
}

export default App;