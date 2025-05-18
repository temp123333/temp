import { Drawer } from 'expo-router/drawer';
import { useColorScheme, ActivityIndicator, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { Chrome as Home, Compass, Map, Bookmark, User } from 'lucide-react-native';
import { hp } from '@/utils/responsive';

export default function DrawerLayout() {
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
    const animation = focused ? 'pulse' : undefined;
    return (
      <Animatable.View animation={animation} duration={500} useNativeDriver>
        {children}
      </Animatable.View>
    );
  };

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
    </Drawer>
  );
}
