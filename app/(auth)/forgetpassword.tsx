import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Mail, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();

  const handleResetPassword = () => {
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    setError('');
    resetPassword(email.trim());
    Alert.alert('Password Reset', `A reset link has been sent to ${email}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your email to reset your password</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <Mail size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableNativeFeedback onPress={handleResetPassword} background={TouchableNativeFeedback.Ripple('#fff', false)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
            <ArrowRight color="#ffffff" size={20} />
          </View>
        </TouchableNativeFeedback>

        <View style={styles.backToLoginContainer}>
          <Text style={styles.backToLoginText}>Remember your password? </Text>
          <Text style={styles.backToLoginLink} onPress={() => router.push('/login')}>
            Back to Login
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : undefined,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : undefined,
  },
  errorText: {
    color: '#DC2626',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    fontFamily: Platform.OS === 'android' ? 'Roboto' : undefined,
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
    marginRight: 8,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : undefined,
  },
  backToLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  backToLoginText: {
    fontSize: 14,
    color: '#4B5563',
  },
  backToLoginLink: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
});
