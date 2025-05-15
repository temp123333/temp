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
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Banknote,
  Bookmark,
  CirclePlay as PlayCircle,
  ChevronDown,
  ChevronUp,
  Map,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getDestinationById } from '@/services/destinationService';
import { useFavorites } from '@/context/FavoritesContext';
import { Destination } from '@/types';
import ImageGallery from '@/components/ImageGallery';
import AudioPlayer from '@/components/AudioPlayer';

const { width } = Dimensions.get('window');

export default function DestinationDetailScreen() {
  const { id } = useLocalSearchParams(); // destination id
  const [destination, setDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

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

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleAudioPlayer = () => {
    setShowAudioPlayer(!showAudioPlayer);
  };

  const viewOnMap = () => {
    if (destination?.location?.latitude && destination?.location?.longitude) {
      const mapUrl = `https://www.google.com/maps?q=${destination.location.latitude},${destination.location.longitude}`;
      router.push(mapUrl);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Header */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: destination.images[0] }} style={styles.headerImage} />
          <LinearGradient colors={['rgba(0,0,0,0.7)', 'transparent']} style={styles.headerGradient} />
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
            onPress={toggleFavorite}
          >
            <Bookmark size={24} color="#FFFFFF" fill={isFavorite ? "#FFFFFF" : "transparent"} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Title and Location */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{destination.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#64748B" />
              <Text style={styles.location}>{destination.region}, Nepal</Text>
              <TouchableOpacity style={styles.mapButton} onPress={viewOnMap}>
                <Map size={16} color="#4F46E5" />
                <Text style={styles.mapButtonText}>View on Map</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <LinearGradient
              colors={['#6366F1', '#4F46E5']}
              style={[styles.statCard, styles.ratingCard]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statContent}>
                <View style={styles.statIconWrapper}>
                  <Star size={24} color="#FFF" fill="#FFF" />
                </View>
                <View>
                  <Text style={styles.ratingValue}>{destination.rating}</Text>
                  <Text style={styles.ratingLabel}>Out of 5 Stars</Text>
                </View>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingBadgeText}>⭐ {destination.rating}/5</Text>
              </View>
            </LinearGradient>

            <View style={styles.statsRow}>
              <View style={[styles.statCard, styles.smallCard]}>
                <View style={[styles.statIconWrapper, styles.durationIcon]}>
                  <Clock size={20} color="#4F46E5" />
                </View>
                <Text style={styles.statMainValue}>{destination.duration}</Text>
                <Text style={styles.statLabel}>Hours</Text>
              </View>

              <View style={[styles.statCard, styles.smallCard]}>
                <View style={[styles.statIconWrapper, styles.costIcon]}>
                  <Banknote size={20} color="#10B981" />
                </View>
                <Text style={styles.statMainValue}>{destination.price}</Text>
                <Text style={styles.statLabel}>Avg Cost</Text>
              </View>
            </View>
          </View>

          {/* Audio Guide */}
          {destination.audioGuide && (
            <TouchableOpacity style={styles.audioGuideButton} onPress={toggleAudioPlayer}>
              <PlayCircle size={24} color="#FFFFFF" />
              <Text style={styles.audioGuideText}>Listen to Audio Guide</Text>
            </TouchableOpacity>
          )}

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description} numberOfLines={showFullDescription ? undefined : 5}>
              {destination.description}
            </Text>
            <TouchableOpacity style={styles.readMoreButton} onPress={toggleDescription}>
              <Text style={styles.readMoreText}>{showFullDescription ? 'Read Less' : 'Read More'}</Text>
              {showFullDescription ? (
                <ChevronUp size={16} color="#4F46E5" />
              ) : (
                <ChevronDown size={16} color="#4F46E5" />
              )}
            </TouchableOpacity>
          </View>

          {/* Gallery */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <ImageGallery images={destination.images} />
          </View>

          {/* How to Get There */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How to Get There</Text>
            <View style={styles.listContainer}>
              {destination.howToGetThere
                .split(/(?=Option \d+:)/g)
                .filter(option => option.trim())
                .map((option, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={styles.listMarker}>
                      {option.startsWith('Option') ? (
                        <Text style={styles.optionNumber}>{index + 1}</Text>
                      ) : (
                        <View style={styles.bullet} />
                      )}
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
            <Text style={styles.sectionTitle}>Best Time to Visit</Text>
            <Text style={styles.infoText}>{destination.bestTimeToVisit}</Text>
          </View>

          {/* Facilities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Facilities</Text>
            <View style={styles.facilitiesContainer}>
              {destination.facilities.map((facility, index) => (
                <View key={index} style={styles.facilityItem}>
                  <Text style={styles.facilityText}>{facility}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.spacer} />
        </View>
      </ScrollView>

      {showAudioPlayer && (
        <AudioPlayer
          title={destination.name}
          audioUrl={destination.audioGuide || ''}
          onClose={toggleAudioPlayer}
        />
      )}
    </View>
  );
}

// Keep your styles as is


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#64748B',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#EF4444',
    marginBottom: 16,
  },
  backButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#4F46E5',
  },
  imageContainer: {
    height: 350,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 120,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 48,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: '#4F46E5',
  },
  contentContainer: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#FFFFFF',
    marginTop: -32,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#1E293B',
    marginBottom: 8,
    lineHeight: 34,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  location: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  mapButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#4F46E5',
  },
  statsContainer: {
    marginBottom: 24,
    gap: 16,
  },
  ratingCard: {
    borderRadius: 20,
    padding: 24,
    elevation: 6,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  ratingValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    color: '#FFF',
    lineHeight: 40,
  },
  ratingLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#E0E7FF',
  },
  ratingBadge: {
    position: 'absolute',
    top: -12,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ratingBadgeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#4F46E5',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  smallCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  durationIcon: {
    backgroundColor: '#EEF2FF',
  },
  costIcon: {
    backgroundColor: '#D1FAE5',
  },
  statMainValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  audioGuideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 24,
    gap: 12,
    elevation: 4,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  audioGuideText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: '#1E293B',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 26,
    color: '#334155',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4F46E5',
    marginRight: 4,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 26,
    color: '#334155',
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  facilityItem: {
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  facilityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4F46E5',
  },
  listContainer: {
    gap: 16,
  },
  listItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  listMarker: {
    width: 24,
    alignItems: 'center',
  },
  optionNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#4F46E5',
    backgroundColor: '#EEF2FF',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#64748B',
    marginTop: 8,
  },
  listText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 26,
    color: '#334155',
    flex: 1,
  },
  spacer: {
    height: 60,
  },
});