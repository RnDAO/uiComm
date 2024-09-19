import React from 'react';

import Header from '../components/layouts/Header';
import TcPrompt from '../components/layouts/shared/TcPrompt';
import Sidebar from '../components/layouts/Sidebar';
import SidebarXs from '../components/layouts/xs/SidebarXs';

type IDefaultLayoutProps = {
  children: React.ReactNode;
};

export const defaultLayout = ({ children }: IDefaultLayoutProps) => {
  return (
    <>
      <TcPrompt />
      <div className='flex w-full flex-col justify-between md:flex-row'>
        <Sidebar />
        <SidebarXs />
        <main className='flex-1 md:ml-[100px] xl:ml-[150px]'>
          <Header />
          {children}
        </main>
      </div>
    </>
  );
};
