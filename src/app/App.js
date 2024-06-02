import Register from '../register/Register';
import './App.css';
import { useState } from 'react';


function App() {

  const [userList, setUserList] = useState([]);


  return (
    <div className="App">
      <Register userList={userList} setUserList={setUserList} />
    </div>
  );
}

export default App;


