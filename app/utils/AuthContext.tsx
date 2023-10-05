import { API, Hub, graphqlOperation } from 'aws-amplify';
import React, { useState, createContext, ReactNode, FC, useContext, useEffect } from 'react'
import { getUser } from '../../src/graphql/queries';
import { AmplifyGraphQLResult } from '../types';
import { GetUserQuery, User } from '../../src/API';

export type AuthUserType = User;

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

  const fetchUserData = async (loginUser: string): Promise<void> => {//fetch user from db using id from cognito
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof getUser>>({
        ...graphqlOperation(
          getUser,
          { id: loginUser }
        ),
      }) as { data: GetUserQuery };
      if (response.data.getUser) {
        let userObj: AuthUserType = response.data.getUser;
        setUser({ ...user, ...userObj });
      }
      return;
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      if (event === 'signIn') {
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