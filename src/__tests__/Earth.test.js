/* eslint-disable no-extend-native */
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '../test-utils';
import '@testing-library/jest-dom';
import Earth from '../components/earth/Earth';

if (typeof String.prototype.replaceAll === 'undefined') {
  String.prototype.replaceAll = function replaceAll(match, replace) {
    return this.replace(new RegExp(match, 'g'), () => replace);
  };
}

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <Earth continents={[{ url: 'asia', name: 'Asia' }]} pics={{ asia: '' }} />
    </BrowserRouter>,
  );
  const linkElement = screen.getByText(/Asia/i);
  expect(linkElement).toBeInTheDocument();
});
