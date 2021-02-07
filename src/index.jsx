import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/store';
import { Kalendar } from './components';
import { AnimatePresence } from 'framer-motion';
ReactDOM.render(
  <Provider store={store}>
    <AnimatePresence exitBeforeEnter>
      <Router>
        <Kalendar />
      </Router>
    </AnimatePresence>
  </Provider>,
  document.getElementById('root')
);
