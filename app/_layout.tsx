import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/context/AuthContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular as Poppins_Regular,
  Poppins_500Medium as Poppins_Medium,
  Poppins_600SemiBold as Poppins_SemiBold,
  Poppins_700Bold as Poppins_Bold,
} from '@expo-google-fonts/poppins';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': Poppins_Regular,
    'Poppins-Medium': Poppins_Medium,
    'Poppins-SemiBold': Poppins_SemiBold,
    'Poppins-Bold': Poppins_Bold,
  });

  useEffect(() => {
    if (fontError) {
      console.error('Error loading fonts:', fontError);
    }
  }, [fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6B4A" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <FavoritesProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </FavoritesProvider>
    </AuthProvider>
  );
}
