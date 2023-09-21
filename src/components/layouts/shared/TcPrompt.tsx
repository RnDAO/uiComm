import React from 'react';
import TcAlert from '../../shared/TcAlert';
import TcButton from '../../shared/TcButton';
import TcCollapse from '../../shared/TcCollapse';
import TcText from '../../shared/TcText';
import { useRouter } from 'next/router';

/**
 * TcPrompt Component
 *
 * This component renders different prompts based on the current route.
 * The main purposes of the prompts are:
 * 1. Instructing the user to connect their community platforms.
 * 2. Asking users to connect their community's Twitter account.
 */
function TcPrompt() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const routesToShow = ['/growth', '/community-settings'];

  let promptData;

  // Check if the route is one of the routes we want to show a specific prompt for
  if (!routesToShow.includes(currentRoute)) {
    promptData = {
      backgroundColor: 'bg-orange',
      message: 'To see the data, connect your community platforms.',
      buttonText: 'Connect Community',
      redirectRouteParams: '/?platform=Discord',
    };
  } else if (currentRoute === '/growth') {
    promptData = {
      backgroundColor: 'bg-secondary',
      message: 'To see the data, connect your community’s Twitter account',
      buttonText: 'Connect Twitter account',
      redirectRouteParams: '/?platform=Twitter',
    };
  } else {
    // If the route does not match any of the specified routes, return null to render nothing
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
