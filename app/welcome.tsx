import { View, Text, Image, TouchableOpacity, useColorScheme, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { ArrowRight } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const authContext = useContext(AuthContext);

  if (!authContext) {
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
    <View style={{ flex: 1 }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <Image
        source={{ uri: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg' }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: height * 0.7,
        }}
      />

      <View style={{ 
        flex: 1,
        justifyContent: 'flex-end',
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 50 : 24
      }}>
        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          delay={300}
        >
          <Text style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 40,
            color: '#ffffff',
            marginBottom: 12,
            textShadowColor: 'rgba(0,0,0,0.2)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}>
            Discover Nepal
          </Text>

          <Text style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            color: '#ffffff',
            marginBottom: 32,
            lineHeight: 24,
            textShadowColor: 'rgba(0,0,0,0.2)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}>
            Explore breathtaking landscapes, ancient temples, and hidden trails in the heart of the Himalayas
          </Text>

          <TouchableOpacity
            onPress={handleExplorePress}
            style={{
              backgroundColor: '#FF6B4A',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 8,
            }}
          >
            <Text style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 18,
              color: '#ffffff',
              marginRight: 8,
            }}>
              Start Exploring
            </Text>
            <ArrowRight color="#ffffff" size={20} />
          </TouchableOpacity>

          {!user && (
            <TouchableOpacity
              onPress={() => router.push('/(auth)/register')}
              style={{
                marginTop: 16,
                backgroundColor: 'rgba(255,255,255,0.2)',
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
                color: '#ffffff',
              }}>
                Create an Account
              </Text>
            </TouchableOpacity>
          )}
        </Animatable.View>
      </View>
    </View>
  );
}