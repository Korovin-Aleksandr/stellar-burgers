import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import store from './services/store';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
