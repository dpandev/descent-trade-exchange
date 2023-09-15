import React, { useState, createContext, ReactNode } from 'react'

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  userId: any;
  setUserId: any;
}

const initialState = {
  userId: null,
  setUserId: (id: string) => {},
}

export const AuthContext = createContext<IAuthContext>(initialState);

export const AuthProvider = ({ children }: Props) => {
  const [userId, setUserId] = useState(initialState);

  return (
    <AuthContext.Provider value={{userId, setUserId}}>
      {children}
    </AuthContext.Provider>
  );
}