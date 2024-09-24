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

function App() {
  const [videoList, setVideoList] = useState([]);
  const [darkMode,setDarkMode] = useState(false);
  const [logedinuser, setlogedinuser] = useState({
    firstName: "",
    lastName:"",
    userName:"",
    profilePicture:""
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


  return (
    <Router>
      <div className="App" data-theme={darkMode ? "dark" : "light"}>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/logIn" element={<Login setlogedinuser={setlogedinuser} setToken={setToken}/>} />
          <Route path="/" element={<HomePage logedinuser={logedinuser} darkMode={darkMode}
           setDarkMode={setDarkMode} videoList={videoList}/>} />
          <Route path="/AddVideo" element={<AddVideo logedinuser={logedinuser} videoList={videoList}
          setVideoList={setVideoList} />} />
          <Route path="/Viewing/:videoId"  element={<ViewingPage token= {token} videoList={videoList}
          handleChange={() => setDarkMode(!darkMode)} darkMode={darkMode} setDarkMode={setDarkMode}
          setVideoList={setVideoList} logedinuser={logedinuser}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;