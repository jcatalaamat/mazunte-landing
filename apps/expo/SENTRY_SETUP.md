# Sentry Setup for EAS Builds

## ✅ Fixes Completed

All Sentry integration issues have been fixed! The following changes were made:

- ✅ Updated @sentry/react-native to v6.14.0 (Xcode 16.3 compatible)
- ✅ Added Sentry Expo native plugin to app.config.js
- ✅ Fixed sentry.config.js with proper initialization
- ✅ Fixed import order in index.js (after React Native polyfills)
- ✅ Added Sentry ErrorBoundary to _layout.tsx
- ✅ Fixed SplashScreen import issues
- ✅ Fixed Xcode 16.3 C++ compilation error (std::allocator<const T> issue)

## 🚀 Next Steps: Build a New EAS Development Build

**IMPORTANT:** The old build has the broken Sentry configuration. You must build a new version with the fixes.

### Quick Build Command

For iOS device:
```bash
cd apps/expo
yarn eas:build:dev:device:ios
```

For iOS simulator:
```bash
yarn eas:build:dev:simulator:ios
```

For Android:
```bash
yarn eas:build:dev:device:android
```

## Overview

This app is configured to automatically upload source maps to Sentry during EAS builds. This enables proper crash symbolication and readable stack traces.

## Required: Set up Sentry Auth Token

To enable automatic source map uploads during EAS builds, you need to add your Sentry auth token as an EAS secret.

### Step 1: Get your Sentry Auth Token

1. Log in to [Sentry](https://sentry.io/)
2. Go to **Settings** → **Account** → **API** → **Auth Tokens**
3. Click **Create New Token**
4. Configure the token:
   - **Name**: `EAS Build Token` (or any name you prefer)
   - **Scopes**: Select at minimum:
     - `project:read`
     - `project:releases`
     - `org:read`
   - Click **Create Token**
5. **Important**: Copy the token immediately - you won't be able to see it again!

### Step 2: Add the token to EAS Secrets

Run the following command in your terminal:

```bash
cd apps/expo
eas secret:create --scope project --name SENTRY_AUTH_TOKEN --value YOUR_TOKEN_HERE
```

Replace `YOUR_TOKEN_HERE` with the token you copied from Sentry.

### Step 3: Verify the secret was added

```bash
eas secret:list
```

You should see `SENTRY_AUTH_TOKEN` in the list.

## Testing Sentry Integration

### Local Development

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Run the app:
   ```bash
   yarn ios
   # or
   yarn android
   ```

3. You should see Sentry initialization logs in the Metro console:
   ```
   Sentry initialized successfully
   Environment: development
   DSN configured: true
   ```

### In the App

1. Go to **Settings** → **General Settings**
2. Tap **Test Sentry Crash**
3. Check your Sentry dashboard at: https://sentry.io/organizations/inner-ascend/projects/react-native/

### EAS Builds

After setting up the auth token:

1. Build for development:
   ```bash
   yarn eas:build:dev:ios
   # or
   yarn eas:build:dev:android
   ```

2. During the build, you should see output indicating source maps are being uploaded to Sentry

3. Install the build on your device and test crashes - they should now appear in Sentry with proper symbolication

## Configuration Details

### Sentry Project Info

- **Organization**: inner-ascend
- **Project**: react-native
- **DSN**: Already configured in `sentry.config.js`

### Files Modified

- `package.json` - Updated Sentry SDK version
- `app.config.js` - Added Sentry Expo plugin
- `sentry.config.js` - Enhanced initialization with better options
- `metro.config.js` - Added Sentry Metro plugin for source maps
- `app/_layout.tsx` - Added Sentry ErrorBoundary wrapper

## Troubleshooting

### Source maps not uploading

1. Verify the secret is set:
   ```bash
   eas secret:list
   ```

2. Check build logs for Sentry-related errors

3. Ensure your Sentry auth token has the correct scopes

### Crashes not appearing in Sentry

1. Check that Sentry is initialized by looking at console logs
2. Verify your DSN is correct in `sentry.config.js`
3. Make sure you're checking the correct Sentry project
4. In development builds, crashes should appear immediately

### Build errors

If you get errors during the build related to Sentry:

1. Make sure you've run `yarn install` after updating packages
2. Clear Metro cache: `yarn start --reset-cache`
3. For iOS: `cd ios && pod install && cd ..`

## Environment Configuration

Sentry is enabled in all environments:
- **Development**: 100% of events captured, debug mode enabled
- **Staging**: 20% of performance events (configurable in `sentry.config.js`)
- **Production**: 20% of performance events (configurable in `sentry.config.js`)

To adjust these settings, edit `apps/expo/sentry.config.js`.
