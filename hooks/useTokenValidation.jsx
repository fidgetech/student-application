import { useLocation } from 'react-router-dom';
import { isValidUUID } from '../utils';

function useTokenValidation() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const isValidToken = isValidUUID(token);
  return { isValidToken, token }
}

export default useTokenValidation;
