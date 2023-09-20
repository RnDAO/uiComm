import React, { useEffect } from 'react';
import Sidebar from '../components/layouts/Sidebar';
import SidebarXs from '../components/layouts/xs/SidebarXs';
import useAppStore from '../store/useStore';
import { StorageService } from '../services/StorageService';
import { IUser } from '../utils/types';
import TcPrompt from '../components/layouts/shared/TcPrompt';

type IDefaultLayoutProps = {
  children: React.ReactNode;
};

export const defaultLayout = ({ children }: IDefaultLayoutProps) => {
  const { getGuilds, getGuildInfoByDiscord, authorizeTwitter, getUserInfo } =
    useAppStore();

  const user = StorageService.readLocalStorage<IUser>('user');

  useEffect(() => {
    if (user) {
      const { guildId } = user.guild;
      getGuilds();
      if (guildId) {
        getGuildInfoByDiscord(guildId);
      }

      const fetchUserInfo = async () => {
        const {
          twitterConnectedAt,
          twitterId,
          twitterProfileImageUrl,
          twitterUsername,
        } = await getUserInfo();

        StorageService.updateLocalStorageWithObject('user', 'twitter', {
          twitterConnectedAt,
          twitterId,
          twitterProfileImageUrl,
          twitterUsername,
        });
      };

      // Immediately call fetchUserInfo once
      fetchUserInfo();

      // Set up the interval to call fetchUserInfo every 5 seconds
      const intervalId = setInterval(fetchUserInfo, 5000);

      // Return a cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <>
      <TcPrompt />
      <div className="flex flex-col md:flex-row justify-between w-full">
        <Sidebar />
        <SidebarXs />
        <main className="md:ml-[100px] xl:ml-[150px] flex-1">{children}</main>
      </div>
    </>
  );
};
