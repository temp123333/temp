import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';
import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
  onPress: () => void;
  compact?: boolean;
}

export default function DestinationCard({ destination, onPress, compact = false }: DestinationCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.card, compact && styles.compactCard]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: destination.images[0] }} 
        style={[styles.image, compact && styles.compactImage]}
      />
      
      {destination.category && (
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{destination.category}</Text>
        </View>
      )}
      
      <View style={styles.content}>
        <View style={styles.ratingContainer}>
          <Star size={12} color="#F59E0B" />
          <Text style={styles.rating}>{destination.rating}</Text>
        </View>
        
        <Text style={styles.title} numberOfLines={1}>{destination.name}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={12} color="#64748B" />
          <Text style={styles.location} numberOfLines={1}>{destination.region}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  compactCard: {
    width: 160,
  },
  image: {
    width: '100%',
    height: 150,
  },
  compactImage: {
    height: 120,
  },
  categoryTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(30, 64, 175, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  content: {
    padding: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#1E293B',
    marginLeft: 4,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
});