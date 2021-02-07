import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { rootEpic } from './root';

const logger = createLogger({
  collapsed: true,
  level: 'info',
  predicate: () => process.env.NODE_ENV === 'development', // eslint-disable-line no-unused-vars
});

const epicMiddleware = createEpicMiddleware();

const middleware = applyMiddleware(epicMiddleware, thunk, logger);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(middleware));

epicMiddleware.run(rootEpic);

export default store;
