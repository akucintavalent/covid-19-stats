import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { getCountries, removeAllCountries } from '../../redux/countries/countries';
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
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Earth urlContinents={urlContinents} />} />
        {urlContinents.map((continent) => (
          <Route key={continent} path={continent} element={<div>Hello there</div>} />
        ))}
        <Route path="*" element={<div>Ooops!</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
