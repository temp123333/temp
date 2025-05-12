import { Tabs } from 'expo-router';
import { useColorScheme, Platform } from 'react-native';
import { Home, Map, Compass, Bookmark, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: { 
          height: Platform.select({
            android: 60,
            ios: 80,
          }),
          paddingBottom: Platform.select({
            android: 10,
            ios: 8,
          }),
          paddingTop: Platform.select({
            android: 8,
            ios: 8,
          }),
          backgroundColor: Colors[colorScheme ?? 'light'].tabBarBackground,
          borderTopWidth: 0,
          elevation: 8, // Android shadow
          shadowOpacity: 0.1, // iOS shadow
          shadowRadius: 8,
          shadowOffset: { width: 0, height: -4 },
        },
        tabBarItemStyle: {
          paddingVertical: Platform.select({
            android: 4,
            ios: 8,
          }),
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
          marginTop: Platform.select({
            android: 5,
            ios: 0,
          }),
          includeFontPadding: false, // Removes extra padding on Android
        },
        tabBarIconStyle: {
          marginTop: Platform.select({
            android: 4,
            ios: 0,
          }),
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home 
              size={24} 
              color={color} 
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <Compass 
              size={24} 
              color={color} 
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <Map 
              size={24} 
              color={color} 
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <Bookmark 
              size={24} 
              color={color} 
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <User 
              size={24} 
              color={color} 
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
    </Tabs>
  );
}