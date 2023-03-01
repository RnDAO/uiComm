'use client';
import { useEffect, useState } from 'react';
import { StorageService } from '../services/StorageService';
import { IUser } from './types';
import { useRouter } from 'next/router';
import SimpleBackdrop from '../components/global/LoadingBackdrop';

export default function privateRoute({ children }: any) {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      setUser(user);
      const { token } = user;
      if (!token.accessToken) {
        router.replace('/tryNow');
      } else {
        router.push('/');
      }
    } else {
      router.replace('/tryNow');
    }
  }, []);

  return <>{!user ? <SimpleBackdrop /> : children}</>;
}
