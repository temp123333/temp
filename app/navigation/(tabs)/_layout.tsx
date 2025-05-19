import { Tabs, useRouter } from 'expo-router';
import { useColorScheme, Platform, ActivityIndicator, View } from 'react-native';
import { Chrome as Home, Map, Compass, Bookmark, User } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';
import { useEffect, useState } from 'react'; // Import useState

import Colors from '@/constants/Colors';
import { wp, hp } from '@/utils/responsive';
import { useAuth } from '@/context/AuthContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false); // New state variable

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/(auth)/login');
      setIsReady(false); // Ensure Tabs don't render before redirect
    } else {
      setIsReady(true); // Only allow Tabs to render after auth check
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
      }}>
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  const AnimatedIcon = ({ focused, children }: { focused: boolean; children: React.ReactNode }) => {
    const animation = focused ? 'bounceIn' : undefined;
    return (
      <Animatable.View animation={animation} duration={500} useNativeDriver>
        {children}
      </Animatable.View>
    );
  };

  // Conditionally render Tabs based on isReady and user
  if (!isReady || !user) {
    return null; // Or a loading indicator if you prefer
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          position: 'absolute',
          left: wp(4),
          right: wp(4),
          bottom: Platform.OS === 'ios' ? hp(4) : hp(2),
          height: Platform.OS === 'ios' ? hp(8) : hp(7),
          paddingBottom: Platform.OS === 'ios' ? hp(1) : 0,
          paddingTop: Platform.OS === 'ios' ? hp(1) : 0,
          backgroundColor: theme.tabBarBackground,
          borderRadius: 20,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        },
        tabBarItemStyle: {
          paddingVertical: Platform.OS === 'ios' ? hp(0.5) : 0,
          height: Platform.OS === 'ios' ? hp(6) : hp(7),
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: wp(3),
          marginTop: Platform.OS === 'android' ? hp(-1) : 0,
          paddingBottom: Platform.OS === 'android' ? hp(1) : 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              <Home size={24} color={color} />
            </AnimatedIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              <Compass size={24} color={color} />
            </AnimatedIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              <Map size={24} color={color} />
            </AnimatedIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              <Bookmark size={24} color={color} />
            </AnimatedIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon focused={focused}>
              <User size={24} color={color} />
            </AnimatedIcon>
          ),
        }}
      />
    </Tabs>
  );
}