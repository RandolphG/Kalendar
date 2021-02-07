import { createSelector } from 'reselect';

/* get state */
export const getState = state => state.appData;

/* get data */
export const retrieveCalendar = createSelector(getState, state => state.launchCalendar);

/* show filter panel */
export const getFilter = createSelector(getState, state => state.showFilterPanel);

/* show slideIndex */
export const getSlideIndex = createSelector(getState, state => state.slideIndex);

/* show current day number */
export const getCurrentSlideIndex = createSelector(getState, state => state.slideIndex + 1);

/* get today */
export const getToday = createSelector(getState, state => state.today);

/* get days */
export const getDays = createSelector(getState, state => state.days);

/* get filtered */
export const getfilteredDays = createSelector(getState, state => state.filteredDays);

/* get agencies */
export const getAgencies = createSelector(getState, state => state.agencies);

/* get selected agencies */
export const getSelectedAgencies = createSelector(getState, state => state.selectedAgencies);
