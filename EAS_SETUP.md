# EAS Build Setup Guide

This guide will help you set up automated builds for your Expo app using EAS (Expo Application Services) and GitHub Actions.

## Prerequisites

1. **Expo Account**: Create an account at [expo.dev](https://expo.dev)
2. **EAS CLI**: Install globally with `npm install -g eas-cli`
3. **GitHub Repository**: Your code should be in a GitHub repository
4. **Apple Developer Account** (for iOS): Required for App Store submissions
5. **Google Play Console Account** (for Android): Required for Play Store submissions

## Initial Setup

### 1. Login to EAS

```bash
cd apps/expo
eas login
```

### 2. Configure Your Project

Update the following in `apps/expo/app.config.js`:

```javascript
export default {
  expo: {
    // ... other config
    owner: 'your-expo-username', // Change this to your Expo username
    extra: {
      eas: {
        projectId: 'your-project-id', // This will be set automatically when you run eas build
      },
    },
  },
}
```

### 3. Create Your First Build

```bash
cd apps/expo
eas build --platform all --profile development
```

This will create your EAS project and set the project ID automatically.

## GitHub Secrets Setup

To enable automated builds, you need to add the following secrets to your GitHub repository:

### Required Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

#### 1. EXPO_TOKEN (Required)
- **Name**: `EXPO_TOKEN`
- **Value**: Your Expo access token
- **How to get**: Run `eas whoami` and copy the token, or get it from [expo.dev/accounts/settings](https://expo.dev/accounts/settings)

#### 2. APPLE_ID (For iOS submissions)
- **Name**: `APPLE_ID`
- **Value**: Your Apple ID email
- **Example**: `your-email@example.com`

#### 3. APPLE_ID_PASSWORD (For iOS submissions)
- **Name**: `APPLE_ID_PASSWORD`
- **Value**: Your Apple ID password or app-specific password
- **Note**: Use app-specific password for better security

#### 4. APPLE_TEAM_ID (For iOS submissions)
- **Name**: `APPLE_TEAM_ID`
- **Value**: Your Apple Developer Team ID
- **How to get**: From [developer.apple.com](https://developer.apple.com) → Account → Membership

#### 5. GOOGLE_SERVICE_ACCOUNT (For Android submissions)
- **Name**: `GOOGLE_SERVICE_ACCOUNT`
- **Value**: JSON content of your Google Service Account key
- **How to get**: 
  1. Go to [Google Cloud Console](https://console.cloud.google.com)
  2. Create a service account
  3. Download the JSON key file
  4. Copy the entire JSON content as the secret value

## Build Profiles Explained

### Development Profile
- **Purpose**: For testing and development
- **Distribution**: Internal (APK for Android, IPA for iOS)
- **Usage**: Install directly on your device for testing

### Staging Profile
- **Purpose**: For internal testing and beta releases
- **Distribution**: Internal (APK) or Store (for TestFlight/Internal Testing)
- **Usage**: Share with testers before production release

### Production Profile
- **Purpose**: For App Store and Google Play Store releases
- **Distribution**: Store (AAB for Android, IPA for iOS)
- **Usage**: Submit to app stores for review and release

## Automated Build Workflow

The GitHub Actions workflow (`.github/workflows/eas-build.yml`) will automatically:

1. **On every push to main branch**:
   - Build development versions (APK/IPA for testing)
   - Build staging versions (for beta testing)
   - Build production versions (for store submission)
   - Submit to app stores (if configured)

2. **On pull requests**:
   - Build development versions for testing

## Manual Build Commands

### Local Development Builds

```bash
# Build for Android development
cd apps/expo
eas build --platform android --profile development

# Build for iOS development
eas build --platform ios --profile development

# Build for both platforms
eas build --platform all --profile development
```

### Staging Builds

```bash
# Build staging version
eas build --platform all --profile staging

# Submit to TestFlight (iOS)
eas submit --platform ios --profile staging

# Submit to Google Play Internal Testing (Android)
eas submit --platform android --profile staging
```

### Production Builds

```bash
# Build production version
eas build --platform all --profile production

# Submit to App Store (iOS)
eas submit --platform ios --profile production

# Submit to Google Play Store (Android)
eas submit --platform android --profile production
```

## Installing Builds on Your Device

### Development Builds
1. After a build completes, you'll get a download link
2. Download the APK (Android) or IPA (iOS)
3. Install directly on your device

### iOS Installation
- For development builds: Install via Xcode or TestFlight
- For staging builds: Install via TestFlight
- For production builds: Download from App Store

### Android Installation
- For development builds: Install APK directly
- For staging builds: Install via Google Play Internal Testing
- For production builds: Download from Google Play Store

## Environment Variables

Update the environment variables in `apps/expo/eas.json` for each build profile:

```json
{
  "build": {
    "development": {
      "env": {
        "APP_ENV": "development",
        "EXPO_PUBLIC_URL": "https://your-app.vercel.app",
        "EXPO_PUBLIC_SUPABASE_URL": "https://your-project.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "your-anon-key"
      }
    },
    "staging": {
      "env": {
        "APP_ENV": "staging",
        "EXPO_PUBLIC_URL": "https://your-staging-app.vercel.app",
        "EXPO_PUBLIC_SUPABASE_URL": "https://your-project.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "your-anon-key"
      }
    },
    "production": {
      "env": {
        "APP_ENV": "production",
        "EXPO_PUBLIC_URL": "https://your-production-app.vercel.app",
        "EXPO_PUBLIC_SUPABASE_URL": "https://your-project.supabase.co",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "your-anon-key"
      }
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Build fails with "EXPO_TOKEN not found"**
   - Make sure you've added the `EXPO_TOKEN` secret to your GitHub repository

2. **iOS submission fails**
   - Verify your Apple ID credentials are correct
   - Check that your Apple Developer account is active
   - Ensure your app is properly configured in App Store Connect

3. **Android submission fails**
   - Verify your Google Service Account has the correct permissions
   - Check that your app is properly configured in Google Play Console

4. **Build takes too long**
   - Development builds are typically faster than production builds
   - Consider using `--local` flag for faster local builds (requires local development environment)

### Getting Help

- [EAS Documentation](https://docs.expo.dev/eas/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Expo Discord](https://discord.gg/expo)

## Next Steps

1. Set up your GitHub secrets
2. Update your app configuration
3. Push your first commit to trigger the automated build
4. Install the development build on your device
5. Configure app store submissions when ready for release
