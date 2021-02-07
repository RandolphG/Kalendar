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
} from './actionTypes';

export const initLaunchCalendar = payload => ({ type: INIT_LAUNCH_CALENDAR, payload });

export const showFilterPanel = payload => ({ type: SHOW_FILTER_PANEL, payload });

export const goNEXT = payload => ({ type: NEXT, payload });

export const goPREV = payload => ({ type: PREV, payload });

export const initDays = payload => ({ type: INIT_DAYS, payload });

export const initAgencies = payload => ({ type: INIT_AGENCIES, payload });

export const setSelectedAgencies = payload => ({ type: SET_SELECTED_AGENCIES, payload });

export const setSlideIndex = payload => ({ type: SET_SLIDE_INDEX, payload });

export const setFilteredDays = payload => ({ type: SET_FILTERED_DAYS, payload });
