import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="daily-register"
        options={{
          title: 'Registros',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-text" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bikes"
        options={{
          title: 'Motos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="motorbike" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Relatórios',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-box" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
