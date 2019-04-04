import MainStore from './store';
import {Provider} from 'mobx-react';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './index.css';


ReactDOM.render(
  <Provider MainStore={MainStore}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

