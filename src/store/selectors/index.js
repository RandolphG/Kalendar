import { createSelector } from 'reselect';

/* get state */
export const getState = state => state.appData;

/* get data */
export const retrieveCalendar = createSelector(getState, state => state.launchCalendar);

/* show filter panel */
export const getFilter = createSelector(getState, state => state.showFilterPanel);
