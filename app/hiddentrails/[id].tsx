import { Stack, useLocalSearchParams } from 'expo-router';
import { hiddenTrails } from '../../services/hiddentrails';
import TrailDetails from '@/components/TrailList'; // Assuming you have a TrailDetails component
import { View, Text } from 'react-native';
export default function TrailDetailScreen() {
  const { id } = useLocalSearchParams();
  const trail = hiddenTrails.find(t => t.id.toString() === id);

  if (!trail) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Trail not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: trail.name,
          headerShown: true 
        }} 
      />
      <TrailDetails trail={trail} />
    </>
  );
}