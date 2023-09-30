import { API, Hub, graphqlOperation } from 'aws-amplify';
import React, { useState, createContext, ReactNode, FC, useContext, useEffect } from 'react'
import { getUser } from '../../src/graphql/queries';

export type AuthUserType = {
  id: string | undefined;
  displayName: string | undefined;
  email: string | undefined;
  following: string[];
  follows: string[];
  image: string | undefined;
  networth: number | undefined;
  portfolio: string[];
  watchlist: string[];
  trades: string[];
  updatedAt: string | undefined;
  createdAt: string | undefined;
}

export type AuthUserSetterType = React.Dispatch<React.SetStateAction<AuthUserType>>;
export type AuthUserContext = AuthUserType;

interface AuthContextProps {
  children?: ReactNode;
}

const initialState: AuthUserType = {
  id: undefined,
  displayName: undefined,
  email: undefined,
  following: [],
  follows: [],
  image: undefined,
  networth: undefined,
  portfolio: [],
  watchlist: [],
  trades: [],
  updatedAt: undefined,
  createdAt: undefined,
}

const AuthContext = createContext<AuthUserContext>(initialState);

export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUserType>(initialState);

  const fetchUserData = async (loginUser: string) => {//fetch user from db using id fron cognito
    try {
      console.log('loginUser:', loginUser)
      const response = await API.graphql({
        ...graphqlOperation(
          getUser,
          {id: loginUser }
        ),
        authMode: "API_KEY"
      });
      console.log('res:', response)
      setUser(response.data.getUser);
      return;
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log('data:', data)
      console.log('event', event)
      if (event === 'signIn') {
        console.log('hub:', data.signInUserSession.accessToken.payload.sub)
        fetchUserData(data.signInUserSession.accessToken.payload.sub)
        // fetchUserData('115b5520-60b1-701e-b9cb-266330258eb4')
      }
      if (event === 'signOut') {
        setUser(initialState);
      }
    });
    
    console.log('user.id:', user)
    // fetchUserData('115b5520-60b1-701e-b9cb-266330258eb4')
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthUserContext => useContext<AuthUserContext>(AuthContext);

export default AuthProvider;