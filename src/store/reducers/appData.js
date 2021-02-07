import { createReducer } from '@reduxjs/toolkit';

import { SET_LAUNCH_CALENDAR } from '../actions';

const initialState = {
  launchCalendar: {},
};

export const appData = createReducer(initialState, {
  [SET_LAUNCH_CALENDAR]: (state, action) => ({
    ...state,
    launchCalendar: action.payload,
  }),
});
