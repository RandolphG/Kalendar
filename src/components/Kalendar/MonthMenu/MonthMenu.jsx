import React from 'react';
import './style.css';
const MonthMenu = () => {
  return (
    <div>
      <div className="menu">
        {[
          { month: 'JAN' },
          { month: 'FEB' },
          { month: 'MAR' },
          { month: 'APR' },
          { month: 'MAY' },
          { month: 'JUN' },
          { month: 'JUL' },
          { month: 'JUL' },
          { month: 'AUG' },
          { month: 'SEP' },
          { month: 'NOV' },
          { month: 'DEC' },
        ].map(({ month }) => (
          <div className="container">
            <div className="tabs">
              <input type="radio" id="radio-1" name="tabs" checked />
              <label className="tab" htmlFor="radio-1">
                {month}
                <span className="notification">2</span>
              </label>
              <span className="glider" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthMenu;
