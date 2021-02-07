import { SET_LAUNCH_CALENDAR, SHOW_FILTER_PANEL } from './actionTypes';

export const setLaunchCalendar = payload => ({ type: SET_LAUNCH_CALENDAR, payload });

export const showFilterPanel = payload => ({ type: SHOW_FILTER_PANEL, payload });
