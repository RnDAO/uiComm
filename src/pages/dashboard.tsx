import { HeaderSection } from '../components/pages/pageIndex/HeaderSection';
import { FooterSection } from '../components/pages/pageIndex/FooterSection';
import dynamic from 'next/dynamic';

const MainSection = dynamic(
  () => import('../components/pages/pageIndex/MainSection'),
  { ssr: false }
);

import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import { useEffect } from 'react';

function Dashboard(): JSX.Element {
  useEffect(() => {
    const token = localStorage.getItem('RNDAO_access_token');
    if (!token) {
      location.replace('/login');
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
