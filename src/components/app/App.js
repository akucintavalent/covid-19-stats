import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { getCountries, removeAllCountries } from '../../redux/countries/countries';
import Continent from '../continent/Continent';
import Earth from '../earth/Earth';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
    return () => {
      dispatch(removeAllCountries());
    };
  }, [dispatch]);
  const urlContinents = useSelector((state) => (
    Object
      .keys(state.countriesReducer)
      .filter((continent) => continent !== 'countries')));
  const continents = urlContinents
    .map((continent) => ({
      name: continent.replaceAll('_', ' ').toUpperCase(),
      url: continent,
    }));
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Earth continents={continents} />} />
        {continents.map((continent) => (
          <Route
            key={continent.url}
            path={`${continent.url}/*`}
            element={
              <Continent continent={continent} />
            }
          />
        ))}
        <Route path="*" element={<div>Ooops!</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
