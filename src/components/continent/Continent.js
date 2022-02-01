import { useSelector } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import Country from '../country/Country';

const Continent = (props) => {
  const { continent } = props;
  const countries = useSelector((state) => state.countriesReducer[continent.url]);
  return (
    <Routes>
      <Route
        index
        element={(
          <div>
            <div style={{
              height: '50vw',
              border: '1px solid black',
            }}
            >
              <p>{continent.name}</p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              {countries.map((country) => (
                <NavLink
                  to={country.id}
                  key={country.id}
                  style={{
                    height: '50vw',
                    border: '1px solid black',
                    textDecoration: 'none',
                  }}
                >
                  <p key={country.id}>{country.name + country.flag}</p>
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
};

export default Continent;
