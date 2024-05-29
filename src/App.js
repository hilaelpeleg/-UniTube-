import './App.css';
import Button from './button'
import Formcontrol from './Formcontrol'
import formlist from './listFormInput.json'
import RegisterScreen from './registrationscreen/Registrationscreen';

function App() {
  return (
    <div className="App">
      {/* {
      formlist.map((formInput) => <Formcontrol {...formInput} />)
      }      

      <Button value="Login" />
      <Button value="Create new account!"/> */}
  <RegisterScreen />

    </div>
  );
}

export default App;


