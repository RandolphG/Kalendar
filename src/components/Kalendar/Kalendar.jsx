import React, { useEffect, useState, useReducer } from 'react';
import { getLaunchCalendar, getDaysInMonth, slides } from './services';
import { ErrorBoundary } from '../ErrorBoundary';
import style from './style';
import { ToggleSwitch } from './Toggle';
import DaysCarousel from './DaysCarousel';
import MonthMenu from './MonthMenu';

const initialState = {
  slideIndex: 0,
};

const slidesReducer = (state, event) => {
  if (event.type === 'NEXT') {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length,
    };
  }

  if (event.type === 'PREV') {
    return {
      ...state,
      slideIndex: state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
    };
  }
};

const Kalendar = () => {
  const [state, dispatch] = useReducer(slidesReducer, initialState);

  const cachedLaunchCalendar = localStorage.getItem('launchCalender');
  // const [agencyText, setAgencyText] = useState('');
  const [tags, setTags] = useState([]);
  const today = new Date();
  const daysInCurrentMonth = getDaysInMonth(
    today,
    cachedLaunchCalendar && JSON.parse(cachedLaunchCalendar)
  );
  const [availableAgencies, setAvailableAgencies] = useState([]);
  const [days, setDays] = useState(daysInCurrentMonth);
  const [filteredDays, setFlteredDays] = useState([...days]);
  const [launchCalendar, setLaunchCalendar] = useState(
    cachedLaunchCalendar && JSON.parse(cachedLaunchCalendar)
  );

  const onChange = e => {
    const index = e.target.dataset.idx;
    const agency = availableAgencies[index];

    const isSelected = e.target.value;
    if (isSelected) {
      // add agency to filtered days
      const daysCopy = days.map(day => ({
        ...day,
        launches: day.filter(launch => launch.agency === agency.name),
      }));
      setFlteredDays(daysCopy);
    } else {
      // remove agency from  filtered days
      const daysCopy = days.map(day => ({
        ...day,
        launches: day.filter(launch => launch.agency === agency.name),
      }));
      setFlteredDays([...days].fi);
    }

    const daysCopy = days.map(day => ({
      ...day,
      launches: day.launches.filter(launch => launch.agency === agency.name),
    }));

    setFlteredDays([...daysCopy]);
  };

  useEffect(() => {
    const launchCalendarExpiration = localStorage.getItem('launchCalendarExpiration');
    const isDataExpired = Date.now() >= launchCalendarExpiration;

    if (launchCalendar) {
      // dispatch(setLaunchCalendar(launchCalendar));

      const agencies = new Set();
      Object.values(launchCalendar).forEach(months =>
        months.forEach(launch => agencies.add(launch.agency))
      );

      // setTags(Array.from(agencies));
      setAvailableAgencies(
        Array.from(agencies).map(agency => ({
          name: agency,
          selected: true,
        }))
      );
    }

    if (!launchCalendar || isDataExpired) {
      getLaunchCalendar().then(launchCalendar => {
        const selectedDays = getDaysInMonth(today, launchCalendar);
        setDays(selectedDays);
        setLaunchCalendar(launchCalendar);
      });
    }
  }, []);

  const PrevBtn = () => <button onClick={() => dispatch({ type: 'PREV' })}>‹</button>;
  const NextBtn = () => <button onClick={() => dispatch({ type: 'NEXT' })}>›</button>;

  return (
    <ErrorBoundary>
      <style.Container>
        <ToggleSwitch />
        <MonthMenu />
        <style.Content>
          <div className="slides">
            <PrevBtn />
            {[...filteredDays, ...filteredDays, ...filteredDays].map(
              ({ launches, weekday }, index) => {
                let offset = filteredDays.length + (state.slideIndex - index);
                return (
                  <DaysCarousel
                    launches={launches}
                    weekday={weekday}
                    offset={offset}
                    key={index}
                    index={index}
                  />
                );
              }
            )}
            <NextBtn />
          </div>
          {/*<div
            style={{ padding: '1rem', display: 'flex', flexDirection: 'row', marginBottom: '16px' }}
          >
            {availableAgencies.map((agency, index) => (
              <div key={index}>
                <input
                  data-idx={index}
                  onChange={onChange}
                  type={'checkbox'}
                  value={agency.selected}
                />
                <label>{agency.name}</label>
              </div>
            ))}
          </div>*/}
        </style.Content>
      </style.Container>
    </ErrorBoundary>
  );
};

export default Kalendar;
