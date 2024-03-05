import * as amplitude from '@amplitude/analytics-browser';
import { useEffect } from 'react';

import { conf } from '../../configs';
import { setAmplitudeUserIdFromToken } from '../../helpers/amplitudeHelper';

const AmplitudeAnalytics = () => {
  useEffect(() => {
    const AMPLITUDEANALYTICS_TOKEN: string | undefined =
      conf.AMPLITUDEANALYTICS_TOKEN;

    if (process.env.NODE_ENV === 'production' && AMPLITUDEANALYTICS_TOKEN) {
      amplitude.init(AMPLITUDEANALYTICS_TOKEN, undefined, {
        defaultTracking: {
          sessions: true,
          pageViews: true,
          formInteractions: true,
          fileDownloads: true,
        },
      });
      setAmplitudeUserIdFromToken();
    }
  }, []);

  return null;
};

export default AmplitudeAnalytics;
