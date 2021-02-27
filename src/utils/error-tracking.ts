import { init, setContext } from '@sentry/node';

export = function ERROR_LOGGING() {
  init({
    dsn: process.env.ERROR_KEY,
    release: 'dashty-discord@1.0.0',
    environment: process.env.TEST === 'true' ? 'testing' : 'production',
    tracesSampleRate: 1.0,
  });

  setContext('runtime', {
    name: process.env.TEST === 'true' ? 'Dashty-Test' : 'Dashty-Production',
    version: '1.0.0',
    description: 'Dashty Discord bot',
  });
};
