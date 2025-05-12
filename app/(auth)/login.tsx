import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Lock, User, ArrowRight } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setError('');
    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgetpassword');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'android' ? -150 : 0}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Header with Image */}
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: 'https://cdn.mos.cms.futurecdn.net/D9bzCVeZLHQnZ6bUWvAkrW-1200-80.jpg' }}
                style={styles.backgroundImage}
                blurRadius={Platform.OS === 'android' ? 1 : 0}
              />
              <View style={styles.overlay} />
              <Animatable.View 
                animation="fadeInUp" 
                duration={1000}
                style={styles.headerTextContainer}
              >
                <Text style={styles.title}>Nepal Hidden Gems</Text>
                <Text style={styles.subtitle}>Discover the unexplored beauty</Text>
              </Animatable.View>
            </View>

            {/* Form Container */}
            <Animatable.View 
              animation="fadeInUp" 
              duration={1000}
              delay={300}
              style={styles.formContainer}
            >
              <Text style={styles.formTitle}>Welcome Back</Text>
              <Text style={styles.formSubtitle}>Sign in to continue your journey</Text>

              {error ? (
                <Animatable.Text 
                  animation="shake" 
                  duration={500}
                  style={styles.errorText}
                >
                  {error}
                </Animatable.Text>
              ) : null}

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <User size={20} color="#64748B" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address" 
                  placeholderTextColor={'#64748B'}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  importantForAutofill="yes"
                  textContentType="emailAddress"
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Lock size={20} color="#64748B" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password" 
                  placeholderTextColor={'#64748B'}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  ref={(input) => this.passwordInput = input}
                  importantForAutofill="yes"
                  textContentType="password"
                  returnKeyType="go"
                  onSubmitEditing={handleLogin}
                />
              </View>

              {/* Forgot Password */}
              <TouchableOpacity 
                onPress={handleForgotPassword}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <TouchableOpacity 
                style={[styles.button, isLoading && styles.buttonDisabled]} 
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>Sign In</Text>
                    <ArrowRight color="#ffffff" size={20} />
                  </>
                )}
              </TouchableOpacity>

              {/* Register Link */}
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account? </Text>
                <TouchableOpacity 
                  onPress={() => router.push('/register')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.registerLink}>Register</Text>
                </TouchableOpacity>
              </View>

              {/* Guest Button */}
              <TouchableOpacity 
                style={styles.guestButton} 
                onPress={() => signIn('guest@example.com', 'password')}
                activeOpacity={0.7}
              >
                <Text style={styles.guestButtonText}>Continue as Guest</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  imageContainer: {
    height: Platform.OS === 'android' ? 280 : 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerTextContainer: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: Platform.OS === 'android' ? 28 : 32,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    includeFontPadding: false, // Android specific
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: Platform.OS === 'android' ? 15 : 17,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 4 : 6,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    includeFontPadding: false,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8, // Android shadow
    paddingBottom: Platform.OS === 'android' ? 24 : 0,
  },
  formTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: Platform.OS === 'android' ? 22 : 24,
    color: '#1E293B',
    marginBottom: 6,
    includeFontPadding: false,
  },
  formSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: Platform.OS === 'android' ? 14 : 16,
    color: '#64748B',
    marginBottom: 20,
    includeFontPadding: false,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    color: '#DC2626',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
    includeFontPadding: false,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'android' ? 12 : 14,
    backgroundColor: '#F1F5F9',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: Platform.OS === 'android' ? 14 : 16,
    color: '#0F172A',
    paddingVertical: Platform.OS === 'android' ? 2 : 4,
    includeFontPadding: false,
  },
  forgotPassword: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1D4ED8',
    textAlign: 'right',
    marginBottom: 24,
    includeFontPadding: false,
  },
  button: {
    backgroundColor: '#1D4ED8',
    borderRadius: 10,
    paddingVertical: Platform.OS === 'android' ? 14 : 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3, // Android shadow
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#ffffff',
    marginRight: 8,
    includeFontPadding: false,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  registerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#475569',
    includeFontPadding: false,
  },
  registerLink: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#1D4ED8',
    includeFontPadding: false,
  },
  guestButton: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingVertical: Platform.OS === 'android' ? 12 : 14,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 2, // Android shadow
  },
  guestButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1E293B',
    includeFontPadding: false,
  },
});