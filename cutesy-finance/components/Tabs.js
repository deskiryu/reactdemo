import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Text, StyleSheet } from 'react-native';
import Dashboard from './Dashboard';
import Menu2Screen from './Menu2Screen';
import Menu3Screen from './Menu3Screen';

const Tab = createBottomTabNavigator();

export default function Tabs({ onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarLabel: ({ focused, color }) =>
          focused ? <Text style={[styles.label, { color }]}>{route.name}</Text> : null,
        tabBarActiveTintColor: '#957DAD',
        tabBarStyle: { height: 60 },
      })}
    >
      <Tab.Screen
        name="Menu 1"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder" color={color} size={size} />
          ),
        }}
      >
        {() => <Dashboard onLogout={onLogout} />}
      </Tab.Screen>
      <Tab.Screen
        name="Menu 2"
        component={Menu2Screen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="disc" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu 3"
        component={Menu3Screen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="check" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={() => null}
        listeners={{ tabPress: (e) => { e.preventDefault(); onLogout(); } }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
});