import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';
import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
  onPress: () => void;
  compact?: boolean;
}

export default function DestinationCard({ destination, onPress, compact = false }: DestinationCardProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <TouchableOpacity 
      style={[styles.card, compact && styles.compactCard]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: destination.images[0] }} 
          style={[styles.image, compact && styles.compactImage]}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />
        {imageLoading && (
          <View style={[styles.loadingContainer, compact && styles.compactImage]}>
            <ActivityIndicator color="#1E40AF" />
          </View>
        )}

        {destination.category && (
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{destination.category}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>{destination.rating.toFixed(1)}</Text>
        </View>

        <Text style={styles.title} numberOfLines={1}>
          {destination.name}
        </Text>

        <View style={styles.locationContainer}>
          <MapPin size={14} color="#64748B" />
          <Text style={styles.location} numberOfLines={1}>
            {destination.region}, Nepal
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  compactCard: {
    width: 160,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
  },
  compactImage: {
    height: 120,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(30, 64, 175, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 10,
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
    fontSize: 16,
    color: '#0F172A',
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