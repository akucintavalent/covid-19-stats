/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import Country from '../country/Country';

const Continent = (props) => {
  const { continent, pic } = props;
  const countries = useSelector((state) => (
    Object.values(state.countriesReducer[continent.url].countries)));
  const today_confirmed = useSelector((state) => (
    state.countriesReducer[continent.url].today_confirmed));
  const today_new_deaths = useSelector((state) => (
    state.countriesReducer[continent.url].today_new_deaths));
  const today_new_recovered = useSelector((state) => (
    state.countriesReducer[continent.url].today_new_recovered));
  const today_recovered = useSelector((state) => (
    state.countriesReducer[continent.url].today_recovered));
  return (
    <Routes>
      <Route
        index
        element={(
          <div>
            <div className="top-header">
              <div>
                <p className="title">{continent.name}</p>
                <p>covid-19 stats for yesterday</p>
                <br />
                <p>
                  confirmed:
                  {today_confirmed}
                </p>
                <p>
                  new deaths:
                  {today_new_deaths}
                </p>
                <p>
                  new recovered:
                  {today_new_recovered}
                </p>
                <p>
                  recovered:
                  {today_recovered}
                </p>
              </div>
              <img src={pic} alt={continent.name} className="header-image" />
            </div>
            <div className="stats">STATS BY COUNTRY</div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {countries.map((country) => (
                <NavLink
                  to={country.id}
                  key={country.id}
                  style={{
                    display: 'flex',
                    height: '35vw',
                    border: '1px solid black',
                    textDecoration: 'none',
                  }}
                >
                  <img style={{ maxWidth: '50%', height: 'auto' }} src={country.flagSVG} alt={`flag of ${country.name}`} />
                  <div>
                    <p key={country.id}>{country.name + country.flag}</p>
                    <p>
                      confirmed:
                      {country.today_confirmed}
                    </p>
                    <p>
                      new deaths:
                      {country.today_new_deaths}
                    </p>
                    <p>
                      new recovered:
                      {country.today_new_recovered}
                    </p>
                    <p>
                      recovered:
                      {country.today_recovered}
                    </p>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      />
      <Route path=":country" element={<Country />} />
    </Routes>
  );
};

Continent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  continent: PropTypes.object.isRequired,
  pic: PropTypes.string.isRequired,
};

export default Continent;
