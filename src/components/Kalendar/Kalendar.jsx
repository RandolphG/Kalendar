import React, { useEffect, useState } from 'react';
import { getLaunchCalendar, getDaysInMonth } from './services';
import { ErrorBoundary } from '../ErrorBoundary';
import style from './style';
import DaysCarousel from './DaysCarousel';
import { useDispatch, useSelector } from 'react-redux';
import {
  goNEXT,
  goPREV,
  initAgencies,
  initCurrentMonthLaunches,
  initDays,
  initLaunchCalendar,
} from '../../store/actions';
import { getAgencies, getDays, getSelectedAgencies, getSlideIndex, getToday } from '../../store';

const Kalendar = () => {
  const dispatch = useDispatch();
  const slideIndex = useSelector(getSlideIndex);
  const cachedLaunchCalendar = localStorage.getItem('launchCalender');
  const selectedAgencies = useSelector(getSelectedAgencies);
  const today = useSelector(getToday);
  const daysInCurrentMonth = getDaysInMonth(
    today,
    cachedLaunchCalendar && JSON.parse(cachedLaunchCalendar)
  );
  const agencies = useSelector(getAgencies);
  const numberOfDays = useSelector(getDays);
  const [days, setDays] = useState(daysInCurrentMonth);
  const [filteredLaunchesByAgencies, setFilter] = useState([...days]);
  const [launchCalendar, setLaunchCalendar] = useState(
    cachedLaunchCalendar && JSON.parse(cachedLaunchCalendar)
  );

  console.log();

  const onChange = e => {
    const index = e.target.dataset.idx;
    const agency = agencies + [index];

    const isSelected = e.target.value;
    if (isSelected) {
      // add agency to filtered days
      const daysCopy = days.map(day => ({
        ...day,
        launches: day.filter(launch => launch.agency === agency.name),
      }));
      setFilter(daysCopy);
    } else {
      // remove agency from  filtered days
      const daysCopy = days.map(day => ({
        ...day,
        launches: day.filter(launch => launch.agency === agency.name),
      }));
      setFilter([...days].fi);
    }

    const daysCopy = days.map(day => ({
      ...day,
      launches: day.launches.filter(launch => launch.agency === agency.name),
    }));

    setFilter([...daysCopy]);
  };

  useEffect(() => {
    const launchCalendarExpiration = localStorage.getItem('launchCalendarExpiration');
    const isDataExpired = Date.now() >= launchCalendarExpiration;

    if (!launchCalendar || isDataExpired) {
      getLaunchCalendar().then(launchCalendar => {
        const selectedDays = getDaysInMonth(today, launchCalendar);
        dispatch(initDays(selectedDays.length));
        console.log(`DAYS IN MONTH -->`, selectedDays.length);
        setDays(selectedDays);
        setLaunchCalendar(launchCalendar);
      });
    }

    if (launchCalendar) {
      const agenciesSet = new Set();
      Object.values(launchCalendar).forEach(months =>
        months.forEach(launch => agenciesSet.add(launch.agency))
      );

      const agencies = Array.from(agenciesSet).map(agency => ({
        name: agency,
        selected: true,
      }));
      const selectedDays = getDaysInMonth(today, launchCalendar);
      dispatch(initDays(selectedDays.length));
      dispatch(initCurrentMonthLaunches(filteredLaunchesByAgencies));
      dispatch(initLaunchCalendar(launchCalendar));
      dispatch(initAgencies(agencies));
    }
  }, []);

  /**
   * return next index in array
   * @returns {JSX.Element}
   * @constructor
   */
  const NextBtn = () => (
    <button
      onClick={() => {
        const nextIndex = (slideIndex + 1) % numberOfDays;
        dispatch(goNEXT(nextIndex));
      }}
    >
      ›
    </button>
  );

  /**
   * return previous index in array
   * @returns {JSX.Element}
   * @constructor
   */
  const PrevBtn = () => (
    <button
      onClick={() => {
        const prevIndex = slideIndex === 0 ? numberOfDays - 1 : slideIndex - 1;
        dispatch(goPREV(prevIndex));
      }}
    >
      ‹
    </button>
  );

  return (
    <ErrorBoundary>
      <style.Container>
        <div
          style={{ padding: '1rem', display: 'flex', flexDirection: 'row', marginBottom: '16px' }}
        >
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
        <style.Content>
          <div className="slides">
            <PrevBtn />
            {[
              ...filteredLaunchesByAgencies,
              ...filteredLaunchesByAgencies,
              ...filteredLaunchesByAgencies,
            ].map(({ launches, weekday }, index) => {
              return (
                <DaysCarousel
                  launches={launches}
                  weekday={weekday}
                  key={index}
                  currentIndex={index}
                />
              );
            })}
            <NextBtn />
          </div>
        </style.Content>
      </style.Container>
    </ErrorBoundary>
  );
};

export default Kalendar;
