import { combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import rootEpics from './epics';

const protect = epic => (action$, state$, dependencies) =>
  epic(action$, state$, dependencies).pipe(
    catchError(error => of({ type: 'EPIC_FAILURE', error }))
  );

const protectAndCombineEpics = (...epics) => {
  const protectedEpics = epics.map(epic => protect(epic));

  return combineEpics(...protectedEpics);
};

export const rootEpic = protectAndCombineEpics(rootEpics);
