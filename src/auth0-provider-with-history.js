import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const history = useHistory();
  const domain = 'dev-qurvlzph8pi372el.us.auth0.com';
  const clientId = 'SHuiZA549CDwyFQ0H6jD8Ed0Y8g2Bwbl';
  /* Auth0ProviderWithHostory is a wrapper around Auth0Provider that allows us to redirect the user to the page they were on before they logged in.
 This is done by using the useHistory hook from react-router-dom to access the history object and then passing it to the onRedirectCallback function.
 Pressing backspace after logging in will redirect the user to the previous page.? */

  const onRedirectCallback = appState => {
    history.push(appState?.returnTo || window.location.pathname);
  };
  /*The onRedirectCallback function is a function that we define and pass to the Auth0Provider component as a prop.
  This function is called when the user is redirected back to the application after they have logged in. 
  The appState parameter is an object that contains the returnTo property, which is the URL the user should be redirected to after they have logged in. 
  We use the history object to redirect the user to the returnTo URL or the current URL if the returnTo URL is not defined.*/
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
