import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import earth from '../../pics/earth.png';
import Back from '../back/Back';

const Earth = (props) => {
  const { continents, pics } = props;
  const countriesState = useSelector((state) => state.countriesReducer);
  return (
    <div>
      <Back />
      <div className="top-header">
        <img className="header-image" src={earth} alt="Earth" />
        <div>
          <p className="title">EARTH</p>
          <p>covid-19 stats for yesterday</p>
          <br />
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
      <div className="stats">STATS BY CONTINENT</div>
      <div className="items">
        {continents.map((continent) => (
          <NavLink
            to={continent.url}
            key={continent.url}
            className="item"
          >
            <img className="item-image" src={pics[continent.url]} alt={continent.name} />
            <p className="title">
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
