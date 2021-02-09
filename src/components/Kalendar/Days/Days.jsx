import React from 'react';
import { useTilt } from '../useTilt';
import './style.css';
import s from './style';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentSlideIndex, getDays, getSlideIndex, isModalShown } from '../../../store';
import { toggleModal } from '../../../store/actions';
const image =
  'https://singularityhub.com/wp-content/uploads/2020/06/SpaceX-offshore-launchpads-Starship.jpg';

const imageArray = [
  { image: 'https://www.craftechind.com/app/uploads/shutterstock_199532456.jpg' },
  { image: 'https://cdn.mos.cms.futurecdn.net/MHy4P6q3tVwgDGdw69XwoQ.jpg' },
  {
    image:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/45195410704-22abeab394-k-0-1601495275.jpg?crop=0.5556640625xw:1xh;center,top&resize=640:*',
  },
];
/**
 * return days for carousel
 * @param offset
 * @param launches
 * @param weekday
 * @returns {JSX.Element}
 * @constructor
 */
const Days = ({ currentIndex, launches, monthYeah, weekday }) => {
  const numberOfDays = useSelector(getDays);
  const slideIndex = useSelector(getSlideIndex);
  let offset = numberOfDays + (slideIndex - currentIndex);
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);
  const index = useSelector(getCurrentSlideIndex);
  const dispatch = useDispatch();
  const isModalHidden = useSelector(isModalShown);
  const toggle = () => {
    dispatch(toggleModal(!isModalHidden));
  };
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
          background: 'black',
        }}
      />
      <div
        className=" slideContent "
        style={{
          background: 'linear-gradient(0deg, black, #444444)',
        }}
      >
        <div className="slideContentInner">
          <s.DateInfo>
            <div style={{ marginBottom: '16px', fontSize: '45px' }}>{monthYeah}</div>
            <s.Weekday>{weekday}</s.Weekday>
            <s.NumberOfDay>{index}</s.NumberOfDay>
          </s.DateInfo>
          {launches.map(({ date, title, agency }, index) => (
            <s.AgencySection key={index}>
              <s.AgencyTitle onClick={toggle}>{agency ? agency : 'NO LAUNCHES'}</s.AgencyTitle>
            </s.AgencySection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Days;
