import React from 'react';
import s from '../style';
import { useSelector } from 'react-redux';
import { getAgencies } from '../../../store';

const AgencyFilter = ({ onChange }) => {
  const agencies = useSelector(getAgencies);

  return (
    <div>
      <div
        style={{
          width: '100vw',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '16px',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        {agencies.map((agency, index) => (
          <div key={index}>
            <input data-idx={index} onChange={onChange} type={'checkbox'} value={agency.selected} />
            <label>{agency.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgencyFilter;
