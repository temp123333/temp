import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { Interest } from '@/types';

interface InterestChipProps {
  interest: Interest;
  isSelected: boolean;
  onSelect: () => void;
}

export default function InterestChip({ interest, isSelected, onSelect }: InterestChipProps) {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Image source={{ uri: interest.icon }} style={styles.icon} />
      </View>
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {interest.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedContainer: {
    backgroundColor: '#EFF6FF',
    borderColor: '#1E40AF',
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
  selectedText: {
    color: '#1E40AF',
  },
});