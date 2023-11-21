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
import React from 'react';
import ActiveMemberComposition from '../components/pages/pageIndex/ActiveMemberComposition';
import HeatmapChart from '../components/pages/pageIndex/HeatmapChart';
import MemberInteractionGraph from '../components/pages/pageIndex/MemberInteractionGraph';

function Dashboard(): JSX.Element {
  const [alertStateOpen, setAlertStateOpen] = useState(false);

  const { guilds } = useAppStore();
  const router = useRouter();

  const toggleAnalysisState = () => {
    StorageService.writeLocalStorage('analysis_state', {
      isRead: true,
      visible: false,
    });
    setAlertStateOpen(false);
  };

  // if (guilds && guilds.length === 0) {
  //   return (
  //     <>
  //       <SEO />
  //       <EmptyState image={<Image alt="Image Alt" src={emptyState} />} />
  //     </>
  //   );
  // }

  return (
    <>
      <SEO />
      {/* <Collapse
        in={alertStateOpen}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 999,
        }}
      >
        {guilds && guilds[0].isInProgress ? (
          <Alert
            variant="filled"
            onClose={toggleAnalysisState}
            severity="warning"
            sx={{ padding: '6px 9rem 6px 14rem' }}
          >
            Data import is in progress. It might take up to 6 hours to finish
            the data import. Once it is done we will send you a message on
            Discord.
          </Alert>
        ) : (
          ''
        )}
      </Collapse> */}

      <div className="flex flex-col container space-y-8 justify-between px-4 md:px-12 py-4">
        <div className="block">
          <h3 className="pb-6 text-lg font-medium text-lite-black">
            Community Insights
          </h3>
          <div className="space-y-4">
            <ActiveMemberComposition />
            <HeatmapChart />
            <MemberInteractionGraph />
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.pageLayout = defaultLayout;

export default Dashboard;
