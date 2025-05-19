import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { Chrome as Home, Map, Compass, Bookmark, User } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '@/constants/Colors';
import { hp } from '@/utils/responsive';

const AnimatedIcon = ({ focused, children }: { focused: boolean; children: React.ReactNode }) => {
  const animation = focused ? 'pulse' : undefined;
  return (
    <Animatable.View animation={animation} duration={500} useNativeDriver>
      {children}
    </Animatable.View>
  );
};

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: theme.tint,
        drawerInactiveTintColor: theme.tabIconDefault,
        drawerStyle: {
          backgroundColor: theme.background,
          paddingTop: hp(2),
        },
        drawerLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name={ROUTES.HOME}
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
        name={ROUTES.DISCOVER}
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
        name={ROUTES.MAP}
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
        name={ROUTES.FAVORITES}
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
        name={ROUTES.PROFILE}
        options={{
          title: 'Profile',
          drawerIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              <User size={22} color={color} />
            </AnimatedIcon>
          ),
        }}
      />
    </Drawer>
  );
}