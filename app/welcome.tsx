import { View, Text, Image, TouchableOpacity, useColorScheme, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const authContext = useContext(AuthContext);

  if (!authContext) {
    // Optional fallback or error boundary logic
    throw new Error('AuthContext is undefined. Make sure you wrapped your app with AuthProvider.');
  }

  const { user } = authContext;

  const handleExplorePress = () => {
    if (user) {
      router.replace('/(tabs)/Home');
    } else {
      router.push('/(auth)/login');
    }
  };

  return (
    <LinearGradient
      colors={isDark ? ['#1e3c72', '#2a5298'] : ['#fdfbfb', '#ebedee']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Image
        // source={require('../assets/travel-hero.png')} 
        style={{
          width: width * 0.8,
          height: width * 0.8,
          resizeMode: 'contain',
          marginBottom: 20,
        }}
      />

      <Text
        style={{
          fontFamily: 'Poppins-Bold',
          fontSize: 30,
          color: isDark ? '#fff' : '#333',
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        TravelMate
      </Text>

      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 16,
          color: isDark ? '#ccc' : '#666',
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        Discover amazing places, hidden trails, and your next dream destination.
      </Text>

      <TouchableOpacity
        onPress={handleExplorePress}
        style={{
          backgroundColor: '#00b894',
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 25,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 6,
        }}
      >
        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#fff' }}>
          Explore Now
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
