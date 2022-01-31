import axios from 'axios';

const ADD_COUNTRY = 'covid-19-stats/countries/ADD_COUNTRY';
const REMOVE_ALL_COUNTRIES = 'covid-19-stats/countries/REMOVE_ALL_COUNTRIES';

const initialState = {
  countries: [],
  europe: [],
  africa: [],
  // australia: [],
  asia: [],
  'north america': [],
  'south america': [],
  oceania: [],
};

export const addCountry = (payload) => ({
  type: ADD_COUNTRY,
  payload,
});

export const removeAllCountries = () => ({
  type: REMOVE_ALL_COUNTRIES,
});

export const getCountries = () => (dispatch) => {
  (async () => {
    const covidResponse = await axios.get('https://api.covid19tracking.narrativa.com/api/countries');
    const countriesResponse = await axios.get('https://restcountries.com/v3.1/all');
    covidResponse.data.countries.forEach(({ id, name }) => {
      const country = countriesResponse.data.filter((country) => (
        country.name.common === name
        || (country.altSpellings && country.altSpellings.includes(name))
      ))[0];
      if (country) {
        dispatch(addCountry({
          id,
          name,
          flag: country.flag,
          flagSVG: country.flags.svg,
          continent: country.continents[0],
        }));
      }
    });
  })();
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTRY:
      // eslint-disable-next-line no-case-declarations
      const result = {
        countries: [...state.countries, action.payload],
        europe: [...state.europe],
        africa: [...state.africa],
        // australia: [...state.australia],
        asia: [...state.asia],
        'north america': [...state['north america']],
        'south america': [...state['south america']],
        oceania: [...state.oceania],
      };
      result[action.payload.continent.toLowerCase()].push(action.payload);
      return result;
    case REMOVE_ALL_COUNTRIES:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
