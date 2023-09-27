import React, { useEffect, useState } from 'react';
import Sidebar from '../components/layouts/Sidebar';
import SidebarXs from '../components/layouts/xs/SidebarXs';
import useAppStore from '../store/useStore';
import { StorageService } from '../services/StorageService';
import { IUser } from '../utils/types';
import TcAlert from '../components/shared/TcAlert';
import TcButton from '../components/shared/TcButton';
import TcCollapse from '../components/shared/TcCollapse';
import TcText from '../components/shared/TcText';
import TcDialog from '../components/shared/TcDialog';
import { IoCloseSharp } from 'react-icons/io5';
import TcLink from '../components/shared/TcLink';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { IDecodedToken } from '../utils/interfaces';

type IDefaultLayoutProps = {
  children: React.ReactNode;
};

export const defaultLayout = ({ children }: IDefaultLayoutProps) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const { getGuilds, getGuildInfoByDiscord, authorizeTwitter, getUserInfo } =
    useAppStore();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const user = StorageService.readLocalStorage<IUser>('user');

  useEffect(() => {
    if (user) {
      const { guildId } = user.guild;
      getGuilds();
      if (guildId) {
        getGuildInfoByDiscord(guildId);
      }
      const fetchUserInfo = async () => {
        const {
          twitterConnectedAt,
          twitterId,
          twitterProfileImageUrl,
          twitterUsername,
        } = await getUserInfo();

        StorageService.updateLocalStorageWithObject('user', 'twitter', {
          twitterConnectedAt,
          twitterId,
          twitterProfileImageUrl,
          twitterUsername,
        });
      };
      fetchUserInfo();
    }
  }, []);

  const handleAuthorizeTwitter = () => {
    const decodedToken = user?.token?.accessToken
      ? jwt_decode<IDecodedToken>(user.token.accessToken)
      : null;

    authorizeTwitter(decodedToken?.sub);
  };

  const isAllTwitterPropertiesNull =
    user &&
    user.twitter &&
    Object.values(user.twitter).every((value) => value == null);

  return (
    <>
      {currentRoute === '/growth' && isAllTwitterPropertiesNull && (
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
                    variant={'button'}
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
                <TcButton
                  text={'Connect Twitter account'}
                  variant="contained"
                  onClick={() => handleAuthorizeTwitter()}
                />
              </div>
            </div>
          </TcDialog>
        </>
      )}

      <div className="flex flex-col md:flex-row justify-between w-full">
        <Sidebar />
        <SidebarXs />
        <main className="md:ml-[100px] xl:ml-[150px] flex-1">{children}</main>
      </div>
    </>
  );
};
