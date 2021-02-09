import {
  NEXT,
  PREV,
  INIT_LAUNCH_CALENDAR,
  SHOW_FILTER_PANEL,
  INIT_DAYS,
  INIT_AGENCIES,
  SET_SELECTED_AGENCIES,
  SET_SLIDE_INDEX,
  SET_FILTERED_DAYS,
  INIT_CURRENT_MONTH_LAUNCHES,
  SET_OFFSET,
  INIT_THIS_MONTH,
  TOGGLE_MODAL,
  SET_CURRENT_DAY_LAUNCHES,
  INIT_THIS_MONTH_LAUNCHES,
} from './actionTypes';

export const initLaunchCalendar = payload => ({ type: INIT_LAUNCH_CALENDAR, payload });

export const showFilterPanel = payload => ({ type: SHOW_FILTER_PANEL, payload });

export const goNEXT = payload => ({ type: NEXT, payload });

export const goPREV = payload => ({ type: PREV, payload });

export const initDays = payload => ({ type: INIT_DAYS, payload });

export const initAgencies = payload => ({ type: INIT_AGENCIES, payload });

export const initCurrentMonthLaunches = payload => ({ type: INIT_CURRENT_MONTH_LAUNCHES, payload });

export const setSelectedAgencies = payload => ({ type: SET_SELECTED_AGENCIES, payload });

export const setSlideIndex = payload => ({ type: SET_SLIDE_INDEX, payload });

export const setFilteredDays = payload => ({ type: SET_FILTERED_DAYS, payload });

export const setOffset = payload => ({ type: SET_OFFSET, payload });

export const initThisMonth = payload => ({ type: INIT_THIS_MONTH, payload });

export const initThisMonthLaunches = payload => ({ type: INIT_THIS_MONTH_LAUNCHES, payload });

export const toggleModal = payload => ({ type: TOGGLE_MODAL, payload });

export const setCurrentDayLaunches = payload => ({ type: SET_CURRENT_DAY_LAUNCHES, payload });
