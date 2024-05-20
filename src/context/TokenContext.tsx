import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { SnackbarProvider } from './SnackbarContext';
import { StorageService } from '../services/StorageService';
import useAppStore from '../store/useStore';
import { IDiscordModifiedCommunity } from '../utils/interfaces';
import { IToken } from '../utils/types';

type TokenContextType = {
  token: IToken | null;
  community: IDiscordModifiedCommunity | null;
  updateToken: (newToken: IToken) => void;
  updateCommunity: (newCommunity: IDiscordModifiedCommunity) => void;
  deleteCommunity: () => void;
  clearToken: () => void;
};

export const TokenContext = createContext<TokenContextType | null>(null);

type TokenProviderProps = {
  children: ReactNode;
};

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const { retrieveCommunityById, getUserCommunityRole } = useAppStore();
  const [token, setToken] = useState<IToken | null>(null);
  const [community, setCommunity] = useState<IDiscordModifiedCommunity | null>(
    null
  );

  // Use useRef to persist the interval ID across renders
  const intervalIdRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    const storedToken = StorageService.readLocalStorage<IToken>('user');
    const storedCommunity =
      StorageService.readLocalStorage<IDiscordModifiedCommunity>('community');

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedCommunity) {
      setCommunity(storedCommunity);
      getUserCommunityRole(storedCommunity.id);
    }

    const fetchAndUpdateCommunity = async () => {
      try {
        if (storedCommunity?.id) {
          const updatedCommunity = await retrieveCommunityById(
            storedCommunity.id
          );
          if (updatedCommunity) {
            setCommunity(updatedCommunity);
            StorageService.writeLocalStorage<IDiscordModifiedCommunity>(
              'community',
              updatedCommunity
            );
          }
        }
      } catch (error) {
        console.error('Error fetching community:', error);
        StorageService.removeLocalStorage('community');
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }
      }
    };

    intervalIdRef.current = setInterval(fetchAndUpdateCommunity, 5000);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  const updateToken = async (newToken: IToken) => {
    StorageService.writeLocalStorage<IToken>('user', newToken);
    setToken(newToken);
  };

  const updateCommunity = async (newCommunity: IDiscordModifiedCommunity) => {
    // Clear the existing interval
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    // Update the community and reset the interval
    setCommunity(newCommunity);
    StorageService.writeLocalStorage<IDiscordModifiedCommunity>(
      'community',
      newCommunity
    );

    await getUserCommunityRole(newCommunity?.id);

    // Restart the interval
    intervalIdRef.current = setInterval(async () => {
      try {
        const updatedCommunity = await retrieveCommunityById(newCommunity.id);
        if (updatedCommunity) {
          setCommunity(updatedCommunity);
          StorageService.writeLocalStorage<IDiscordModifiedCommunity>(
            'community',
            updatedCommunity
          );
        }
      } catch (error) {
        console.error('Error fetching community:', error);
        StorageService.removeLocalStorage('community');
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }
      }
    }, 5000);
  };

  const deleteCommunity = () => {
    console.log('hjere');

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    StorageService.removeLocalStorage('community');
    setCommunity(null);
  };

  const clearToken = () => {
    StorageService.removeLocalStorage('user');
    setToken(null);
  };

  return (
    <TokenContext.Provider
      value={{
        token,
        community,
        updateToken,
        updateCommunity,
        deleteCommunity,
        clearToken,
      }}
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
