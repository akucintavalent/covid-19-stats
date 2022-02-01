import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Back from '../components/back/Back';

test('back button snapshot', () => {
  const tree = renderer
    .create(<BrowserRouter><Back /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
