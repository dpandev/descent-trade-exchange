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
      const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
      if (currentUser) {
        setUser({ id: currentUser.attributes.sub });
      } else {
        setUser(null);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let signedOut: boolean = false;
    setIsLoading(true);
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setUser({ id: data.signInUserSession.accessToken.payload.sub });
          break;
        case 'autoSign':
          setUser({ id: data.signInUserSession.accessToken.payload.sub });
          break;
        case 'signOut':
          setUser(null);
          signedOut = true;
          break;
        case 'userDeleted':
          setUser(null);
          signedOut = true;
          break;
        default:
          break;
      }
    });

    if (!signedOut) {
      fetchUser();
    }
    
    return unsubscribe; //  stops listening 
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {isLoading && 
        <LoadingScreenModal visible={isLoading} title={'Logging you in...'} />
      }
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthUserContext => useContext<AuthUserContext>(AuthContext);

export default AuthProvider;