import React, { createContext, useContext, useState } from 'react';

interface AuthState {
  phoneNumber: string;
  setPhoneNumber: (num: string) => void;
}

const AuthContext = createContext<AuthState>({
  phoneNumber: '',
  setPhoneNumber: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <AuthContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
