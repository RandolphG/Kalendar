import React, { useEffect, useState } from 'react';
import { getLaunchCalendar, getDaysInMonth, generateLaunchCalendarKey } from './services';
import { ErrorBoundary } from '../ErrorBoundary';
import s from './style';
import DaysCarousel from './DaysCarousel';
import { useDispatch, useSelector } from 'react-redux';
import {
  goNEXT,
  goPREV,
  initAgencies,
  initCurrentMonthLaunches,
  initDays,
  initLaunchCalendar,
  initThisMonth,
} from '../../store/actions';
import {
  getAgencies,
  getDays,
  getSelectedAgencies,
  getSlideIndex,
  getThisMonthAndYear,
  getToday,
} from '../../store';

const Kalendar = () => {
  const dispatch = useDispatch();
  const slideIndex = useSelector(getSlideIndex);
  const cachedLaunchCalendar = localStorage.getItem('launchCalender');
  const selectedAgencies = useSelector(getSelectedAgencies);
  const today = useSelector(getToday);
  const thisMonth = useSelector(getThisMonthAndYear);
  const daysInCurrentMonth = getDaysInMonth(
    today,
    cachedLaunchCalendar && JSON.parse(cachedLaunchCalendar)
  );

  const month = generateLaunchCalendarKey(today.toISOString());

  const agencies = useSelector(getAgencies);
  const numberOfDays = useSelector(getDays);
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
        dispatch(initDays(selectedDays.length));
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
      dispatch(initThisMonth(month));
      dispatch(initDays(selectedDays.length));
      dispatch(initCurrentMonthLaunches(filteredLaunchesByAgencies));
      dispatch(initLaunchCalendar(launchCalendar));
      dispatch(initAgencies(agencies));
    }
  }, []);

  /**
   * return next month
   * @returns {JSX.Element}
   * @constructor
   */
  const NextMonth = () => <button onClick={() => {}}>›</button>;

  /**
   * return previous month
   * @returns {JSX.Element}
   * @constructor
   */
  const PrevMonth = () => <button onClick={() => {}}>‹</button>;

  /**
   * return next day
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
   * return previous day
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
      <s.Container>
        <s.Header>
          <PrevMonth />
          {thisMonth}
          <NextMonth />
        </s.Header>
        <s.Content>
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
        </s.Content>
      </s.Container>
    </ErrorBoundary>
  );
};

export default Kalendar;
