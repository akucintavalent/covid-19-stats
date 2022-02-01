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
      <div style={{
        display: 'flex',
        height: '40vw',
        border: '1px solid black',
      }}
      >
        <img style={{ maxWidth: '50%', height: 'auto' }} src={country.flagSVG} alt={`flag of ${country.name}`} />
        <div>
          {country.name}
          <br />
          covid-19 stats for yesterday
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
      <div>STATS BY REGION</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {regions.length === 0
          ? (<div style={{ gridColumn: '1 / 3' }}>NO REGIONS AVAILABLE</div>)
          : regions.map((region) => (
            <div
              key={region.name}
              style={{
                height: '50vw',
                border: '1px solid black',
                textDecoration: 'none',
              }}
            >
              <p>
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
