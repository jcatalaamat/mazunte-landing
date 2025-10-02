require('dotenv').config({ path: '../../.env' })

export default {
  expo: {
    name: 'Mazunte Connect',
    slug: 'mazunte-connect',
    jsEngine: 'hermes',
    scheme: 'mazunteconnect',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      contentFit: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: 'https://u.expo.dev/6ffa235a-1c28-44f3-a4b7-06858af980a8',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.mazunte.connect',
      buildNumber: '6',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      softwareKeyboardLayoutMode: 'pan',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.mazunte.connect',
      permissions: ['android.permission.RECORD_AUDIO'],
      versionCode: 3,
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      [
        'expo-notifications',
        {
          icon: './assets/icon.png',
          color: '#ffffff',
        },
      ],
      [
        'expo-image-picker',
        {
          photosPermission: 'The app accesses your photos to let you share them with your friends.',
        },
      ],
      // COMMENTED OUT: Google Sign-In functionality
      // [
      //   '@react-native-google-signin/google-signin',
      //   {
      //     // https://react-native-google-signin.github.io/docs/setting-up/expo
      //     iosUrlScheme: process.env.GOOGLE_IOS_SCHEME || 'com.googleusercontent.apps.571497840649-tqcs8mtqtnrkorj0iagsktomose67k5q',
      //   },
      // ],
      'expo-apple-authentication',
      'expo-router',
      'expo-build-properties',
      'expo-font',
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission: 'Allow Mazunte Connect to use your location to show nearby events and places.',
        },
      ],
      [
        '@sentry/react-native/expo',
        {
          organization: 'inner-ascend',
          project: 'react-native',
          url: 'https://sentry.io/',
        },
      ],
    ],
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '6ffa235a-1c28-44f3-a4b7-06858af980a8',
      },
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    owner: process.env.EXPO_OWNER || 'inner-ascend',
  },
}
