import { Auth, Hub } from 'aws-amplify';
import React, { useState, createContext, ReactNode, FC, useContext, useEffect } from 'react'
import LoadingScreenModal from '../components/molecules/LoadingScreenModal';

export interface AuthUserType {
  id: string;
}

export type AuthUserSetterType = React.Dispatch<React.SetStateAction<AuthUserType | null>>;
export interface AuthUserContext { 
  user: AuthUserType | null, 
  setUser: AuthUserSetterType
};

interface AuthContextProps {
  children?: ReactNode;
}

const initialState: AuthUserType | null = null;
const initialSetUser: AuthUserSetterType = () => {};

const AuthContext = createContext<AuthUserContext>({ user: initialState, setUser: initialSetUser });

export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUserType | null>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUser = async (): Promise<void> => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      console.log('current:', currentUser)
      setUser({ id: currentUser.attributes.sub });
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log('hub:', data)
      setIsLoading(true);
      switch (event) {
        case 'signIn':
          setUser({ id: data.signInUserSession.accessToken.payload.sub });
          break;
        case 'autoSign':
          console.log('autosignin', data);
          setUser({ id: data.signInUserSession.accessToken.payload.sub });
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'userDeleted':
          setUser(null);
          break;
        default:
          console.log('event:', event)
          break;
      }
    });

    fetchUser();
    console.log('auth:', user)
    
    return unsubscribe; //  stops listening 
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {isLoading && 
        <LoadingScreenModal visible={isLoading} />
      }
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthUserContext => useContext<AuthUserContext>(AuthContext);

export default AuthProvider;