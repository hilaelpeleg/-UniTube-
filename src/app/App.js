import Register from '../register/Register';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../login/LogIn';
import HomePage from '../homePage/HomePage';
import AddVideo from '../addvideo/AddVideo';
import videosData from './videos.json';
import ViewingPage from '../viewingPage/ViewingPage';
import profiles from './profiles.json';

function App() {
  
  const [userList, setUserList] = useState(profiles);

  const [videoList, setVideoList] = useState(videosData);
  const [userLogin, setUserLogin] = useState({ userName: "", password: "" });

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Register" element={<Register userList={userList} setUserList={setUserList} />} />
          <Route path="/logIn" element={<Login userList={userList} setUserLogin={setUserLogin} />} />
          <Route path="/" element={<HomePage userList={userList} 
          videoList={videoList} setVideoList={setVideoList} userLogin={userLogin} />} />
          <Route path="/AddVideo" element={<AddVideo userLogin={userLogin} videoList={videoList}
          setVideoList={setVideoList} userList={userList} />} />
          <Route path="/Viewing/:videoId"  element={<ViewingPage  videoList={videoList}
          setVideoList={setVideoList}  userLogin={userLogin}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;