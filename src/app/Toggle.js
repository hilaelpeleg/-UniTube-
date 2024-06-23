import { ReactComponent as Dark } from './darkmode.svg';


const Toggle = ({ handleChange }) => {
    return (
        <div className="toggle">
            <Dark onClick={handleChange} />
        </div>
    );
}


export default Toggle;