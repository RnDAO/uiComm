'use client';
import { useEffect, useState } from 'react';
import { StorageService } from '../services/StorageService';
import { IUser } from './types';
import { useRouter } from 'next/router';
import SimpleBackdrop from '../components/global/LoadingBackdrop';
import { toast } from 'react-toastify';

export default function privateRoute({ children }: any) {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  const notifyExpiredToken = () => {
    toast.error('Token expired...', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  };

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      setUser(user);
      const { token } = user;
      if (!token.accessToken) {
        notifyExpiredToken();
        router.replace('/tryNow');
      }
    } else {
      notifyExpiredToken();
      router.replace('/tryNow');
    }
  }, []);

  return <>{!user ? <SimpleBackdrop /> : children}</>;
}
