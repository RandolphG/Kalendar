import React from 'react';
import { useTilt } from '../useTilt';
import './style.css';
import s from './style';
import { useSelector } from 'react-redux';
import { getCurrentSlideIndex } from '../../../store';
const image =
  'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ';

/**
 * return days for carousel
 * @param offset
 * @param launches
 * @param weekday
 * @returns {JSX.Element}
 * @constructor
 */
const DaysCarousel = ({ offset, launches, weekday }) => {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);
  const index = useSelector(getCurrentSlideIndex);

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
          <s.DateInfo>
            <s.NumberOfDay>{index}</s.NumberOfDay>
            <s.Weekday>{weekday}</s.Weekday>
          </s.DateInfo>
          {launches.map(({ date, title, agency }, index) => (
            <div
              style={{ margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              key={index}
            >
              <s.Agency>{agency ? agency : 'NO LAUNCHES'}</s.Agency>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DaysCarousel;
