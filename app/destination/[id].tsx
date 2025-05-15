import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Linking
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  Star,
  Clock,
  Banknote,
  Bookmark,
  MapPin,
  ChevronDown,
  ChevronUp,
  Map,
  Calendar,
  Sun,
  CloudRain,
  Snowflake,
  Info
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getDestinationById } from '@/services/destinationService';
import { useFavorites } from '@/context/FavoritesContext';
import { Destination } from '@/types';
import ImageGallery from '@/components/ImageGallery';

const { width } = Dimensions.get('window');

export default function DestinationDetailScreen() {
  const { id } = useLocalSearchParams();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentWeather, setCurrentWeather] = useState('sunny'); // Mock weather state

  const { isFavorite, toggleFavorite } = useFavorites(id as string);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDestinationById(id as string);
        setDestination(data);
      } catch (error) {
        console.error('Failed to load destination:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  const handleOpenMap = () => {
    if (destination?.coordinates) {
      const { latitude, longitude } = destination.coordinates;
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url).catch(err => console.error("Failed to open maps:", err));
    }
  };

  const renderWeatherIcon = () => {
    switch(currentWeather) {
      case 'sunny':
        return <Sun size={20} color="#FFA726" />;
      case 'rainy':
        return <CloudRain size={20} color="#42A5F5" />;
      case 'snow':
        return <Snowflake size={20} color="#90CAF9" />;
      default:
        return <Sun size={20} color="#FFA726" />;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5E35B1" />
        <Text style={styles.loadingText}>Loading destination details...</Text>
      </View>
    );
  }

  if (!destination) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Destination not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header Image */}
        <View style={styles.imageHeader}>
          <Image source={{ uri: destination.images[0] }} style={styles.image} />
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.imageGradient}
          />
          <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
            <ArrowLeft size={26} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}
            onPress={toggleFavorite}
          >
            <Bookmark size={26} color={isFavorite ? '#FF4081' : '#FFF'} fill={isFavorite ? '#FF4081' : 'transparent'} />
          </TouchableOpacity>
        </View>

        {/* Title & Location */}
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.title}>{destination.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#5E35B1" />
              <Text style={styles.locationText}>{destination.region}, Nepal</Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <Star size={20} color="#FFB300" fill="#FFB300" />
            <Text style={styles.ratingText}>{destination.rating.toFixed(1)}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Clock size={20} color="#5E35B1" />
            <Text style={styles.statValue}>{destination.duration}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statBox}>
            <Banknote size={20} color="#43A047" />
            <Text style={styles.statValue}>${destination.price}</Text>
            <Text style={styles.statLabel}>Avg Cost</Text>
          </View>
          <View style={styles.statBox}>
            {renderWeatherIcon()}
            <Text style={styles.statValue}>24°C</Text>
            <Text style={styles.statLabel}>Weather</Text>
          </View>
        </View>

        {/* Map Button */}
        <TouchableOpacity style={styles.mapButton} onPress={handleOpenMap}>
          <Map size={18} color="#FFF" />
          <Text style={styles.mapButtonText}>View on Map</Text>
        </TouchableOpacity>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Place</Text>
          <Text
            style={styles.description}
            numberOfLines={showFullDescription ? undefined : 4}
          >
            {destination.description}
          </Text>
          <TouchableOpacity
            onPress={toggleDescription}
            style={styles.readMoreButton}
          >
            <Text style={styles.readMoreText}>
              {showFullDescription ? 'Show Less' : 'Read More'}
            </Text>
            {showFullDescription ? (
              <ChevronUp size={18} color="#5E35B1" />
            ) : (
              <ChevronDown size={18} color="#5E35B1" />
            )}
          </TouchableOpacity>
        </View>

        {/* Travel Tips Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Travel Tips</Text>
            <Info size={20} color="#5E35B1" />
          </View>
          <View style={styles.tipsContainer}>
            <View style={styles.tipItem}>
              <Text style={styles.tipTitle}>Best Season</Text>
              <Text style={styles.tipContent}>Spring (March-May) and Autumn (September-November)</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipTitle}>Local Customs</Text>
              <Text style={styles.tipContent}>Remove shoes before entering temples, ask before photographing locals</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipTitle}>Safety</Text>
              <Text style={styles.tipContent}>Be cautious at high altitudes, drink bottled water, avoid street food</Text>
            </View>
          </View>
        </View>

        {/* Gallery */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photo Gallery</Text>
          <ImageGallery images={destination.images} />
        </View>

        {/* How to Get There */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Get There</Text>
          <View style={styles.listContainer}>
            {destination.howToGetThere
              .split(/(?=Option \d+:)/g)
              .filter(opt => opt.trim())
              .map((option, i) => (
                <View key={i} style={styles.listItem}>
                  <View style={styles.listMarker}>
                    <Text style={styles.optionNumber}>{i + 1}</Text>
                  </View>
                  <Text style={styles.listText}>
                    {option.replace(/\.$/, '').replace(/([a-z])([A-Z])/g, '$1. $2').trim()}
                  </Text>
                </View>
              ))}
          </View>
        </View>

        {/* Best Time to Visit */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Time to Visit</Text>
            <Calendar size={20} color="#5E35B1" />
          </View>
          <Text style={styles.infoText}>{destination.bestTimeToVisit}</Text>
        </View>

        {/* Facilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.facilitiesContainer}>
            {destination.facilities.map((facility, idx) => (
              <View key={idx} style={styles.facilityItem}>
                <Text style={styles.facilityText}>{facility}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6C757D',
    marginTop: 16,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F8F9FA',
  },
  errorText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#DC3545',
    marginBottom: 24,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    backgroundColor: '#5E35B1',
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFF',
  },

  imageHeader: {
    width: '100%',
    height: 320,
    position: 'relative',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#E9ECEF',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    width: '100%',
    height: 160,
    top: 0,
    left: 0,
  },
  backIcon: {
    position: 'absolute',
    top: 56,
    left: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 30,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 56,
    right: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 30,
  },
  favoriteIconActive: {
    backgroundColor: '#FF4081',
  },

  titleContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 25,
    color: '#212529',
    lineHeight: 34,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6C757D',
    marginLeft: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    paddingVertical: 6,
    marginLeft: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    lineHeight: 34,
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#5E35B1',
    
  },

  statsRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  statBox: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    width: width * 0.28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  statValue: {
    marginTop: 8,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#212529',
    textAlign: 'center',
  },
  statLabel: {
    marginTop: 4,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6C757D',
  },

  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5E35B1',
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 24,
    marginTop: 20,
    shadowColor: '#5E35B1',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  mapButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFF',
    marginLeft: 8,
  },

  section: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#5E35B1',
    marginRight: 8,
  },

  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 24,
    color: 'b',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  readMoreText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#5E35B1',
    marginRight: 6,
  },

  tipsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  tipItem: {
    marginBottom: 16,
  },
  tipTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#5E35B1',
    marginBottom: 4,
  },
  tipContent: {
    fontFamily: 'AInter-Regular',
    fontSize: 16,
    color: 'b',
    lineHeight: 20,
  },

  listContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'flex-start',
  },
  listMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#5E35B1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  optionNumber: {
    color: '#FFF',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  listText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },

  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#495057',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    lineHeight: 22,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  facilityItem: {
    backgroundColor: '#EDE7F6',
    paddingVertical: 8,
    marginTop: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#5E35B1',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  facilityText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#5E35B1',
  },
});