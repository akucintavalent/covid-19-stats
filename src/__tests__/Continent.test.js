import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import Continent from '../components/continent/Continent';
import store from '../redux/configureStore';

test('continent snapshot', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <Continent continent={{ url: 'asia', name: 'Asia' }} pic="" />
        </BrowserRouter>
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
