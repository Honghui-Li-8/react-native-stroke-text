# React Native Stroke Text - Example App

This is an example Expo app demonstrating the features of `@charmy.tech/react-native-stroke-text`.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli` or use `npx expo`)
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

## Setup

1. **Install dependencies:**

   ```bash
   cd example
   npm install
   # or
   yarn install
   ```

   **Note:** The `app.json` references some asset files (icon, splash, etc.). These are optional for development. If you want to customize them, create an `assets/` folder with:
   - `icon.png` (1024x1024)
   - `splash.png` (1242x2436)
   - `adaptive-icon.png` (1024x1024 for Android)
   - `favicon.png` (48x48 for web)

2. **iOS Setup (if testing on iOS):**

   ```bash
   cd ios
   pod install
   cd ..
   ```

## Running the App

Since this package uses native modules, you **cannot** use Expo Go. You must use a development build.

### Option 1: Development Build (Recommended)

1. **Create a development build:**

   ```bash
   npx expo run:ios
   # or
   npx expo run:android
   ```

   This will create a development build with the native module included.

2. **Start the development server:**

   ```bash
   npx expo start --dev-client
   ```

### Option 2: EAS Build (For Testing on Physical Devices)

1. **Install EAS CLI:**

   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS:**

   ```bash
   eas build:configure
   ```

3. **Build for your platform:**

   ```bash
   eas build --profile development --platform ios
   # or
   eas build --profile development --platform android
   ```

4. **Install the build on your device and start the dev server:**

   ```bash
   npx expo start --dev-client
   ```

## Example Screens

The app includes four example screens:

### 1. Basic Examples (HomeScreen)
- Basic stroke text examples
- Different stroke widths and colors
- Text alignment (left, center, right)
- Various font sizes
- Color variations
- Multi-line text

### 2. Ellipsis Examples (EllipsisScreen)
- Single line with ellipsis
- Multiple lines with ellipsis
- Width constraints
- Comparison with and without ellipsis
- Different alignment options with ellipsis

### 3. Custom Fonts (FontsScreen)
- System font examples
- Instructions for loading custom fonts
- Different font sizes
- Font examples with ellipsis
- Multi-line custom font examples

### 4. Interactive Demo (InteractiveScreen)
- Live preview of stroke text
- Interactive controls for:
  - Font size (12-72)
  - Stroke width (0-20)
  - Width constraint (100-350px)
  - Text color selection
  - Stroke color selection
  - Ellipsis toggle
  - Number of lines (0-5)
  - Text alignment
  - Sample text options

## Using Custom Fonts

To use custom fonts in this example:

1. Add your font files to `example/assets/fonts/`
2. Load fonts using `expo-font`:

   ```tsx
   import { useFonts } from 'expo-font';
   
   const [fontsLoaded] = useFonts({
     'MyFont-Bold': require('./assets/fonts/MyFont-Bold.ttf'),
   });
   ```

3. Use the `fontFamily` prop:

   ```tsx
   <StrokeText
     fontFamily="MyFont-Bold"
     text="Custom Font"
     fontSize={32}
     color="#FFFFFF"
     strokeColor="#000000"
     strokeWidth={3}
   />
   ```

## Troubleshooting

### Android Build Issues

- Ensure `compileSdkVersion` is set to 34 in `app.json`
- Clean and rebuild:
  ```bash
  cd android
  ./gradlew clean
  cd ..
  npx expo run:android
  ```

### iOS Build Issues

- Run `pod install` in the `ios` directory
- Clean build folder in Xcode (Product → Clean Build Folder)
- Rebuild:
  ```bash
  npx expo run:ios
  ```

### Module Not Found

- Ensure the parent package is properly linked:
  ```bash
  cd ..
  npm run build
  cd example
  npm install
  ```

## Notes

- This example app uses Expo SDK 54
- The package requires a development build (not Expo Go)
- Android requires `compileSdkVersion` 34 or higher
- iOS requires iOS 11.0 or higher

## License

Same as the parent package (MIT).

