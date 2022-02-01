import { useNavigate } from 'react-router-dom';

const Back = () => {
  const navigate = useNavigate();
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onKeyDown={() => {}}
      type="button"
      onClick={() => navigate(-1)}
      className="stats"
    >
      &nbsp;&nbsp;&nbsp;
      <i className="fas fa-chevron-left" />
      &nbsp;&nbsp;&nbsp;
    </div>
  );
};

export default Back;
