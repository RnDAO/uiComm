import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import SimpleBackdrop from '../components/global/LoadingBackdrop';
import { StorageService } from '../services/StorageService';
import { IToken } from './types';
import { ICommunity } from './interfaces';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<IToken | null>(null);
  const router = useRouter();

  const isCentricRoute = useMemo(
    () => router.pathname.startsWith('/centric'),
    [router.pathname]
  );

  const isObjectNotEmpty = (obj: Record<string, any>): boolean => {
    return Object.keys(obj).length > 0;
  };
  useEffect(() => {
    if (!isCentricRoute) {
      const storedToken = StorageService.readLocalStorage<IToken>('user');

      if (storedToken && storedToken.accessToken) {
        setToken(storedToken);
      } else {
        router.replace('/centric');
      }
    }
  }, [isCentricRoute, router]);

  return <>{!token && !isCentricRoute ? <SimpleBackdrop /> : children}</>;
}
