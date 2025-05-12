import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { MapPin, Star, Clock, Trash2 } from 'lucide-react-native';
import { Destination } from '@/types';

interface DestinationListItemProps {
  destination: Destination;
  showRemoveButton?: boolean;
  onRemove?: () => void;
}

export default function DestinationListItem({ 
  destination, 
  showRemoveButton = false,
  onRemove
}: DestinationListItemProps) {
  const handlePress = () => {
    router.push(`/destination/${destination.id}`);
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: destination.images[0] }} 
        style={styles.image}
      />
      
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{destination.name}</Text>
          {destination.hasAudioGuide && (
            <View style={styles.audioTag}>
              <Text style={styles.audioTagText}>Audio</Text>
            </View>
          )}
        </View>
        
        <View style={styles.locationRow}>
          <MapPin size={12} color="#64748B" />
          <Text style={styles.location}>{destination.region}, Nepal</Text>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Star size={12} color="#F59E0B" />
            <Text style={styles.statText}>{destination.rating}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Clock size={12} color="#1E40AF" />
            <Text style={styles.statText}>{destination.duration}</Text>
          </View>
        </View>
      </View>
      
      {showRemoveButton && onRemove && (
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Trash2 size={20} color="#EF4444" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    flex: 1,
  },
  audioTag: {
    backgroundColor: '#B91C1C',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  audioTagText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: '#FFFFFF',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#1E293B',
    marginLeft: 4,
  },
  statDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 8,
  },
  removeButton: {
    padding: 12,
    justifyContent: 'center',
  },
});