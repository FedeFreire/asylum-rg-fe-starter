import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  // loginWithRedirect is a method from the useAuth0 hook that you can use to redirect the user to the Auth0 Universal Login Page.
  // This method takes an options object as an argument, which you can use to configure the login request.
  return (
    <Button
      onClick={() => loginWithRedirect()}
      id="qsLoginBtn"
      variant="primary"
      className="btn-margin"
    >
      Log In
    </Button>
    // The loginWithRedirect method is called when the user clicks the Log In button.
    // This method redirects the user to the Auth0 Universal Login Page.
  );
};

export default LoginButton;
