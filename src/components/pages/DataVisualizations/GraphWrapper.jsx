import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

/*
- GraphWrapper is a functional component, it allows the use of useEffect and useParams
- It receives the props:
      - dispatch: provided by Redux connect, allows to send actions to the store
      - set_view: updates the state to reflect the type of graphic displayed 
      */
function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  let map_to_render;
  // map_to_render is a variable that will store the component to be rendered, depending on the view and office parameters.

  if (!office) {
    map_to_render =
      view === 'time-series' ? (
        <TimeSeriesAll />
      ) : view === 'office-heat-map' ? (
        <OfficeHeatMap />
      ) : (
        view === 'citizenship' && <CitizenshipMapAll />
      );
  } else {
    map_to_render =
      view === 'time-series' ? (
        <TimeSeriesSingleOffice office={office} />
      ) : (
        view === 'citizenship' && <CitizenshipMapSingleOffice office={office} />
      );
  }
  // I decided to change from "switch statement" to "ternary operator" because it is more concise and readable. Also, it is easier to maintain
  // due to the small number of conditions.

  const updateStateWithNewData = async (
    years,
    view,
    office,
    stateSettingCallback
  ) => {
    const baseUrl = 'https://hrf-asylum-be-b.herokuapp.com/cases';
    const params = { from: years[0], to: years[1], office };
    /*
- The updateStateWithNewData function is an async function that receives the years, view, office, and stateSettingCallback as parameters.
- It makes a request to the API to get the data for the selected years, view, and office. Then, it updates the state with the new data.
- I took this approach to avoid repeating the same code in the different components because they all need to fetch the data from the API.
*/
    try {
      const [fiscal, citizenship] = await Promise.all([
        axios.get(`${baseUrl}/fiscalSummary`, { params }),
        axios.get(`${baseUrl}/citizenshipSummary`, { params }),
      ]);
      /*
- The constants fiscal and citizenship are assigned the result of the Promise.all method, which is an array of the responses of the requests to the API.
- I used the Promise.all method to make the requests to the API in parallel, this way the requests are made at the same time and the response time is reduced.
- The requests are made to the fiscalSummary and citizenshipSummary endpoints of the API, passing the years and office as parameters.
- The response is stored in the fiscal and citizenship variables.
- I used await to wait for the response of both requests before continuing with the execution of the code.
*/
      fiscal.data['citizenshipResults'] = citizenship.data;
      stateSettingCallback(view, office, [fiscal.data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  /*
- The fiscal and citizenship data are combined into a single object, which is then passed to the stateSettingCallback function.
- The stateSettingCallback function is called with the view, office, and the combined fiscal and citizenship data as parameters.
*/

  const clearQuery = () => dispatch(resetVisualizationQuery(view, office));

  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
