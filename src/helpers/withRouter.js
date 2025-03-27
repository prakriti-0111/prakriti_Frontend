import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

const withRouter = Component => props => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [query] = useSearchParams();

  return (
    <Component
      {...props}
      location={location}
      navigate={navigate}
      params={params}
      query={query}
    />
  );
};

export default withRouter;