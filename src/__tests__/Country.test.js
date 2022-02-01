/* eslint-disable no-extend-native */
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import Country from '../components/country/Country';
import store from '../redux/configureStore';
import { addCountry } from '../redux/countries/countries';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ country: 'ukraine' }), // jest.fn().mockReturnValue,
}));

if (typeof String.prototype.replaceAll === 'undefined') {
  String.prototype.replaceAll = function replaceAll(match, replace) {
    return this.replace(new RegExp(match, 'g'), () => replace);
  };
}

test('country snapshot', () => {
  store.dispatch(addCountry({
    id: 'ukraine',
    name: 'Ukraine',
    today_confirmed: 123,
    today_new_deaths: 456,
    today_new_recovered: 12304,
    today_recovered: 1238,
    regions: {},
    flag: '',
    flagSVG: '',
    continent: 'Europe',
  }));
  const tree = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <Country />
        </BrowserRouter>
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
