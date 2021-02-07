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
  initDays,
  initLaunchCalendar,
  setFilteredDays,
} from '../../store/actions';
import { getAgencies, getSelectedAgencies, getSlideIndex, getToday } from '../../store';

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
  const [days, setDays] = useState(daysInCurrentMonth);
  const [filteredLaunchesByAgencies, setFilter] = useState([...days]);
  const [launchCalendar, setLaunchCalendar] = useState(
    cachedLaunchCalendar && JSON.parse(cachedLaunchCalendar)
  );

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

      dispatch(initLaunchCalendar(launchCalendar));
      dispatch(initAgencies(agencies));
      dispatch(initDays(filteredLaunchesByAgencies.length));
    }
  }, []);

  const NextBtn = () => (
    <button
      onClick={() => {
        const nextIndex = slideIndex + (1 % days.length);
        dispatch(goNEXT(nextIndex));
      }}
    >
      ›
    </button>
  );
  const PrevBtn = () => (
    <button
      onClick={() => {
        const prevIndex = slideIndex === 0 ? days.length - 1 : slideIndex - 1;
        dispatch(goPREV(prevIndex));
      }}
    >
      ‹
    </button>
  );

  console.log(`FILTERED DAYS`, filteredLaunchesByAgencies.length);

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
              let offset = filteredLaunchesByAgencies.length + (slideIndex - index);
              return (
                <DaysCarousel launches={launches} weekday={weekday} offset={offset} key={index} />
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
