import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import TcAlert from '../../shared/TcAlert';
import TcButton from '../../shared/TcButton';
import TcCollapse from '../../shared/TcCollapse';
import TcText from '../../shared/TcText';
import { useToken } from '../../../context/TokenContext';

function TcPrompt() {
  const router = useRouter();
  const { community } = useToken();

  const shouldShowPrompt = useMemo(() => {
    const currentRoute = router.pathname;
    const isExcludedRoute =
      currentRoute.startsWith('/cetric') ||
      currentRoute.startsWith('/community-settings');

    const hasNoPlatforms = community?.platforms.length === 0;

    const isPlatformInProgress = community?.platforms.some(
      (platform) => platform?.metadata.isInProgress === true
    );

    return !isExcludedRoute && (hasNoPlatforms || isPlatformInProgress);
  }, [router.pathname, community?.platforms]);

  if (!shouldShowPrompt) {
    return null;
  }

  const isPlatformInProgress = community?.platforms.some(
    (platform) => platform?.metadata?.isInProgress === true
  );

  const promptData = isPlatformInProgress
    ? {
        backgroundColor: 'bg-orange',
        message:
          'Data import is in progress. It might take up to 6 hours to finish the data import. Once it is done we will send you a message on Discord.',
      }
    : {
        backgroundColor: 'bg-orange',
        message: 'To see the data, connect your community platforms.',
        buttonText: 'Connect Platform',
        redirectRouteParams: '/?platform=Discord',
      };

  const { backgroundColor, message, buttonText, redirectRouteParams } =
    promptData;

  return (
    <TcCollapse
      in={true}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        '&:MuiPaper-root': {
          display: 'flex',
          justifyContent: 'center',
        },
      }}
    >
      <TcAlert
        variant='filled'
        className={backgroundColor}
        icon={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingY: 0,
        }}
      >
        <div className='flex flex-col items-center justify-center p-0 md:flex-row md:space-x-3'>
          <TcText text={message} color='white' variant='subtitle1' />
          {buttonText && (
            <TcButton
              text={buttonText}
              size='small'
              variant='outlined'
              onClick={() =>
                router.push(`/community-settings${redirectRouteParams}`)
              }
              sx={{
                border: '1px solid white',
                color: 'white',
                py: 0,
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: 'white',
                  color: 'black',
                },
              }}
            />
          )}
        </div>
      </TcAlert>
    </TcCollapse>
  );
}

export default TcPrompt;
