import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, FileSliders as Sliders } from 'lucide-react-native';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
}

export default function SearchBar({ 
  value = '', 
  onChangeText,
  onFilterPress
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search destinations..."
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={onChangeText}
        />
        {onFilterPress && (
          <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
            <Sliders size={20} color="#1E40AF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1E293B',
    paddingVertical: 12,
  },
  filterButton: {
    padding: 8,
  },
});