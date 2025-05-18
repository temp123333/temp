import React from 'react';
import { Drawer } from 'expo-router/drawer';
import * as Animatable from 'react-native-animatable';
import { Chrome as Home, Compass, Map, Bookmark, User } from 'lucide-react-native';
import { hp } from '@/utils/responsive';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

const AnimatedIcon = ({ focused, children }: { focused: boolean; children: React.ReactNode }) => {
  const animation = focused ? 'pulse' : undefined;
  return (
    <Animatable.View animation={animation} duration={500} useNativeDriver>
      {children}
    </Animatable.View>
  );
};

export default function DrawerScreens() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <>
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              <Home size={22} color={color} />
            </AnimatedIcon>
          ),
        }}
      />
      <Drawer.Screen
        name="discover"
        options={{
          title: 'Discover',
          drawerIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              <Compass size={22} color={color} />
            </AnimatedIcon>
          ),
        }}
      />
      <Drawer.Screen
        name="map"
        options={{
          title: 'Map',
          drawerIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              <Map size={22} color={color} />
            </AnimatedIcon>
          ),
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          drawerIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              <Bookmark size={22} color={color} />
            </AnimatedIcon>
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              <User size={22} color={color} />
            </AnimatedIcon>
          ),
        }}
      />
    </>
  );
}
