import React, { useEffect, useState } from 'react';

import SimpleBackdrop from '../components/global/LoadingBackdrop';
import SEO from '../components/global/SEO';
import TcBoxContainer from '../components/shared/TcBox/TcBoxContainer';
import TcText from '../components/shared/TcText';
import TcAccountActivity from '../components/twitter/growth/accountActivity/TcAccountActivity';
import TcAudienceResponse from '../components/twitter/growth/audienceResponse/TcAudienceResponse';
import TcEngagementAccounts from '../components/twitter/growth/engagementAccounts/TcEngagementAccounts';
import TcYourAccountActivity from '../components/twitter/growth/yourAccountActivity/TcYourAccountActivity';
import { defaultLayout } from '../layouts/defaultLayout';
import { StorageService } from '../services/StorageService';
import useAppStore from '../store/useStore';
import { IDataTwitter } from '../utils/interfaces';
import { IUser } from '../utils/types';
import { withRoles } from './withRoles';

function Growth() {
  const user = StorageService.readLocalStorage<IUser>('user');

  const [data, setData] = useState<IDataTwitter>({
    activity: {
      posts: 0,
      replies: 0,
      retweets: 0,
      likes: 0,
      mentions: 0,
    },
    audience: {
      replies: 0,
      retweets: 0,
      likes: 0,
      mentions: 0,
    },
    engagement: {
      hqla: 0,
      hqhe: 0,
      lqla: 0,
      lqhe: 0,
    },
    account: {
      follower: 0,
      engagement: 0,
    },
  });

  const [loading, setLoading] = useState<boolean>(true);

  const {
    twitterActivityAccount,
    twitterAudienceAccount,
    twitterEngagementAccount,
    twitterAccount,
    refreshTwitterMetrics,
  } = useAppStore();

  const updateTwitterMetrics = () => {
    const lastTwitterMetricsDateStr = StorageService.readLocalStorage<string>(
      'lastTwitterMetricsRefreshDate',
      'string'
    );

    if (!lastTwitterMetricsDateStr) {
      return;
    }

    const lastTwitterMetricsDate = new Date(lastTwitterMetricsDateStr);

    const now = new Date();
    const lastRefresh = new Date(lastTwitterMetricsDate);

    const differenceInMillis = now.getTime() - lastRefresh.getTime();

    if (differenceInMillis >= 24 * 60 * 60 * 1000) {
      refreshTwitterMetrics();
      StorageService.writeLocalStorage(
        'lastTwitterMetricsRefreshDate',
        new Date().toISOString()
      );
    }
    return;
  };

  useEffect(() => {
    const fetchTwitterMetrics = async () => {
      const twitterId = user?.twitter?.twitterId;

      if (!twitterId) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const [
          activityResponse,
          audienceResponse,
          engagementResponse,
          accountResponse,
        ] = await Promise.all([
          twitterActivityAccount(),
          twitterAudienceAccount(),
          twitterEngagementAccount(),
          twitterAccount(),
        ]);

        setData({
          activity: activityResponse,
          audience: audienceResponse,
          engagement: engagementResponse,
          account: accountResponse,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    updateTwitterMetrics();
    fetchTwitterMetrics();
  }, []);

  if (loading) {
    return <SimpleBackdrop />;
  }

  return (
    <>
      <SEO titleTemplate='Twitter Growth' />
      <div className='container flex flex-col px-4 py-4 md:px-12'>
        <TcBoxContainer
          titleContainerChildren={
            <div className='bg-info px-10 py-3 text-white'>
              <TcText text='Twitter analysis' variant='h4' fontWeight='bold' />
            </div>
          }
          contentContainerChildren={
            <div className='space-y-8 px-4 pt-4 pb-[4rem] md:px-10'>
              <TcAccountActivity account={data.account} />
              <TcYourAccountActivity activity={data.activity} />
              <TcAudienceResponse audience={data.audience} />
              <TcEngagementAccounts engagement={data.engagement} />
            </div>
          }
        />
      </div>
    </>
  );
}

Growth.pageLayout = defaultLayout;

export default withRoles(Growth, ['view', 'admin']);
