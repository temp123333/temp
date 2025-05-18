import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace('/(tabs)/index'); // Or '/Home' if that’s your main screen
      } else {
        router.replace('/welcome');
      }
    }
  }, [user, isLoading]);

  return null;
}
