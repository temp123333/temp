// components/Layout.tsx
import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '@/styles/GlobalStyles';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      {children}
    </SafeAreaView>
  );
}
