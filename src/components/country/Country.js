import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Country = () => {
  const { country: countryName } = useParams();
  const country = useSelector((state) => state.countriesReducer.countries[countryName]);
  if (!country) {
    return <div>Ooops</div>;
  }
  const regions = Object.values(country.regions);
  return (
    <div>
      <div className="country-header">
        <img className="flag" src={country.flagSVG} alt={`flag of ${country.name}`} />
        <div>
          <p className="title">{country.name}</p>
          <p>covid-19 stats for yesterday</p>
          <br />
          <p>
            confirmed:
            {country.today_confirmed}
          </p>
          <p>
            new deaths:
            {country.today_new_deaths}
          </p>
          <p>
            new recovered:
            {country.today_new_recovered}
          </p>
          <p>
            recovered:
            {country.today_recovered}
          </p>
        </div>
      </div>
      <div className="stats">STATS BY REGION</div>
      <div className="items">
        {regions.length === 0
          ? (<div className="no-regions">NO REGIONS AVAILABLE</div>)
          : regions.map((region) => (
            <div key={region.name} className="item">
              <p className="title">
                {region.name}
              </p>
              <p>
                confirmed:
                {region.today_confirmed}
              </p>
              <p>
                new deaths:
                {region.today_new_deaths}
              </p>
              <p>
                new recovered:
                {region.today_new_recovered}
              </p>
              <p>
                recovered:
                {region.today_recovered}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Country;
