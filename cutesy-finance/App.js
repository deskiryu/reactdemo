import "react-native-gesture-handler";
import "react-native-reanimated";
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WelcomeScreen from './components/WelcomeScreen';
import RegisterScreen from './components/RegisterScreen';
import Tabs from './components/Tabs';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [fontsLoaded] = useFonts({ Poppins_400Regular });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#957DAD" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!loggedIn ? (
            <>
              <Stack.Screen name="Welcome">
                {(props) => (
                  <WelcomeScreen {...props} onLogin={() => setLoggedIn(true)} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          ) : (
            <Stack.Screen name="Tabs">
              {(props) => <Tabs {...props} onLogout={() => setLoggedIn(false)} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
