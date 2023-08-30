import * as amplitude from '@amplitude/analytics-browser';
import jwt_decode from 'jwt-decode';
import { StorageService } from '../services/StorageService';
import { IDecodedToken, ITrackEventParams } from '../utils/interfaces';
import { IUser } from '../utils/types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';

export const setAmplitudeUserIdFromToken = () => {
  const user: IUser | undefined =
    StorageService.readLocalStorage<IUser>('user');

  const decodedToken = user?.token?.accessToken
    ? jwt_decode<IDecodedToken>(user.token.accessToken)
    : null;

  if (decodedToken?.sub) {
    amplitude.setUserId(decodedToken.sub);
  }
};

export const trackAmplitudeEvent = ({
  eventType,
  eventProperties,
  callback,
}: ITrackEventParams) => {
  amplitude
    .track({
      event_type: eventType,
      event_properties: eventProperties,
    })
    .promise.then(function (result) {
      if (callback) {
        callback({
          event: result.event,
          code: result.code,
          message: result.message,
        });
      }
    });
};

export function usePageViewTracking() {
  const router = useRouter();

  useEffect(() => {
    function trackPageView(url: string) {
      amplitude.logEvent('PAGE_VIEW', { path: url });
    }

    // Track the current page when the component mounts
    trackPageView(window.location.pathname);

    // Track subsequent page views on route change
    router.events.on('routeChangeComplete', trackPageView);

    // Cleanup event listener on unmount
    return () => {
      router.events.off('routeChangeComplete', trackPageView);
    };
  }, []);
}
