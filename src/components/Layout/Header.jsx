import React from 'react';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../styles/Images/WhiteLogo.png';
import { colors } from '../../styles/data_vis_colors';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../common/logout-button';
import LoginButton from '../common/login-button';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const { primary_accent_color } = colors;

function HeaderContent() {
  const { isAuthenticated } = useAuth0();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: primary_accent_color,
      }}
    >
      <div className="hrf-logo">
        <a href="https://www.humanrightsfirst.org/">
          <Image width={100} src={Logo} preview={false} alt="HRF logo white" />
        </a>
      </div>
      <Nav className="justify-content-end">
        <Link to="/" style={{ color: '#E2F0F7', paddingRight: '20px' }}>
          Home
        </Link>
        <Link to="/graphs" style={{ color: '#E2F0F7', paddingRight: '20px' }}>
          Graphs
        </Link>
        {isAuthenticated && (
          <Link
            to="/profile"
            style={{ color: '#E2F0F7', paddingRight: '20px' }}
          >
            Profile
          </Link>
        )}
        {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
        {/* isAuthenticated checks the state, if true will show the Profile button and change the login for the logout button */}
      </Nav>
    </div>
  );
}

export { HeaderContent };
