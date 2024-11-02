import { useAuth as useAuthContext } from '../contexts/authContext';

const useAuth = () => {
  return useAuthContext();
};

export default useAuth;