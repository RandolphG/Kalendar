import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getFilter } from '../../../store';

const Container = styled.div`
  border-radius: 4px;
  position: absolute;
  height: 40%;
  width: 40%;
  background: #9e9e9e;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.show ? 1 : 0)};
`;

const FilterPanel = () => {
  const show = useSelector(getFilter);
  return (
    <Container show={show}>
      <div>FILTER PANEL</div>
    </Container>
  );
};

export default FilterPanel;
