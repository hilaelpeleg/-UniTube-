import Register from '../register/Register';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../login/LogIn';
import HomePage from '../homePage/HomePage';
import AddVideo from '../addvideo/AddVideo';
import videosData from './videos.json';



function App() {

  const [userList, setUserList] = useState([
    {
      "firstName": "Noa",
      "lastName": "Kirel",
      "password": "12345",
      "reEnterPassword": "12345",
      "userName": "Noa Kirel",
      "profilePicture": 
      'https://static.timesofisrael.com/www/uploads/2023/03/1a5a15a5-40e5-4131-95b2-0893e6efaa47-e1678308377999.jpeg'
    }
  ]);

  const [videoList, setVideoList] = useState(videosData);
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;


