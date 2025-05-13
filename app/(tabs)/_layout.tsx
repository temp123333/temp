import { Tabs } from 'expo-router';
import { useColorScheme, Platform } from 'react-native';
import { Home, Map, Compass, Bookmark, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { wp, hp } from '@/utils/responsive';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          position: 'absolute',
          left: wp(5),
          right: wp(5),
          bottom: hp(5),
          height: hp(9.5),
          paddingBottom: hp(1.2),
          paddingTop: hp(1),
          backgroundColor: theme.tabBarBackground, // ✅ CHANGED TO CUSTOM COLOR
          borderRadius: 20,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.25,
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
          fontSize: wp(3.2),
          marginTop: Platform.OS === 'android' ? hp(0.5) : 0,
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
