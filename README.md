# Cutesy Finance React Native App

This is a small demo banking app built with Expo/React Native. It includes iOS and Android support.

## Setup

1. Install [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/get-started/installation/).
2. Run `npm install` in the `cutesy-finance` directory.
3. Copy `appsettings.example.json` to `appsettings.json` in the `cutesy-finance` directory and edit the `baseUrl` value.
4. Start the development server with `npm start` (or `expo start`).
5. Use the iOS Simulator, Android emulator or a physical device to run the app.

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
- Password visibility toggle and optional Face ID login
- Dashboard with panels, bottom tabs, burger menu and logout

Everything is heavily commented in the code for learning purposes.
