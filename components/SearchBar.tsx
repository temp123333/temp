import React, { useRef } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { Search, FileSliders as Sliders } from 'lucide-react-native';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
}

export default function SearchBar({ 
  value = '...', // Default value for debugging   
  onChangeText = (text) => console.log('Search text:', text), // Debugging
  onFilterPress = () => console.log('Filter pressed') // Debugging
}: SearchBarProps) {
  const inputRef = useRef<TextInput>(null);

  const handleContainerPress = () => {
    console.log('Container pressed'); // Debugging
    inputRef.current?.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Search destinations..."
            placeholderTextColor="#94A3B8"
            value={value}
            onChangeText={onChangeText}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            editable={true}
            autoFocus={false}
            underlineColorAndroid="transparent"
            selectionColor="#1E40AF"
            onSubmitEditing={() => Keyboard.dismiss()}
            keyboardType="default"
            onFocus={() => console.log('Input focused')} // Debugging
            onBlur={() => console.log('Input blurred')} // Debugging
          />
          {onFilterPress && (
            <TouchableOpacity 
              onPress={onFilterPress} 
              style={styles.filterButton}
              activeOpacity={0.7}
              onPressIn={() => console.log('Filter button pressed')} // Debugging
            >
              <Sliders size={20} color="#1E40AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#F8FAFC',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1E293B',
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
    backgroundColor: 'transparent', // Ensure background is transparent
  },
  filterButton: {
    padding: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});