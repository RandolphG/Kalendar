import React, { useState } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { showFilterPanel } from '../../../store/actions';

/**
 * toggle switch for hidden panel
 * @returns {JSX.Element}
 * @constructor
 */
const ToggleSwitch = () => {
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(true);
  const onChange = () => {
    setToggle(!toggle);
    dispatch(showFilterPanel(toggle));
    console.log(`TOGGLED`, toggle);
  };
  return (
    <div style={{ position: 'absolute', top: '0px', right: '0px' }}>
      <label>
        <input type="checkbox" defaultChecked={toggle} onChange={onChange} />
        <div>
          <span className="on" />
          <span className="off" />
        </div>
        <i />
      </label>
    </div>
  );
};

export default ToggleSwitch;
