import Register from '../register/Register';
import './App.css';
import '../index.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../login/LogIn';
import HomePage from '../homePage/HomePage';
import AddVideo from '../addvideo/AddVideo';
import ViewingPage from '../viewingPage/ViewingPage';
import profiles from './profiles.json';

function App() {
  
  const [userList, setUserList] = useState(profiles);
  const [videoList, setVideoList] = useState([]);
  const [userLogin, setUserLogin] = useState({ userName: "", password: "" });
  const [darkMode,setDarkMode] = useState(false);
  const [logedinuser, setlogedinuser] = useState({
    firstName: "",
    lastName:"",
    password:"",
    reEnterPassword:"",
    userName:"",
    profilePicture:""
  });
  const [token, settoken] = useState("");



  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('http://localhost:8200/api/videos/all', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setVideoList(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos(); 
  }, []);


  return (
    <Router>
      <div className="App" data-theme={darkMode ? "dark" : "light"}>
        <Routes>
          <Route path="/Register" element={<Register userList={userList} setUserList={setUserList} />} />
          <Route path="/logIn" element={<Login setlogedinuser={setlogedinuser}/>} />
          <Route path="/" element={<HomePage darkMode={darkMode} setDarkMode={setDarkMode} userList={userList} 
          handleChange={() => setDarkMode(!darkMode)} videoList={videoList} setVideoList={setVideoList} userLogin={userLogin} />} />
          <Route path="/AddVideo" element={<AddVideo userLogin={userLogin} videoList={videoList}
          setVideoList={setVideoList} userList={userList} />} />
          <Route path="/Viewing/:videoId"  element={<ViewingPage  videoList={videoList}
          handleChange={() => setDarkMode(!darkMode)} darkMode={darkMode} setDarkMode={setDarkMode}
          setVideoList={setVideoList} userList={userList} userLogin={userLogin}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;