import { useAtom } from 'jotai';
import { userAtom, isAuthenticatedAtom, User } from '../atoms';

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};

export default useAuth;
