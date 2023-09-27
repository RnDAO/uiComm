import React, { useEffect, useState } from 'react';
import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import TcText from '../components/shared/TcText';
import TcBoxContainer from '../components/shared/TcBox/TcBoxContainer';
import TcYourAccountActivity from '../components/twitter/growth/yourAccountActivity/TcYourAccountActivity';
import TcAudienceResponse from '../components/twitter/growth/audienceResponse/TcAudienceResponse';
import TcEngagementAccounts from '../components/twitter/growth/engagementAccounts/TcEngagementAccounts';
import useAppStore from '../store/useStore';
import { StorageService } from '../services/StorageService';
import { IUser } from '../utils/types';
import SimpleBackdrop from '../components/global/LoadingBackdrop';
import { IDataTwitter } from '../utils/interfaces';

function growth() {
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
  });

  const [loading, setLoading] = useState(false);

  const {
    twitterActivityAccount,
    twitterAudienceAccount,
    twitterEngagementAccount,
  } = useAppStore();

  useEffect(() => {
    const twitterId = user?.twitter?.twitterId;
    if (twitterId) {
      setLoading(true);
      Promise.all([
        twitterActivityAccount(twitterId),
        twitterAudienceAccount(twitterId),
        twitterEngagementAccount(twitterId),
      ])
        .then(([activityResponse, audienceResponse, engagementResponse]) => {
          setData({
            activity: activityResponse.data,
            audience: audienceResponse.data,
            engagement: engagementResponse.data,
          });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <SimpleBackdrop />;
  }

  return (
    <>
      <SEO titleTemplate="Twitter Growth" />
      <div className="flex flex-col container px-4 md:px-12 py-4">
        <TcBoxContainer
          titleContainerChildren={
            <div className="bg-info text-white px-10 py-3">
              <TcText
                text={'Twitter analysis'}
                variant={'h4'}
                fontWeight="bold"
              />
            </div>
          }
          contentContainerChildren={
            <div className="px-4 md:px-10 pt-4 pb-[4rem] space-y-8">
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

growth.pageLayout = defaultLayout;

export default growth;
