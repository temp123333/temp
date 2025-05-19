import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { View, ActivityIndicator, Platform } from 'react-native';

export default function Index() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace(Platform.OS === 'ios' ? '/(tabs)/Home' : '/(drawer)/Home');
      } else {
        router.replace('/welcome');
      }
    }
  }, [user, isLoading]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#FF6B4A" />
    </View>
  );
}