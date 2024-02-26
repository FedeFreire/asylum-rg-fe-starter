import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
//import { Button } from '../common/Button';

import Button from 'react-bootstrap/Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() => loginWithRedirect()}
      id="qsLoginBtn"
      variant="primary"
      className="btn-margin"
    >
      Log In
    </Button>
  );
};

export default LoginButton;
