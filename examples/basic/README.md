# React Native Stroke Text - Basic Example

A minimal React Native Expo app demonstrating the `@charmy.tech/react-native-stroke-text` package using EAS local builds.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- EAS CLI (`npm install -g eas-cli`)
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

## Setup

1. **Install dependencies:**

   ```bash
   cd examples/basic
   npm install
   ```

2. **Build the stroke-text package:**

   ```bash
   # From the monorepo root
   npm run build
   ```

## Building with EAS Local Build

Since this package uses native modules, you **cannot** use Expo Go. You must use a development build created with EAS.

### iOS

1. **Create a local development build:**

   ```bash
   eas build --local --platform ios --profile local
   ```

   This will build the app locally and create an `.ipa` file for the iOS simulator.

2. **Install the build on simulator:**

   ```bash
   # The build command will output instructions, or you can install manually:
   xcrun simctl install booted <path-to-ipa>
   ```

3. **Start the development server:**

   ```bash
   npx expo start --dev-client
   ```

### Android

1. **Create a local development build:**

   ```bash
   eas build --local --platform android --profile local
   ```

   This will build the app locally and create an `.apk` file.

2. **Install the build on device/emulator:**

   ```bash
   # Connect your device or start an emulator, then:
   adb install <path-to-apk>
   ```

3. **Start the development server:**

   ```bash
   npx expo start --dev-client
   ```

## Development Workflow

1. Make changes to the `stroke-text` package in `../../packages/stroke-text`
2. Rebuild the package: `npm run build` (from monorepo root)
3. The Metro bundler will pick up changes automatically
4. Reload the app to see changes

## Troubleshooting

### Metro bundler can't resolve the local package

- Ensure you've run `npm install` in the basic example directory
- Check that the `metro.config.js` is correctly resolving the package path
- Try clearing Metro cache: `npx expo start --dev-client --clear`

### Native module not found

- Ensure you've built the app with EAS local build (not using Expo Go)
- Rebuild the native app if you've made changes to the native code in the package

### Build errors

- Ensure all dependencies are installed: `npm install` from both root and example directory
- For iOS: Make sure CocoaPods are installed and run `pod install` in the iOS build directory if needed
- For Android: Ensure Android SDK and build tools are properly configured

## App Structure

- `App.tsx` - Main app component with StrokeText examples
- `app.json` - Expo configuration
- `eas.json` - EAS build configuration for local builds
- `metro.config.js` - Metro bundler configuration to resolve local package

