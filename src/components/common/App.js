import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.less';
import { NotFoundPage } from '../pages/NotFound';
import { LandingPage } from '../pages/Landing';
import { FooterContent, SubFooter } from '../Layout/Footer';
import { HeaderContent } from '../Layout/Header';
import { Layout } from 'antd';
import GraphsContainer from '../pages/DataVisualizations/GraphsContainer';
import { colors } from '../../styles/data_vis_colors';
import Profile from '../common/Profile';
const { primary_accent_color } = colors;
const { Footer, Header } = Layout;

const App = () => {
  return (
    <Layout>
      <Header
        style={{
          height: '10vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: primary_accent_color,
        }}
      >
        <HeaderContent />
      </Header>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/graphs" component={GraphsContainer} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer
        style={{ backgroundColor: primary_accent_color, color: '#E2F0F7' }}
      >
        <FooterContent />
      </Footer>
      <Footer style={{ backgroundColor: primary_accent_color, padding: 0 }}>
        <SubFooter />
      </Footer>
    </Layout>
  );
};

export default App;
