import { HeaderSection } from '../components/pages/pageIndex/HeaderSection';
import { FooterSection } from '../components/pages/pageIndex/FooterSection';
import MainSection from '../components/pages/pageIndex/MainSection';

import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import { useEffect } from 'react';
import { StorageService } from '../services/StorageService';
import { IUser } from '../utils/types';
import { useRouter } from 'next/router';

function Dashboard(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      const { token } = user;
      if (!token.accessToken) {
        router.replace('/login');
      }
    }else{
      router.replace('/login');
    }
  }, []);
  return (
    <>
      <SEO />
      <div className="flex flex-col container space-y-8 justify-between px-4 md:px-12 py-4">
        <HeaderSection />
        <MainSection />
        <FooterSection />
      </div>
    </>
  );
}

Dashboard.pageLayout = defaultLayout;

export default Dashboard;
