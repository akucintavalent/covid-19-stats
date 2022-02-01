/* eslint-disable no-extend-native */
import { render, screen, fireEvent } from '../test-utils';
import '@testing-library/jest-dom';
import App from '../components/app/App';

if (typeof String.prototype.replaceAll === 'undefined') {
  String.prototype.replaceAll = function replaceAll(match, replace) {
    return this.replace(new RegExp(match, 'g'), () => replace);
  };
}

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Europe/i);
  expect(linkElement).toBeInTheDocument();
});

test('click Europe', async () => {
  render(<App />);
  const linkElement = screen.getByText(/Europe/i);
  fireEvent.click(linkElement);
  await new Promise((resolve) => setTimeout(() => resolve(), 4000));
  const linkElement2 = screen.getByText(/Ukraine🇺🇦/i);
  fireEvent.click(linkElement2);
  const noRegionsText = screen.getByText(/NO REGIONS AVAILABLE/i);
  expect(noRegionsText).toBeInTheDocument();
});
