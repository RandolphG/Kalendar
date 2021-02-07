import { ofType } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';

import { FETCH_PREVIOUS, INITIALIZE } from '../../actions';

const getLaunchCalendarEpic = action$ =>
  action$.pipe(
    ofType(INITIALIZE),
    tap(() => {
      console.log('INPUT PRESSED');
    }),
    ignoreElements()
  );

/*

const fetchPreviousEpic = (action$, _) =>
  action$.pipe(
    ofType(FETCH_PREVIOUS),
    tap(action => {
      from(openEditorLevel(action.payload)).pipe(
        map(data => openEditorLevelSuccess(data)),
        catchError(error => of(openEditorLevelFailure(error)))
      );
    }),
    ignoreElements()
  );
*/

export default getLaunchCalendarEpic;
