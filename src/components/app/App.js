/* eslint-disable camelcase */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { getCountries, removeAllCountries } from '../../redux/countries/countries';
import Continent from '../continent/Continent';
import Earth from '../earth/Earth';
import asia from '../../pics/asia.png';
import africa from '../../pics/africa.png';
import europe from '../../pics/europe.png';
import north_america from '../../pics/north_america.png';
import oceania from '../../pics/oceania.png';
import south_america from '../../pics/south_america.png';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
    window.scrollTo(0, 0);
    return () => {
      dispatch(removeAllCountries());
    };
  }, [dispatch]);
  const urlContinents = useSelector((state) => (
    Object
      .keys(state.countriesReducer)
      .filter((continent) => continent !== 'countries' && !continent.startsWith('today_'))));
  const continents = urlContinents
    .map((continent) => ({
      name: continent.replaceAll('_', ' ').toUpperCase(),
      url: continent,
    }));
  const pics = {
    asia,
    africa,
    europe,
    north_america,
    oceania,
    south_america,
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Earth continents={continents} pics={pics} />} />
        {continents.map((continent) => (
          <Route
            key={continent.url}
            path={`${continent.url}/*`}
            element={
              <Continent continent={continent} pic={pics[continent.url]} />
            }
          />
        ))}
        <Route path="*" element={<div>Ooops!</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
