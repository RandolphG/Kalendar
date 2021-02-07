import React, { useState } from 'react';
import './style.css';

/**
 * toggle switch for hidden panel
 * @returns {JSX.Element}
 * @constructor
 */
const ToggleSwitch = () => {
  const [toggle, setToggle] = useState(true);
  const onChange = () => setToggle(!toggle);
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
