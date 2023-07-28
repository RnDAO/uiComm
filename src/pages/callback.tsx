import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IUser, callbackUrlParams } from '../utils/types';
import SimpleBackdrop from '../components/global/LoadingBackdrop';
import { StorageService } from '../services/StorageService';
import { toast } from 'react-toastify';
import { BiError } from 'react-icons/bi';

export default function callback() {
  const router = useRouter();
  const [loading, toggleLoading] = useState<boolean>(true);

  const setUserDataAndRedirect = (
    params: callbackUrlParams,
    redirectUrl: string
  ) => {
    const userData = {
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
    };

    StorageService.writeLocalStorage('user', userData);
    router.push(redirectUrl);
  };

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

  const notify = () => {
    toast('Discord authentication faild.please try again.', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      closeButton: false,
      theme: 'light',
      icon: <BiError color="#FB3E56" size={40} />,
    });
  };

  const statusDecoder = (params: callbackUrlParams) => {
    const { statusCode } = params;
    let user = StorageService.readLocalStorage<IUser>('user');
    switch (statusCode) {
      case '490':
      case '491':
        notify();
        router.push(statusCode === '490' ? '/tryNow' : '/settings');
        break;

      case '501':
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
      case '504':
      case '601':
      case '603':
        setUserDataAndRedirect(params, '/');
        break;

      case '602':
        StorageService.removeLocalStorage('user');
        router.push('/tryNow');
        break;

      case '701':
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

      default:
        break;
    }
  };

  if (loading) {
    return <SimpleBackdrop />;
  }
}
