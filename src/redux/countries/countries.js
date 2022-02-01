/* eslint-disable camelcase */
import axios from 'axios';

const ADD_COUNTRY = 'covid-19-stats/countries/ADD_COUNTRY';
const REMOVE_ALL_COUNTRIES = 'covid-19-stats/countries/REMOVE_ALL_COUNTRIES';

export const initialState = {
  today_confirmed: 0,
  today_new_deaths: 0,
  today_new_recovered: 0,
  today_recovered: 0,
  countries: {},
  europe: {
    today_confirmed: 0,
    today_new_deaths: 0,
    today_new_recovered: 0,
    today_recovered: 0,
    countries: {},
  },
  africa: {
    today_confirmed: 0,
    today_new_deaths: 0,
    today_new_recovered: 0,
    today_recovered: 0,
    countries: {},
  },
  // australia: { countries: {} },
  asia: {
    today_confirmed: 0,
    today_new_deaths: 0,
    today_new_recovered: 0,
    today_recovered: 0,
    countries: {},
  },
  north_america: {
    today_confirmed: 0,
    today_new_deaths: 0,
    today_new_recovered: 0,
    today_recovered: 0,
    countries: {},
  },
  south_america: {
    today_confirmed: 0,
    today_new_deaths: 0,
    today_new_recovered: 0,
    today_recovered: 0,
    countries: {},
  },
  oceania: {
    today_confirmed: 0,
    today_new_deaths: 0,
    today_new_recovered: 0,
    today_recovered: 0,
    countries: {},
  },
};

export const addCountry = (payload) => ({
  type: ADD_COUNTRY,
  payload,
});

export const removeAllCountries = () => ({
  type: REMOVE_ALL_COUNTRIES,
});

export const getCountries = () => (dispatch) => {
  function getYesterdayDateString() {
    const date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();

    return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-');
  }

  (async () => {
    try {
      const yesterdayDateString = getYesterdayDateString();
      let covidCountriesResponse = await axios.get(`https://api.covid19tracking.narrativa.com/api/${yesterdayDateString}`); // await axios.get('https://api.covid19tracking.narrativa.com/api/countries');
      covidCountriesResponse = covidCountriesResponse.data.dates[yesterdayDateString];
      const countriesResponse = await axios.get('https://restcountries.com/v3.1/all');
      Object.entries(covidCountriesResponse.countries)
        .map(([id, country]) => ({ id, ...country }))
        .forEach(({
          id,
          name,
          today_confirmed,
          today_new_deaths,
          today_new_recovered,
          today_recovered,
          regions,
        }) => {
          const country = countriesResponse.data.filter((country) => (
            country.name.common === name
            || (country.altSpellings && country.altSpellings.includes(name))
          ))[0];
          const newRegions = {};
          regions.forEach((region) => {
            newRegions[region.name] = {
              name: region.name,
              today_confirmed: region.today_confirmed,
              today_new_deaths: region.today_new_deaths,
              today_new_recovered: region.today_new_recovered,
              today_recovered: region.today_recovered,
            };
          });
          if (country) {
            dispatch(addCountry({
              id,
              name,
              today_confirmed,
              today_new_deaths,
              today_new_recovered,
              today_recovered,
              regions: newRegions,
              flag: country.flag,
              flagSVG: country.flags.svg,
              continent: country.continents[0],
            }));
          }
        });
    // eslint-disable-next-line no-empty
    } catch (err) {}
  })();
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTRY:
      // eslint-disable-next-line no-case-declarations
      const result = {
        ...state,
        countries: { ...state.countries, [action.payload.id]: action.payload },
        europe: { ...state.europe, countries: { ...state.europe.countries } },
        africa: { ...state.africa, countries: { ...state.africa.countries } },
        // australia: {...state.australia },
        asia: { ...state.asia, countries: { ...state.asia.countries } },
        north_america: { ...state.north_america, countries: { ...state.north_america.countries } },
        south_america: { ...state.south_america, countries: { ...state.south_america.countries } },
        oceania: { ...state.oceania, countries: { ...state.oceania.countries } },
      };
      // eslint-disable-next-line no-case-declarations
      const continentUrl = action.payload.continent.replaceAll(' ', '_').toLowerCase();
      result[continentUrl].countries[action.payload.id] = action.payload;
      result[continentUrl].today_confirmed += action.payload.today_confirmed;
      result[continentUrl].today_new_deaths += action.payload.today_new_deaths;
      result[continentUrl].today_new_recovered += action.payload.today_new_recovered;
      result[continentUrl].today_recovered += action.payload.today_recovered;
      result.today_confirmed += action.payload.today_confirmed;
      result.today_new_deaths += action.payload.today_new_deaths;
      result.today_new_recovered += action.payload.today_new_recovered;
      result.today_recovered += action.payload.today_recovered;
      return result;
    case REMOVE_ALL_COUNTRIES:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
