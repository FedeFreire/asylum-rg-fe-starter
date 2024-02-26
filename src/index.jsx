import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './state/reducers';
import Auth0ProviderWithHistory from './auth0-provider-with-history';
import App from './components/common/App';
//import { Auth0Provider } from '@auth0/auth0-react';

const store = configureStore({ reducer: reducer });

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <Auth0ProviderWithHistory>
          <App />
        </Auth0ProviderWithHistory>
        ,
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
);
