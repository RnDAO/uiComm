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
import { ICommunity } from '../utils/interfaces';
import { SnackbarProvider } from './SnackbarContext';
import useAppStore from '../store/useStore';

type TokenContextType = {
  token: IToken | null;
  community: ICommunity | null;
  updateToken: (newToken: IToken) => void;
  updateCommunity: (newCommunity: ICommunity) => void;
  clearToken: () => void;
};

const TokenContext = createContext<TokenContextType | null>(null);

type TokenProviderProps = {
  children: ReactNode;
};

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const { retrieveCommunityById } = useAppStore();
  const [token, setToken] = useState<IToken | null>(null);
  const [community, setCommunity] = useState<ICommunity | null>(null);

  let intervalId: string | number | NodeJS.Timer | undefined;

  useEffect(() => {
    const storedToken = StorageService.readLocalStorage<IToken>('user');
    const storedCommunity =
      StorageService.readLocalStorage<ICommunity>('community');
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedCommunity) {
      setCommunity(storedCommunity);
    }

    const fetchAndUpdateCommunity = async () => {
      try {
        if (storedCommunity?.id) {
          const updatedCommunity = await retrieveCommunityById(
            storedCommunity.id
          );
          if (updatedCommunity) {
            setCommunity(updatedCommunity);
            StorageService.writeLocalStorage<ICommunity>(
              'community',
              updatedCommunity
            );
          }
        }
      } catch (error) {
        console.error('Error fetching community:', error);
        StorageService.removeLocalStorage('community');
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(fetchAndUpdateCommunity, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const updateToken = (newToken: IToken) => {
    StorageService.writeLocalStorage<IToken>('user', newToken);
    setToken(newToken);
  };

  const updateCommunity = (newCommunity: ICommunity) => {
    StorageService.writeLocalStorage<ICommunity>('community', newCommunity);
    setCommunity(newCommunity);
  };

  const clearToken = () => {
    StorageService.removeLocalStorage('user');
    setToken(null);
  };

  return (
    <TokenContext.Provider
      value={{ token, community, updateToken, updateCommunity, clearToken }}
    >
      <SnackbarProvider>{children}</SnackbarProvider>
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
