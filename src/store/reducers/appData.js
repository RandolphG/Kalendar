import { createReducer } from '@reduxjs/toolkit';

import { SET_LAUNCH_CALENDAR, SHOW_FILTER_PANEL } from '../actions';

const initialState = {
  launchCalendar: {},
  showFilterPanel: false,
};

export const appData = createReducer(initialState, {
  [SET_LAUNCH_CALENDAR]: (state, action) => ({
    ...state,
    launchCalendar: action.payload,
  }),
  [SHOW_FILTER_PANEL]: (state, action) => ({
    ...state,
    showFilterPanel: action.payload,
  }),
});
