import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import earth from '../../pics/earth.png';

const Earth = (props) => {
  const { continents, pics } = props;
  const countriesState = useSelector((state) => state.countriesReducer);
  return (
    <div>
      <div style={{
        display: 'flex',
        height: '50vw',
        border: '1px solid black',
      }}
      >
        <img style={{ width: '40vw', height: '40vw' }} src={earth} alt="Earth" />
        <div>
          EARTH
          <br />
          covid-19 stats for yesterday
          <p>
            confirmed:
            {countriesState.today_confirmed}
          </p>
          <p>
            new deaths:
            {countriesState.today_new_deaths}
          </p>
          <p>
            new recovered:
            {countriesState.today_new_recovered}
          </p>
          <p>
            recovered:
            {countriesState.today_recovered}
          </p>
        </div>
      </div>
      <div>STATS BY CONTINENT</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}
      >
        {continents.map((continent) => (
          <NavLink
            to={continent.url}
            key={continent.url}
            style={{
              height: '50vw',
              border: '1px solid black',
              textDecoration: 'none',
            }}
          >
            <img style={{ width: 'auto', height: '40%' }} src={pics[continent.url]} alt={continent.name} />
            <p>
              {continent.name}
            </p>
            <p>
              confirmed:
              {countriesState[continent.url].today_confirmed}
            </p>
            <p>
              new deaths:
              {countriesState[continent.url].today_new_deaths}
            </p>
            <p>
              new recovered:
              {countriesState[continent.url].today_new_recovered}
            </p>
            <p>
              recovered:
              {countriesState[continent.url].today_recovered}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

Earth.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  continents: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pics: PropTypes.object.isRequired,
};

export default Earth;
