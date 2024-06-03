import Register from '../register/Register';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../login/LogIn";


function App() {

  const [userList, setUserList] = useState([]);


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register userList={userList} setUserList={setUserList} />} />
          <Route path="/login" element={<Login userList={userList} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


