import { init } from '@sentry/react-native';

// Only initialize Sentry in production builds, not in Expo Go
if (!__DEV__) {
  init({
    dsn: 'https://2f77c6b4748e9a863a593894e56f4cff@o4510118163906560.ingest.de.sentry.io/4510118172491856',
    debug: false,
    environment: 'production',
  });
}
