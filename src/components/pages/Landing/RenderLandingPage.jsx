import React from 'react';
// ADD IMPORTS BACK FOR GRAPHS SECTION
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png';
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png';
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png';
import HrfPhoto from '../../../styles/Images/paper-stack.jpg';
import '../../../styles/RenderLandingPage.less';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
// for the purposes of testing PageNav
//import PageNav from '../../common/PageNav';

///*** NEW COMPONENTS ***
/* 
  It's a clean, modular approach that enhances the maintainability of the code and allows
  for easier updates or changes to individual graph sections without affecting others.
*/

const GraphSection = ({ imgSrc, altText, description, className }) => (
  <div className={className}>
    <img src={imgSrc} alt={altText} className={'graph-img'} />
    <p>{description}</p>
  </div>
);

const DataPoint = ({ value, description, className }) => (
  <div className={className}>
    <h2>{value}</h2>
    <h3>{description}</h3>
  </div>
);

//*************************

function RenderLandingPage(props) {
  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const history = useHistory();

  return (
    <div className="main">
      <div className="header">
        <div className="header-text-container">
          <h1>Asylum Office Grant Rate Tracker</h1>
          <h3>
            The Asylum Office Grant Rate Tracker provides asylum seekers,
            researchers, policymakers, and the public an interactive tool to
            explore USCIS data on Asylum Office decisions
          </h3>
        </div>
      </div>
      <div className="graphs-section">
        <GraphSection
          imgSrc={GrantRatesByOfficeImg}
          altText="Grant Rates by Office"
          description="Search Grant Rates by Office"
          className="grant-rates-by-office-container"
        />
        <GraphSection
          imgSrc={GrantRatesByNationalityImg}
          altText="Grant Rates by Nationality"
          description="Search Grant Rates by Nationality"
          className="grant-rates-by-nationality-container"
        />
        <GraphSection
          imgSrc={GrantRatesOverTimeImg}
          altText="Grant Rates Over Time"
          description="Search Grant Rates Over Time"
          className="grant-rates-over-time-container"
        />
      </div>

      <div className="view-download-more-data-btn-container">
        <Button
          type="default"
          style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
          onClick={() => history.push('/graphs')}
        >
          View the Data
        </Button>
        {/* Added download button with functionality */}
        <a
          href="https://humanrightsfirst.org/wp-content/uploads/2022/10/COW2021001887-I589Data.csv"
          download="COW2021001887-I589Data.csv"
        >
          <Button
            type="default"
            style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
          >
            Download the Data
          </Button>
        </a>
      </div>
      <div className="middle-section">
        <div className="hrf-img-container">
          <img src={HrfPhoto} alt="Human Rights First" className="hrf-img" />
        </div>
        <div className="middle-section-text-container">
          <h3>
            Human Rights First has created a search tool to give you a
            user-friendly way to explore a data set of asylum decisions between
            FY 2016 and May 2021 by the USCIS Asylum Office, which we received
            through a Freedom of Information Act request. You can search for
            information on asylum grant rates by year, nationality, and asylum
            office, visualize the data with charts and heat maps, and download
            the data set
          </h3>
        </div>
      </div>
      <div>
        <div className="bottom-section">
          <h1>Systemic Disparity Insights</h1>
          <div className="data-container">
            <DataPoint
              value="36%"
              description="By the end of the Trump administration, the average asylum
                office grant rate had fallen 36 percent from an average of 44
                percent in fiscal year 2016 to 28 percent in fiscal year 2020."
              className="first-data-point-container"
            />
            <DataPoint
              value="5%"
              description="The New York asylum office grant rate dropped to 5 percent in
                fiscal year 2020."
              className="second-data-point-container"
            />
            <DataPoint
              value="6x Lower"
              description="Between fiscal year 2017 and 2020, the New York asylum office’s
                average grant rate was six times lower than the San Francisco
                asylum office."
              className="third-data-point-container"
            />
          </div>
          <div className="read-more-btn-container">
            <Button
              type="default"
              style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
              onClick={() =>
                (window.location.href =
                  'https://humanrightsfirst.org/library/uscis-records-reveal-systemic-disparities-in-asylum-decisions/')
              }
            >
              Read More
            </Button>
          </div>
          <p onClick={() => scrollToTop()} className="back-to-top">
            Back To Top ^
          </p>
        </div>
      </div>
    </div>
  );
}
export default RenderLandingPage;
