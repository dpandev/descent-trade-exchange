import { API, Hub, graphqlOperation } from 'aws-amplify';
import React, { useState, createContext, ReactNode, FC, useContext, useEffect } from 'react'
import { getUser } from '../../src/graphql/queries';
import { AmplifyGraphQLResult } from '../types';
import { GetUserQuery, User } from '../../src/API';

export type AuthUserType = User | null;

export type AuthUserSetterType = React.Dispatch<React.SetStateAction<AuthUserType>>;
export interface AuthUserContext { 
  user: AuthUserType, 
  setUser: AuthUserSetterType 
};

interface AuthContextProps {
  children?: ReactNode;
}

const initialState: AuthUserType = null;
const initialSetUser: AuthUserSetterType = () => {};

const AuthContext = createContext<AuthUserContext>({ user: initialState, setUser: initialSetUser });

export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUserType>(initialState);

  const fetchUserData = async (loginUser: string) => {//fetch user from db using id from cognito
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof getUser>>({
        ...graphqlOperation(
          getUser,
          { id: loginUser }
        ),
      }) as { data: GetUserQuery };
      if (response.data.getUser) {
        console.log('getUser', response.data.getUser)
        setUser({ ...user, ...response.data.getUser });
      }
      return;
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      if (event === 'signIn') {
        console.log('hub', event, data)
        fetchUserData(data.signInUserSession.accessToken.payload.sub);
      }
      if (event === 'signOut') {
        setUser(initialState);
      }
    });
    
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthUserContext => useContext<AuthUserContext>(AuthContext);

export default AuthProvider;