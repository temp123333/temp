import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Bell, Globe, CircleHelp as HelpCircle, LogOut, Settings, ChevronRight, Moon } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', onPress: signOut, style: 'destructive' }
      ]
    );
  };

  const profileOptions = [
    {
      icon: <Bell size={24} color="#1E40AF" />,
      title: 'Notifications',
      type: 'toggle',
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      icon: <Moon size={24} color="#1E40AF" />,
      title: 'Dark Mode',
      type: 'toggle',
      value: darkModeEnabled,
      onToggle: setDarkModeEnabled,
    },
    {
      icon: <Globe size={24} color="#1E40AF" />,
      title: 'Language',
      value: 'English',
      onPress: () => Alert.alert('Language Settings', 'This feature is coming soon!'),
    },
    {
      icon: <HelpCircle size={24} color="#1E40AF" />,
      title: 'Help & Support',
      onPress: () => Alert.alert('Help & Support', 'This feature is coming soon!'),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'guest@example.com'}</Text>
        </View>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => Alert.alert('Edit Profile', 'Update coming soon!')}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>Settings</Text>
      </View>

      {profileOptions.map((option, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.optionItem}
          onPress={option.onPress}
          disabled={option.type === 'toggle'}
        >
          <View style={styles.optionIcon}>
            {option.icon}
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>{option.title}</Text>
            {option.type === 'toggle' ? (
              <Switch
                trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }}
                thumbColor={option.value ? '#1E40AF' : '#F9FAFB'}
                onValueChange={option.onToggle}
                value={option.value}
              />
            ) : (
              <View style={styles.optionValueContainer}>
                {option.value && <Text style={styles.optionValue}>{option.value}</Text>}
                <ChevronRight size={20} color="#94A3B8" />
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <LogOut size={20} color="#EF4444" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    width: '100%',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  editButton: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  editButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sectionTitleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  optionValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    marginRight: 8,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
  },
  signOutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
});
