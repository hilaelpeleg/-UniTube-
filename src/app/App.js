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

export const profilePictureURLjason = "https://www.eurovisionlive.com/wp-content/uploads/Israel-2023-Noa-Kirel-Eran-Levi.jpg";

function App() {
  

  const [userList, setUserList] = useState(profiles);

  

  const updatedVideosData = videosData.map(video => ({
    ...video,
    profilePicture: profilePictureURLjason
  }));

  const [videoList, setVideoList] = useState(updatedVideosData);
  const [userLogin, setUserLogin] = useState({ userName: "", password: "" });

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register userList={userList} setUserList={setUserList} />} />
          <Route path="/login" element={<Login userList={userList} setUserLogin={setUserLogin} />} />
          <Route path="/homepage" element={<HomePage userList={userList} 
          videoList={videoList} setVideoList={setVideoList} userLogin={userLogin} />} />
          <Route path="/Addvideo" element={<AddVideo userLogin={userLogin} videoList={videoList}
          setVideoList={setVideoList} userList={userList} />} />
          <Route path="/viewing/:videoId"  element={<ViewingPage  videoList={videoList}
          setVideoList={setVideoList} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;


