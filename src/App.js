import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries, removeAllCountries } from './redux/countries/countries';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
    return () => {
      dispatch(removeAllCountries());
    };
  }, [dispatch]);
  const countries = useSelector((state) => state.countriesReducer.africa);
  return (
    <div>
      {countries.map(({
        id, name, flag, flagSVG, continent,
      }) => (
        <div key={id}>
          <img style={{ width: '200px' }} src={flagSVG} alt={`flag of ${name}`} />
          <p>
            {name}
            {flag}
            {continent}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
