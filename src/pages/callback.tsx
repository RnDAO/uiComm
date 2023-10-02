import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IUser, callbackUrlParams } from '../utils/types';
import SimpleBackdrop from '../components/global/LoadingBackdrop';
import { StorageService } from '../services/StorageService';
import { toast } from 'react-toastify';
import { BiError } from 'react-icons/bi';
import useAppStore from '../store/useStore';

export default function callback() {
  const router = useRouter();
  const { getUserInfo, refreshTwitterMetrics } = useAppStore();
  const [loading, toggleLoading] = useState<boolean>(true);
  if (typeof window !== 'undefined') {
    useEffect(() => {
      if (
        router?.query &&
        Object.keys(router?.query) &&
        Object.keys(router?.query).length > 0
      ) {
        const routerParams: callbackUrlParams = Object.assign(router.query);

        statusDecoder(routerParams);
      } else {
        router.push('/tryNow');
      }
    }, [router]);
  }

  interface NotifyOptions {
    message: string;
    position?:
      | 'top-right'
      | 'top-center'
      | 'top-left'
      | 'bottom-right'
      | 'bottom-center'
      | 'bottom-left'
      | 'top-right';
    autoClose?: number | false;
    iconColor?: string;
    iconSize?: number;
  }

  const notify = ({
    message,
    position = 'bottom-left',
    autoClose = 3000,
    iconColor = '#FB3E56',
    iconSize = 40,
  }: NotifyOptions) => {
    toast(message, {
      position,
      autoClose,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      closeButton: false,
      theme: 'light',
      icon: <BiError color={iconColor} size={iconSize} />,
    });
  };

  const statusDecoder = (params: callbackUrlParams) => {
    const { statusCode } = params;
    let user = StorageService.readLocalStorage<IUser>('user');
    switch (statusCode) {
      case '490':
        notify({ message: 'Discord authentication failed. Please try again.' });
        router.push('/tryNow');
        break;

      case '491':
        notify({ message: 'Discord authentication failed. Please try again.' });
        router.push('/settings');
        break;

      case '501':
        router.push({
          pathname: '/tryNow',
          query: {
            statusCode: params.statusCode,
            accessToken: params.accessToken,
            accessExp: params.accessExp,
            refreshExp: params.refreshExp,
            refreshToken: params.refreshToken,
            guildId: params.guildId,
            guildName: params.guildName,
          },
        });
        break;

      case '502':
        router.push({
          pathname: '/tryNow',
          query: {
            statusCode: params.statusCode,
            accessToken: params.accessToken,
            accessExp: params.accessExp,
            refreshExp: params.refreshExp,
            refreshToken: params.refreshToken,
            guildId: params.guildId,
            guildName: params.guildName,
          },
        });
        break;

      case '503':
        StorageService.writeLocalStorage('user', {
          guild: {
            guildId: params.guildId,
            guildName: params.guildName,
          },
          token: {
            accessToken: params.accessToken,
            accessExp: params.accessExp,
            refreshToken: params.refreshToken,
            refreshExp: params.refreshExp,
          },
        });
        router.push({
          pathname: '/',
        });
        break;

      case '504':
        StorageService.writeLocalStorage('user', {
          guild: {
            guildId: params.guildId,
            guildName: params.guildName,
          },
          token: {
            accessToken: params.accessToken,
            accessExp: params.accessExp,
            refreshToken: params.refreshToken,
            refreshExp: params.refreshExp,
          },
        });
        router.push({
          pathname: '/',
        });
        break;

      case '601':
        StorageService.writeLocalStorage('user', {
          guild: {
            guildId: params.guildId,
            guildName: params.guildName,
          },
          token: {
            accessToken: params.accessToken,
            accessExp: params.accessExp,
            refreshToken: params.refreshToken,
            refreshExp: params.refreshExp,
          },
        });
        router.push('/');
        break;

      case '602':
        StorageService.removeLocalStorage('user');
        router.push('/tryNow');
        break;

      case '603':
        StorageService.writeLocalStorage('user', {
          guild: {
            guildId: params.guildId,
            guildName: params.guildName,
          },
          token: {
            accessToken: params.accessToken,
            accessExp: params.accessExp,
            refreshToken: params.refreshToken,
            refreshExp: params.refreshExp,
          },
        });
        router.push('/');
        break;

      case '701':
        if (user) {
          StorageService.writeLocalStorage('user', {
            guild: {
              guildId: params.guildId,
              guildName: params.guildName,
            },
            token: user.token,
          });
          router.push({
            pathname: '/settings',
            query: {
              guildId: params.guildId,
              guildName: params.guildName,
              isSuccessful: true,
            },
          });
        }
        break;

      case '702':
        if (user) {
          StorageService.writeLocalStorage('user', {
            guild: {
              guildId: params.guildId,
              guildName: params.guildName,
            },
            token: user.token,
          });
          router.push({
            pathname: '/settings',
            query: {
              guildId: params.guildId,
              guildName: params.guildName,
              isSuccessful: true,
            },
          });
        }
        break;

      case '801':
        if (user) {
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

            StorageService.writeLocalStorage(
              'lastTwitterMetricsRefreshDate',
              new Date().toISOString()
            );

            refreshTwitterMetrics();
          };
          fetchUserInfo();
          router.push({
            pathname: '/growth',
          });
        }
        break;
      case '890':
        notify({ message: 'Twitter authorization failed. Please try again.' });
        router.push({
          pathname: '/growth',
        });
        break;

      default:
        break;
    }
  };

  if (loading) {
    return <SimpleBackdrop />;
  }
}
