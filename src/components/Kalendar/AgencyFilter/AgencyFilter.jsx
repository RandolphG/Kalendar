import React from 'react';
import s from '../style';

const MyComponent = () => {
  return (
    <div>
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'row', marginBottom: '16px' }}>
        {/*          {availableAgencies.map((agency, index) => (
            <div key={index}>
              <input
                data-idx={index}
                onChange={onChange}
                type={'checkbox'}
                value={agency.selected}
              />
              <label>{agency.name}</label>
            </div>
          ))}*/}
      </div>
    </div>
  );
};

export default MyComponent;
