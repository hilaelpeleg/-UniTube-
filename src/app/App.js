import Register from '../register/Register';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../login/LogIn';
import HomePage from '../homePage/HomePage';
import Account from '../account/Account';
import AddVideo from '../addvideo/AddVideo';


function App() {

  const [userList, setUserList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [userLogin, setUserLogin] = useState({ userName: "", password: "" });

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register userList={userList} setUserList={setUserList} />} />
          <Route path="/login" element={<Login userList={userList} setUserLogin={setUserLogin} />} />
          <Route path="/homepage" element={<HomePage videoList={videoList}
            setVideoList={setVideoList} />} />
          <Route path="/Account" element={<Account userLogin={userLogin}/>} />
          <Route path="/Addvideo" element={<AddVideo userLogin={userLogin} videoList={videoList}
          setVideoList={setVideoList} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


