import { useParams } from 'react-router-dom';

const Country = () => {
  const { country } = useParams();
  return (
    <div>{country}</div>
  );
};

export default Country;
