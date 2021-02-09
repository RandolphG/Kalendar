import React, { useEffect, useState } from 'react';
import { getLaunchCalendar, getDaysInMonth, generateLaunchCalendarKey } from './services';
import { ErrorBoundary } from '../ErrorBoundary';
import s from './style';
import Days from './Days';
import { useDispatch, useSelector } from 'react-redux';
import {
  goNEXT,
  goPREV,
  initAgencies,
  initCurrentMonthLaunches,
  initDays,
  initLaunchCalendar,
  initThisMonth,
  initThisMonthLaunches,
} from '../../store/actions';
import {
  getAgencies,
  getDays,
  getSlideIndex,
  getThisMonthAndYear,
  getThisMonthLaunches,
  getToday,
} from '../../store';
import { Background } from './Background';
import Modal from './Modal/Modal';
const Kalendar = () => {
  const dispatch = useDispatch();

  const thisMonthLaunches = useSelector(getThisMonthLaunches);
  const slideIndex = useSelector(getSlideIndex);
  const today = useSelector(getToday);
  const thisMonth = useSelector(getThisMonthAndYear);
  const agencies = useSelector(getAgencies);
  const numberOfDays = useSelector(getDays);

  const cachedLaunchCalendar = localStorage.getItem('launchCalender');
  const daysInCurrentMonth = getDaysInMonth(
    today,
    cachedLaunchCalendar && JSON.parse(cachedLaunchCalendar)
  );
  const month = generateLaunchCalendarKey(today.toISOString());
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

      // console.log(`CURRENT MONTH LAUNCHES`, currentMonthLaunches[today]);
      const selectedDays = getDaysInMonth(today, launchCalendar);
      // dispatch(setCurrentDayLaunches(currentDayLaunches));
      dispatch(initThisMonth(month)); // thisMonth
      dispatch(initDays(selectedDays.length)); // days
      dispatch(initCurrentMonthLaunches(filteredLaunchesByAgencies)); // currentMonthLaunches
      dispatch(initLaunchCalendar(launchCalendar)); // launchCalendar
      dispatch(initAgencies(agencies)); // agencies
      dispatch(initThisMonthLaunches(filteredLaunchesByAgencies)); // agencies
    }
  }, []);

  /**
   * return next month
   * @returns {JSX.Element}
   * @constructor
   */
  const NextMonth = () => (
    <button
      onClick={() => {
        console.log(`CLICK NEXT MONTH`);
      }}
    >
      ›
    </button>
  );

  /**
   * return previous month
   * @returns {JSX.Element}
   * @constructor
   */
  const PrevMonth = () => (
    <button
      onClick={() => {
        console.log(`CLICK PREV MONTH`);
      }}
    >
      ‹
    </button>
  );

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
        <s.Content>
          <div className="slides">
            <PrevBtn />
            {[
              ...filteredLaunchesByAgencies,
              ...filteredLaunchesByAgencies,
              ...filteredLaunchesByAgencies,
            ].map(({ launches, weekday }, index) => {
              return (
                <Days
                  monthYeah={thisMonth}
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
        <Modal />
        <Background />
      </s.Container>
    </ErrorBoundary>
  );
};

export default Kalendar;
