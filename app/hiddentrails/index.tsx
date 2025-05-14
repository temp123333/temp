import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import TrailList from '../../components/TrailList';
import { hiddenTrails } from '../../services/hiddentrails'; // Assuming this is an array

export default function HiddenTrailsScreen() {
  // If hiddenTrails is an array, use it directly
  const trails = hiddenTrails;
  const isLoading = false; // No loading state if not using a hook

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Hidden Trails',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
          }
        }} 
      />
      <TrailList trails={trails} />
    </>
  );
}
