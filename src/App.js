import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  useEffect(async () => {
    const covidResponse = await axios.get('https://api.covid19tracking.narrativa.com/api/countries');
    const countriesResponse = await axios.get('https://restcountries.com/v3.1/all');
    setCountries(covidResponse.data.countries.map(({ id, name }) => {
      const country = countriesResponse.data.filter((country) => (
        country.name.common === name
        || (country.altSpellings && country.altSpellings.includes(name))
      ))[0];
      if (country) {
        return {
          id,
          name,
          flag: country.flag,
          flagSVG: country.flags.svg,
          continent: country.continents[0],
        };
      }
      return undefined;
      // console.log(name);
      // return {
      //   id,
      //   name,
      // };
    }).filter((country) => country !== undefined));
  }, []);

  return (
    <div>
      {countries.map(({
        id, name, flag, flagSVG, continent,
      }) => (
        <div key={id}>
          <img style={{ width: '200px' }} src={flagSVG} alt={`flag of ${name}`} />
          <p>
            {name}
            {flag}
            {continent}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
