import { useRef } from 'react';
import './Formcontrol.css'


function Formcontrol({ textBox }) {
  const formbox = useRef(null)

const formcontrol = function () {
  console.log(formbox.current.value);
}

  return (
    <div className="row mb-3 justify-content-center" >
      <div className="col-auto" >
        <input ref={formbox} onKeyUp={formcontrol} className="form-control"
          id="colFormLabel" placeholder={textBox} />
      </div>
    </div>
  );

}

export default Formcontrol;