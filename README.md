# Cutesy Finance Mobile Apps

This repository contains both the original React Native demo and a simple .NET MAUI version.

## React Native Setup

1. Install [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/get-started/installation/).
2. Run `npm install` in the `cutesy-finance` directory.
3. Start the development server with `npm start` (or `expo start`).
4. Use the iOS Simulator, Android emulator or a physical device to run the app.

This demo uses only the built-in React Native `Animated` API. The
`react-native-reanimated` package was removed to avoid native initialization
errors.

The app uses the **Poppins** font via `@expo-google-fonts/poppins`, so the first install will download the font.

## Project structure

- `App.js` – entry point and navigation
- `components/` – UI components and screens
- `assets/` – placeholder app icons

## Functionality

- Carousel on the welcome screen with sign-up/login options
- Registration form with password strength indicator
- Login modal accepting only `a@b.com` / `P@`
- Dashboard with panels, bottom tabs, burger menu and logout

Everything is heavily commented in the code for learning purposes.

## .NET MAUI Version

The `CutesyFinanceMaui` folder contains a minimal .NET MAUI application that mirrors the basic login flow. To build and run it you need the [.NET SDK](https://dotnet.microsoft.com/) with MAUI workloads installed.

```
cd CutesyFinanceMaui
dotnet build
```

This will build targets for iOS, Android and macOS.
