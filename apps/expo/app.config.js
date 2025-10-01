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
      url: 'https://u.expo.dev/your-project-id',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.mazunte.connect',
      buildNumber: '6',
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
    ],
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'b5f02af2-6475-4d9e-81b3-664f89564580',
      },
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    owner: 'tamagui-team',
  },
}
