import React, { useEffect } from 'react';
import Sidebar from '../components/layouts/Sidebar';
import SidebarXs from '../components/layouts/xs/SidebarXs';
import useAppStore from '../store/useStore';
import { StorageService } from '../services/StorageService';
import { useRouter } from 'next/router';
import { IUser } from '../utils/types';

type Props = {
  children: React.ReactNode;
};

export const defaultLayout = ({ children }: Props) => {
  const { getGuilds } = useAppStore();

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      getGuilds();
    }
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between w-full">
        <Sidebar />
        <SidebarXs />
        <main className="md:ml-[100px] xl:ml-[150px] flex-1">{children}</main>
      </div>
    </>
  );
};
