import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import TcAlert from '../../shared/TcAlert';
import TcButton from '../../shared/TcButton';
import TcCollapse from '../../shared/TcCollapse';
import TcDialog from '../../shared/TcDialog';
import TcLink from '../../shared/TcLink';
import TcText from '../../shared/TcText';
import { useRouter } from 'next/router';

function TcPrompt() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const routesToShow = ['/growth', '/community-settings'];

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  if (!routesToShow.some((route) => currentRoute.includes(route)))
    return (
      <>
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
          children={
            <TcAlert
              variant="filled"
              className="bg-orange"
              icon={false}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingY: 0,
              }}
            >
              <div className="md:space-x-3 flex flex-col md:flex-row items-center justify-center p-0">
                <TcText
                  text="To see the data, connect your community platforms."
                  color={'white'}
                  variant={'subtitle1'}
                />
                <TcButton
                  text={'Connect Community'}
                  size="small"
                  variant="outlined"
                  onClick={() => router.push('/community-settings')}
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
          }
        />
        <TcDialog
          open={openDialog}
          fullScreen={false}
          sx={{
            '& .MuiDialog-container': {
              '& .MuiPaper-root': {
                width: '100%',
                maxWidth: '580px',
                borderRadius: '10px',
              },
            },
          }}
        >
          <div className="block p-2">
            <IoCloseSharp
              size={36}
              onClick={() => setOpenDialog(false)}
              className="float-right cursor-pointer"
            />
          </div>
          <div className="md:w-5/6 mx-auto px-6 md:px-8 pb-8 space-y-4">
            <TcText
              text={'How to connect your community’s Twitter account'}
              variant="h6"
              fontWeight="extraBold"
              className="text-left md:text-center"
            />
            <ol className="space-y-5">
              <li>
                <TcText
                  text={
                    <p>
                      1 / Go to{' '}
                      <TcLink
                        className="text-secondary underline cursor-pointer font-bold"
                        to={'https://twitter.com/home?lang=en'}
                        target="_blank"
                      >
                        Twitter
                      </TcLink>
                      . Ensure you’re connected with your{' '}
                      <b>community’s Twitter account</b> and leave this window
                      open.
                    </p>
                  }
                  variant={'body2'}
                />
              </li>
              <li>
                <TcText
                  text={
                    <p>
                      2 / Once you are connected, click on the button below
                      “Connect Twitter account” and approve the access.
                    </p>
                  }
                  variant={'body2'}
                />
              </li>
            </ol>
            <div className="flex justify-center py-4">
              <TcButton text={'Connect Twitter account'} variant="contained" />
            </div>{' '}
          </div>
        </TcDialog>
      </>
    );
  else if (currentRoute === '/growth')
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
        children={
          <TcAlert
            variant="filled"
            className="bg-secondary"
            icon={false}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingY: 0,
            }}
          >
            <div className="md:space-x-3 flex flex-col md:flex-row items-center justify-center p-0">
              <TcText
                text={
                  'To see the data, connect your community’s Twitter account'
                }
                color={'white'}
                variant={'subtitle1'}
              />
              <TcButton
                text={'Connect Twitter account'}
                size="small"
                variant="outlined"
                onClick={() => setOpenDialog(true)}
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
        }
      />
    );
  else return null;
}

export default TcPrompt;
