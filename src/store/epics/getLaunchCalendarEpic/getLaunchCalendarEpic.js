import { ofType } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';

import { INITIALIZE } from '../../actions';

const getLaunchCalendarEpic = action$ =>
  action$.pipe(
    ofType(INITIALIZE),
    tap(() => {
      // TODO make functionality
    }),
    ignoreElements()
  );

export default getLaunchCalendarEpic;
