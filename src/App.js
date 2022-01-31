import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  (async () => {
    const response = await axios.get('https://api.covid19tracking.narrativa.com/api/countries');
    setCountries(response.data.countries.map(({ id, name }) => ({ id, name })));
  })();

  return (
    <div>
      {countries.map(({ id, name }) => (<p key={id}>{name}</p>))}
    </div>
  );
};

export default App;
