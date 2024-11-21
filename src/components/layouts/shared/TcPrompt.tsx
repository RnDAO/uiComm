import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import TcAlert from '../../shared/TcAlert';
import TcButton from '../../shared/TcButton';
import TcCollapse from '../../shared/TcCollapse';
import TcText from '../../shared/TcText';
import { useToken } from '../../../context/TokenContext';

function TcPrompt() {
  const router = useRouter();
  const { community, selectedPlatform } = useToken();

  const shouldShowPrompt = useMemo(() => {
    const currentRoute = router.pathname;
    const isExcludedRoute =
      currentRoute.startsWith('/cetric') ||
      currentRoute.startsWith('/community-settings');

    const hasNoPlatforms = community?.platforms.length === 0;

    const isSelectedPlatformInProgress = community?.platforms.some(
      (platform) =>
        platform?.id === selectedPlatform &&
        platform?.metadata?.isInProgress === true
    );

    return !isExcludedRoute && (hasNoPlatforms || isSelectedPlatformInProgress);
  }, [router.pathname, community?.platforms, selectedPlatform]);

  if (!shouldShowPrompt) {
    return null;
  }

  const selectedPlatformData = community?.platforms.find(
    (platform) => platform?.id === selectedPlatform
  );

  const promptData = selectedPlatformData
    ? selectedPlatformData.name === 'discord'
      ? {
          backgroundColor: 'bg-orange',
          message:
            'Data import is in progress. It might take up to 6 hours to finish the data import. Once it is done we will send you a message on Discord.',
        }
      : selectedPlatformData.name === 'discourse'
        ? {
            backgroundColor: 'bg-orange',
            message:
              'Data extraction is in progress for Discourse. This process may take more than 6 hours to complete.',
          }
        : {
            backgroundColor: 'bg-orange',
            message: `Data processing is in progress for ${selectedPlatformData.name}. Please check back later.`,
          }
    : {
        backgroundColor: 'bg-orange',
        message: (
          <span>
            To see the data, connect your community platforms. Check out our{' '}
            <a
              href='https://togethercrew.gitbook.io/onboarding/fundamentals/getting-set-up'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white underline'
            >
              docs
            </a>{' '}
            for a guide.
          </span>
        ),
        buttonText: 'Connect Platform',
        redirectRouteParams: '/?platform=Discord',
      };

  if (!promptData) {
    return null;
  }

  const { backgroundColor, message, buttonText, redirectRouteParams } =
    promptData;

  return (
    <TcCollapse
      in={true}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 9999999,
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
