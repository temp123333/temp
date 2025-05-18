import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme, Platform } from 'react-native';
import { Chrome as Home, Map, Compass, Bookmark, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
          height: Platform.OS === 'android' ? 70 : 90,
        },
        headerTintColor: theme.text,
        drawerStyle: {
          backgroundColor: theme.background,
          width: '80%',
        },
        drawerActiveTintColor: theme.tint,
        drawerInactiveTintColor: theme.tabIconDefault,
        drawerLabelStyle: {
          fontFamily: 'Poppins-Medium',
          marginLeft: -20,
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
        }
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="discover"
        options={{
          title: 'Discover',
          drawerIcon: ({ color, size }) => <Compass size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="map"
        options={{
          title: 'Map',
          drawerIcon: ({ color, size }) => <Map size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          drawerIcon: ({ color, size }) => <Bookmark size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}