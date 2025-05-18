import { Tabs, useRouter } from 'expo-router';
import { useColorScheme, Platform, ActivityIndicator, View } from 'react-native';
import { Chrome as Home, Map, Compass, Bookmark, User } from 'lucide-react-native';
import { useEffect } from 'react';

import Colors from '@/constants/Colors';
import { wp, hp } from '@/utils/responsive';
import { useAuth } from '@/context/AuthContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/(auth)/login');
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          position: 'absolute',
          left: wp(5),
          right: wp(5),
          bottom: Platform.OS === 'ios' ? hp(4) : hp(3),
          height: hp(8),
          paddingBottom: Platform.OS === 'ios' ? hp(1) : hp(0.5),
          paddingTop: hp(1),
          backgroundColor: theme.tabBarBackground,
          borderRadius: 20,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
          zIndex: 999,
        },
        tabBarItemStyle: {
          paddingVertical: hp(0.5),
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: wp(3),
          marginTop: Platform.OS === 'android' ? hp(0.3) : 0,
          includeFontPadding: false,
        },
        tabBarIconStyle: {
          marginTop: 0,
          justifyContent: 'center',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home size={24} color={color} fill={focused ? color : 'transparent'} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <Compass size={24} color={color} fill={focused ? color : 'transparent'} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <Map size={24} color={color} fill={focused ? color : 'transparent'} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <Bookmark size={24} color={color} fill={focused ? color : 'transparent'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <User size={24} color={color} fill={focused ? color : 'transparent'} />
          ),
        }}
      />
    </Tabs>
  );
}
