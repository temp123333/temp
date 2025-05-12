import { Tabs } from 'expo-router';
import { useColorScheme, Platform } from 'react-native';
import { Home, Map, Compass, Bookmark, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { TouchableRipple } from 'react-native-paper';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isAndroid = Platform.OS === 'android';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].secondaryText,
        tabBarStyle: {
          height: isAndroid ? 64 : 80,
          paddingBottom: isAndroid ? 12 : 24,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          backgroundColor: Colors[colorScheme ?? 'light'].surface,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
          marginTop: 4,
          textTransform: 'none',
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerShown: false,
        tabBarButton: (props) => (
          <TouchableRipple
            {...props}
            borderless
            rippleColor={Colors[colorScheme ?? 'light'].ripple}
            style={{ flex: 1 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home 
              size={focused ? 26 : 24} 
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
              size={focused ? 26 : 24} 
              color={color} 
              strokeWidth={focused ? 2.2 : 2}
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
              size={focused ? 26 : 24} 
              color={color} 
              strokeWidth={focused ? 2.2 : 2}
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
              size={focused ? 26 : 24} 
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
              size={focused ? 26 : 24} 
              color={color} 
              strokeWidth={focused ? 2.2 : 2}
            />
          ),
        }}
      />
    </Tabs>
  );
}