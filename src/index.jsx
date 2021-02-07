import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/store';
import { Kalendar } from './components';
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Kalendar />
    </Router>
  </Provider>,
  document.getElementById('root')
);
