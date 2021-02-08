import { createReducer } from '@reduxjs/toolkit';

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
} from '../actions';

const initialState = {
  today: new Date(),
  days: [],
  currentMonthLaunches: [],
  launchCalendar: {},
  filteredLaunchesByAgencies: [],
  agencies: [],
  showFilterPanel: false,
  slideIndex: 0,
  launchCalendarExpiration: '',
  isDataExpired: false,
  offset: 0,
};

export const appData = createReducer(initialState, {
  [INIT_DAYS]: (state, action) => ({
    ...state,
    days: action.payload,
  }),
  [NEXT]: (state, action) => ({
    ...state,
    slideIndex: action.payload,
  }),
  [SET_OFFSET]: (state, action) => ({
    ...state,
    offset: action.payload,
  }),
  [PREV]: (state, action) => ({
    ...state,
    slideIndex: action.payload,
  }),
  [INIT_LAUNCH_CALENDAR]: (state, action) => ({
    ...state,
    launchCalendar: action.payload,
  }),
  [INIT_CURRENT_MONTH_LAUNCHES]: (state, action) => ({
    ...state,
    currentMonthLaunches: action.payload,
  }),
  [SHOW_FILTER_PANEL]: (state, action) => ({
    ...state,
    showFilterPanel: action.payload,
  }),
  [INIT_AGENCIES]: (state, action) => ({
    ...state,
    agencies: action.payload,
  }),
  [SET_SELECTED_AGENCIES]: (state, action) => ({
    ...state,
    selectedAgencies: action.payload,
  }),
  [SET_SLIDE_INDEX]: (state, action) => ({
    ...state,
    slideIndex: action.payload,
  }),
  [SET_FILTERED_DAYS]: (state, action) => ({
    ...state,
    selectedAgencies: action.payload,
  }),
});
