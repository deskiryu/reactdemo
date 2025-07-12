// Entry file for the React Native application.  This sets up
// navigation and global providers for the rest of the app.
// The gesture handler import must be first as per the library docs.
import "react-native-gesture-handler";
// React and hooks used throughout the app
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Third party components used for navigation and fonts
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Our app screens
import WelcomeScreen from './components/WelcomeScreen';
import RegisterScreen from './components/RegisterScreen';
import Tabs from './components/Tabs';
import InsuranceListScreen from './components/InsuranceListScreen';
import { setBaseUrl } from './services/LoginService';

const Stack = createNativeStackNavigator();

export default function App() {
  // Track whether the user is logged in to decide which screens to show
  const [loggedIn, setLoggedIn] = useState(false);
  // Load the custom font before rendering anything else
  const [fontsLoaded] = useFonts({ Poppins_400Regular });

  useEffect(() => {
    setBaseUrl('https://brokeriqcustomerapidevelop.azurewebsites.net/api/');
  }, []);

  // Show a loader until fonts are ready
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#cebffa" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* NavigationContainer holds the navigation state */}
      <NavigationContainer>
        {/* Stack navigator switches between welcome/register and main tabs */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!loggedIn ? (
            // When not logged in show the welcome and registration screens
            <>
              <Stack.Screen name="Welcome">
                {(props) => (
                  <WelcomeScreen {...props} onLogin={() => setLoggedIn(true)} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          ) : (
            // Once authenticated show the main tab navigator and additional screens
            <>
              <Stack.Screen name="Tabs">
                {(props) => (
                  <Tabs {...props} onLogout={() => setLoggedIn(false)} />
                )}
              </Stack.Screen>
              <Stack.Screen name="InsuranceList" component={InsuranceListScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
