import { Tabs } from 'expo-router';
import { useColorScheme, Platform } from 'react-native';
import { Home, Map, Compass, Bookmark, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { wp, hp } from '@/utils/responsive';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: {
          position: 'absolute',
          left: wp(5),
          right: wp(5),
          bottom: hp(5), // Keeps the container in the same position
          height: hp(9.5),
          paddingBottom: hp(1.2),
          paddingTop: hp(1),
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderRadius: 16, // Rounded corners for a sleek look
          borderTopWidth: 0,
          elevation: 8, // Android shadow
          shadowColor: '#000',
          shadowOpacity: 0.2, // Increased opacity for better visibility
          shadowRadius: 10,
          shadowOffset: { width: 0, height: -4 },
          zIndex: 999, // Ensures the tab bar is on top of other content
        },
        tabBarItemStyle: {
          paddingVertical: hp(0.5),
          justifyContent: 'center', // Ensures the icon is centered vertically
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: wp(3.2),
          marginTop: Platform.OS === 'android' ? hp(0.5) : 0,
          includeFontPadding: false,
        },
        tabBarIconStyle: {
          marginTop: 0, // Removed marginTop to keep it centered
          justifyContent: 'center', // Ensures icons are centered within the tab
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
