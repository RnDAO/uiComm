import React, { useEffect, useMemo } from 'react';
import TcAlert from '../../shared/TcAlert';
import TcButton from '../../shared/TcButton';
import TcCollapse from '../../shared/TcCollapse';
import TcText from '../../shared/TcText';
import { useRouter } from 'next/router';
import { StorageService } from '../../../services/StorageService';
import { IDiscordModifiedCommunity } from '../../../utils/interfaces';

function TcPrompt() {
  const router = useRouter();
  const community =
    StorageService.readLocalStorage<IDiscordModifiedCommunity>('community');
  const shouldShowPrompt = useMemo(() => {
    const currentRoute = router.pathname;
    const isExcludedRoute =
      currentRoute.startsWith('/cetric') ||
      currentRoute.startsWith('/community-settings');
    const hasNoPlatforms = community?.platforms.length === 0;

    return !isExcludedRoute && hasNoPlatforms;
  }, [router.pathname, community?.platforms]);

  if (!shouldShowPrompt) {
    return null;
  }

  const promptData = {
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
        variant="filled"
        className={backgroundColor}
        icon={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingY: 0,
        }}
      >
        <div className="md:space-x-3 flex flex-col md:flex-row items-center justify-center p-0">
          <TcText text={message} color={'white'} variant={'subtitle1'} />
          <TcButton
            text={buttonText}
            size="small"
            variant="outlined"
            onClick={() =>
              router.push(`/community-settings${redirectRouteParams}`)
            }
            sx={{
              border: '1px solid white',
              color: 'white',
              paddingY: '0',
              '&:hover': {
                background: 'white',
                border: '1px solid white',
                color: 'black',
              },
            }}
          />
        </div>
      </TcAlert>
    </TcCollapse>
  );
}

export default TcPrompt;
