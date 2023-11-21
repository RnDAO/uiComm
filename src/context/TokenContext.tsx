'use client';
import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  ReactNode,
} from 'react';
import { StorageService } from '../services/StorageService';
import { IToken } from '../utils/types';

type TokenContextType = {
  token: IToken | null;
  updateToken: (newToken: IToken) => void;
  clearToken: () => void;
};

const TokenContext = createContext<TokenContextType | null>(null);

type TokenProviderProps = {
  children: ReactNode;
};

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [token, setToken] = useState<IToken | null>(null);

  useEffect(() => {
    const storedToken = StorageService.readLocalStorage<IToken>('user');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const updateToken = (newToken: IToken) => {
    StorageService.writeLocalStorage<IToken>('user', newToken);
    setToken(newToken);
  };

  const clearToken = () => {
    StorageService.removeLocalStorage('user');
    setToken(null);
  };

  return (
    <TokenContext.Provider value={{ token, updateToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = (): TokenContextType => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
