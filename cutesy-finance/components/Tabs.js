// Bottom tab navigator that switches between the main dashboard and two
// additional placeholder screens.  Also provides a logout tab.
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import Dashboard from './Dashboard';
import Menu2Screen from './Menu2Screen';
import Menu3Screen from './Menu3Screen';

const Tab = createBottomTabNavigator();

export default function Tabs({ onLogout }) {
  return (
    // React Navigation bottom tabs component
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: '#cebffa', // purple background
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          padding: 5,
        },
        tabBarIcon: ({ focused, size }) => {
          let iconName, IconComponent;

          switch (route.name) {
            case 'Menu 1':
              iconName = 'folder';
              IconComponent = Ionicons;
              break;
            case 'Menu 2':
              iconName = 'disc';
              IconComponent = Ionicons;
              break;
            case 'Menu 3':
              iconName = 'check';
              IconComponent = FontAwesome5;
              break;
            case 'Logout':
              iconName = 'log-out';
              IconComponent = Ionicons;
              break;
          }

          const iconColor = focused ? '#cebffa' : '#ffffff';

          if (route.name === 'Logout') {
            return <IconComponent name={iconName} size={size} color={iconColor} />;
          }

          return focused ? (
            <View style={styles.pill}>
              <IconComponent name={iconName} size={size} color="#cebffa" />
              <Text style={styles.pillText}>{route.name}</Text>
            </View>
          ) : (
            <IconComponent name={iconName} size={size} color="#ffffff" />
          );
        },
      })}
    >
      <Tab.Screen name="Menu 1" options={{ headerShown: false }}>
        {() => <Dashboard onLogout={onLogout} />}
      </Tab.Screen>

      <Tab.Screen name="Menu 2" component={Menu2Screen} options={{ headerShown: false }} />
      <Tab.Screen name="Menu 3" component={Menu3Screen} options={{ headerShown: false }} />

      <Tab.Screen
        name="Logout"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            onLogout();
          },
        }}
        options={{ headerShown: false }}
      >
        {() => null}
      </Tab.Screen>
    </Tab.Navigator>


  );
}

// Styling applied to tab labels
const styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginLeft: 5,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff', // pill background
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 6,
  },
  pillText: {
    color: '#cebffa',
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 14,
  },
});
