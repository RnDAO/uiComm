// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { conf } from './src/configs';

const SENTRY_DSN = conf.SENTRY_DSN;
const ENVIRONMENT = process.env.NODE_ENV || 'staging';

Sentry.init({
  dsn: SENTRY_DSN,
  environment: ENVIRONMENT,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: ENVIRONMENT === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: ENVIRONMENT == 'production',
});
