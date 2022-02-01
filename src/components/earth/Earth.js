import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Earth = (props) => {
  const { urlContinents } = props;
  const continents = urlContinents
    .map((continent) => ({
      name: continent.replaceAll('_', ' ').toUpperCase(),
      url: continent,
    }));
  return (
    <div>
      <div style={{
        height: '50vw',
        border: '1px solid black',
      }}
      >
        <p>EARTH</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
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
            <p>
              {continent.name}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

Earth.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  urlContinents: PropTypes.array.isRequired,
};

export default Earth;
