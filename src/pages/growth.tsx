import React, { useEffect, useState } from 'react';
import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import TcText from '../components/shared/TcText';
import TcBoxContainer from '../components/shared/TcBox/TcBoxContainer';
import TcAccountActivity from '../components/twitter/growth/accountActivity/TcAccountActivity';
import TcYourAccountActivity from '../components/twitter/growth/yourAccountActivity/TcYourAccountActivity';
import TcAudienceResponse from '../components/twitter/growth/audienceResponse/TcAudienceResponse';
import TcEngagementAccounts from '../components/twitter/growth/engagementAccounts/TcEngagementAccounts';
import useAppStore from '../store/useStore';

function growth() {
  const [data, setData] = useState({
    activity: null,
    audience: null,
    engagement: null,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const {
    twitterActivityAccount,
    twitterAudienceAccount,
    twitterEngagementAccount,
  } = useAppStore();

  useEffect(() => {
    const twitterId = 'YOUR_TWITTER_ID_HERE';

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
        setError(err);
        setLoading(false);
      });
  }, []);

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
              <TcAccountActivity />
              <TcYourAccountActivity />
              <TcAudienceResponse />
              <TcEngagementAccounts />
            </div>
          }
        />
      </div>
    </>
  );
}

growth.pageLayout = defaultLayout;

export default growth;
