# Automated Build Setup for Mazunte Connect

This project is now configured for automated builds using EAS (Expo Application Services) and GitHub Actions. Every commit to the main branch will automatically trigger builds for development, staging, and production environments.

## 🚀 Quick Start

### 1. Set up your Expo account and project

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Navigate to the expo app
cd apps/expo

# Login to Expo
eas login

# Create your first build (this will set up the project)
eas build --platform all --profile development
```

### 2. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add these required secrets:

- **EXPO_TOKEN**: Your Expo access token (get from `eas whoami` or [expo.dev/accounts/settings](https://expo.dev/accounts/settings))

For app store submissions, also add:
- **APPLE_ID**: Your Apple ID email
- **APPLE_ID_PASSWORD**: Your Apple ID password or app-specific password
- **APPLE_TEAM_ID**: Your Apple Developer Team ID
- **GOOGLE_SERVICE_ACCOUNT**: JSON content of your Google Service Account key

### 3. Update your app configuration

Update `apps/expo/app.config.js`:

```javascript
export default {
  expo: {
    // ... other config
    owner: 'your-expo-username', // Change this to your Expo username
    extra: {
      eas: {
        projectId: 'your-project-id', // This will be set automatically
      },
    },
  },
}
```

## 📱 Build Profiles

### Development
- **Purpose**: For testing and development
- **Distribution**: Internal (APK for Android, IPA for iOS)
- **Usage**: Install directly on your device

### Staging
- **Purpose**: For beta testing and internal releases
- **Distribution**: Internal (APK) or Store (for TestFlight/Internal Testing)
- **Usage**: Share with testers before production

### Production
- **Purpose**: For App Store and Google Play Store releases
- **Distribution**: Store (AAB for Android, IPA for iOS)
- **Usage**: Submit to app stores for review and release

## 🔄 Automated Workflow

The GitHub Actions workflow (`.github/workflows/eas-build.yml`) automatically:

1. **On every push to main branch**:
   - ✅ Builds development versions (APK/IPA for testing)
   - ✅ Builds staging versions (for beta testing)
   - ✅ Builds production versions (for store submission)
   - ✅ Submits to app stores (if configured)

2. **On pull requests**:
   - ✅ Builds development versions for testing

## 🛠️ Manual Build Commands

### Using the provided scripts:

```bash
# Development builds (for testing)
yarn build:dev

# Staging builds (for beta testing)
yarn build:staging

# Production builds (for store submission)
yarn build:production

# Submit staging builds to TestFlight/Google Play Internal Testing
yarn submit:staging

# Submit production builds to App Store/Google Play Store
yarn submit:production
```

### Using EAS CLI directly:

```bash
cd apps/expo

# Development builds
eas build --platform all --profile development

# Staging builds
eas build --platform all --profile staging

# Production builds
eas build --platform all --profile production

# Submit to stores
eas submit --platform all --profile staging
eas submit --platform all --profile production
```

## 📥 Installing Builds

### Development Builds
1. After a build completes, you'll get a download link via email
2. Download the APK (Android) or IPA (iOS)
3. Install directly on your device

### iOS Installation
- **Development**: Install via Xcode or direct installation
- **Staging**: Install via TestFlight
- **Production**: Download from App Store

### Android Installation
- **Development**: Install APK directly
- **Staging**: Install via Google Play Internal Testing
- **Production**: Download from Google Play Store

## 🔧 Environment Variables

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

## 🚨 Troubleshooting

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
   - Consider using `--local` flag for faster local builds

### Getting Help

- [EAS Documentation](https://docs.expo.dev/eas/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Expo Discord](https://discord.gg/expo)

## 📋 Next Steps

1. ✅ Set up your GitHub secrets
2. ✅ Update your app configuration
3. ✅ Push your first commit to trigger the automated build
4. ✅ Install the development build on your device
5. ✅ Configure app store submissions when ready for release

## 🎯 Workflow Summary

1. **Make changes** to your code
2. **Commit and push** to the main branch
3. **GitHub Actions** automatically triggers builds
4. **Download** development builds for testing
5. **Submit** staging builds for beta testing
6. **Release** production builds to app stores

Your app is now set up for continuous deployment! 🎉
