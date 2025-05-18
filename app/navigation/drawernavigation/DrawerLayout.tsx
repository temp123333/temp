import React, { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme, ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { hp } from '@/utils/responsive';
import { useAuth } from '@/context/AuthContext';

import DrawerScreens from './DrawerScreens';

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
      <DrawerScreens />
    </Drawer>
  );
}
