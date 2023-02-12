import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { callbackUrlParams } from '../utils/types';
import SimpleBackdrop from '../components/global/LoadingBackdrop';
import { StorageService } from '../services/StorageService';

export default function callback() {
  const router = useRouter();
  const [loading, toggleLoading] = useState<boolean>(true);
  if (typeof window !== 'undefined') {
    useEffect(() => {
      if (Object.keys(router?.query) && Object.keys(router?.query).length > 0) {
        const routerParams: callbackUrlParams = Object.assign(router.query);

        statusDecoder(routerParams);
      }
    }, [router]);
  }

  const statusDecoder = (params: callbackUrlParams) => {
    const { statusCode } = params;
    console.log({ statusCode });
    switch (statusCode) {
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
          pathname: '/dashboard',
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
          pathname: '/dashboard',
        });
        break;

      default:
        break;
    }
    console.log({ params });
  };

  if (loading) {
    return <SimpleBackdrop />;
  }
}
