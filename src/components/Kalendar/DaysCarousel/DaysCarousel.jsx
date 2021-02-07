import React from 'react';
import { useTilt } from '../useTilt';
import './style.css';
import styled from 'styled-components';

const image =
  'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ';

const Agency = styled.p`
  color: aqua;
  font-size: large;
  font-weight: bold;
  margin-bottom: 4px;
  padding: 0;
  text-align: center;
`;

const Weekday = styled.h3`
  margin: 0;
`;

const DateInfo = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const NumberOfDay = styled.h1`
  margin-right: 16px;
`;

const MissionTitle = styled.p``;

const DaysCarousel = ({ index, offset, launches, weekday }) => {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    <div
      ref={ref}
      className={'slide'}
      data-active={active}
      style={{
        '--offset': offset,
        '--dir': offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <div
        className="slideBackground"
        style={{
          backgroundImage: `url('${image}')`,
        }}
      />
      <div
        className="slideContent"
        style={{
          backgroundImage: `url('${image}')`,
        }}
      >
        <div className="slideContentInner">
          <DateInfo>
            <NumberOfDay>{index}</NumberOfDay>
            <Weekday>{weekday}</Weekday>
          </DateInfo>
          {launches.map(({ date, title, agency }, index) => (
            <div
              style={{ margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              key={index}
            >
              <Agency>{agency ? agency : 'NO LAUNCHES'}</Agency>
              {/*<MissionTitle> {title && title}}</MissionTitle>*/}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DaysCarousel;
