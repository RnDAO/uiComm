import { HeaderSection } from '../components/pages/pageIndex/HeaderSection';
import { FooterSection } from '../components/pages/pageIndex/FooterSection';
import MainSection from '../components/pages/pageIndex/MainSection';

import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import { useEffect, useState } from 'react';
import { StorageService } from '../services/StorageService';
import { IUser } from '../utils/types';
import { useRouter } from 'next/router';
import EmptyState from '../components/global/EmptyState';
import Image from 'next/image';
import emptyState from '../assets/svg/empty-state.svg';
import useAppStore from '../store/useStore';
import { Alert, Collapse } from '@mui/material';

function Dashboard(): JSX.Element {
  const [alertStateOpen, setAlertStateOpen] = useState(true);

  const { guilds } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      const { token } = user;
      if (!token.accessToken) {
        router.replace('/tryNow');
      }
    }else{
      router.replace('/tryNow');
    }
  }, []);

  if (guilds && guilds.length === 0) {
    return (
      <>
        <SEO />
        <EmptyState image={<Image alt="Image Alt" src={emptyState} />} />
      </>
    );
  }

  return (
    <>
      <SEO />
      <Collapse
        in={alertStateOpen}
        sx={{
          ':root': {
            position: 'sticky',
          },
        }}
      >
        {guilds && guilds[0].isInProgress ? (
          <Alert
            variant="filled"
            onClose={() => {
              setAlertStateOpen(false);
            }}
            severity="warning"
            sx={{}}
          >
            Data import is in progress. It might take up to 12 hours to finish
            the data import. Once it is done we will send you a message on
            Discord.
          </Alert>
        ) : (
          ''
        )}
      </Collapse>

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
