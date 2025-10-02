import { init } from '@sentry/react-native';

init({
  dsn: 'https://2f77c6b4748e9a863a593894e56f4cff@o4510118163906560.ingest.de.sentry.io/4510118172491856',
  debug: __DEV__, // Enable debug mode in development
  environment: __DEV__ ? 'development' : 'production',
  // Enable Sentry in both development and production
  enabled: true,
});
