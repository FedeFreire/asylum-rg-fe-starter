import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div
      className="card"
      style={{
        width: '18rem',
        margin: 'auto',
        marginTop: '50px',
        marginBottom: '50px',
        textAlign: 'center',
      }}
    >
      <img
        src={user.picture}
        className="card-img-top"
        alt={user.name}
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">{user.email}</p>
        <a href={`mailto:${user.email}`} className="btn btn-primary">
          Send Email
        </a>
      </div>
    </div>
  );
};

export default Profile;
