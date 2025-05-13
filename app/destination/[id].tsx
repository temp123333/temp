import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MapPin, Star, Clock, Banknote, Bookmark, CirclePlay as PlayCircle, ChevronDown, ChevronUp, Map } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getDestinationById } from '@/services/destinationService';
import { useFavorites } from '@/context/FavoritesContext';
import { Destination } from '@/types';
import ImageGallery from '@/components/ImageGallery';
import AudioPlayer from '@/components/AudioPlayer';

const { width } = Dimensions.get('window');

export default function DestinationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  
  const isFavorite = favorites.includes(id);

  useEffect(() => {
    const loadDestination = async () => {
      try {
        setIsLoading(true);
        const data = await getDestinationById(id);
        setDestination(data);
      } catch (error) {
        console.error('Failed to load destination:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadDestination();
    }
  }, [id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleAudioPlayer = () => {
    setShowAudioPlayer(!showAudioPlayer);
  };

  const viewOnMap = () => {
    if (destination) {
      router.push({
        pathname: '/(tabs)/map',
        params: {
          lat: destination.coordinates.latitude,
          lng: destination.coordinates.longitude,
          zoom: 12
        }
      });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E40AF" />
        <Text style={styles.loadingText}>Loading destination details...</Text>
      </View>
    );
  }

  if (!destination) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Destination not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButton}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: destination.images[0] }}
            style={styles.headerImage}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.headerGradient}
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
            onPress={toggleFavorite}
          >
            <Bookmark size={24} color={isFavorite ? "#FFFFFF" : "#FFFFFF"} fill={isFavorite ? "#FFFFFF" : "transparent"} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{destination.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#64748B" />
              <Text style={styles.location}>{destination.region}, Nepal</Text>
              <TouchableOpacity style={styles.mapButton} onPress={viewOnMap}>
                <Map size={16} color="#1E40AF" />
                <Text style={styles.mapButtonText}>View on Map</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Enhanced Stats Section */}
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
                  <Clock size={20} color="#3B82F6" />
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

          {destination.audioGuide && (
            <TouchableOpacity 
              style={styles.audioGuideButton}
              onPress={toggleAudioPlayer}
            >
              <PlayCircle size={24} color="#FFFFFF" />
              <Text style={styles.audioGuideText}>Listen to Audio Guide</Text>
            </TouchableOpacity>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description} numberOfLines={showFullDescription ? undefined : 5}>
              {destination.description}
            </Text>
            <TouchableOpacity style={styles.readMoreButton} onPress={toggleDescription}>
              <Text style={styles.readMoreText}>
                {showFullDescription ? 'Read Less' : 'Read More'}
              </Text>
              {showFullDescription ? (
                <ChevronUp size={16} color="#1E40AF" />
              ) : (
                <ChevronDown size={16} color="#1E40AF" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <ImageGallery images={destination.images} />
          </View>

          // Update the "How to Get There" section JSX
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
            {option
              .replace(/\.$/, '')
              .replace(/([a-z])([A-Z])/g, '$1. $2')
              .trim()}
          </Text>
        </View>
      ))}
  </View>
</View>


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Best Time to Visit</Text>
            <Text style={styles.infoText}>{destination.bestTimeToVisit}</Text>
          </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  errorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#EF4444',
    marginBottom: 16,
  },
  imageContainer: {
    height: 300,
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
    height: 100,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: '#B91C1C',
  },
  contentContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#F8FAFC',
    marginTop: -24,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  titleSection: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 8,
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
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  mapButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#1E40AF',
  },
  statsContainer: {
    marginBottom: 24,
    gap: 16,
  },
  ratingCard: {
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
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
  },
  ratingValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
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
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    elevation: 2,
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
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  durationIcon: {
    backgroundColor: '#DBEAFE',
  },
  costIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    backgroundColor: '#D1FAE5',
  },
  statMainValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
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
    backgroundColor: '#1E40AF',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 16,
    gap: 8,
  },
  audioGuideText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: '#1E293B',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    lineHeight: 24,
    color: 'black',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  readMoreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E40AF',
    marginRight: 4,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  facilityItem: {
    backgroundColor: '#E0F2FE',
    borderColor: '#BFDBFE',
    borderWidth: 1,

    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  facilityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E40AF',
  },
  spacer: {
    height: 40,
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
  color: '#1E40AF',
  backgroundColor: '#EFF6FF',
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
  lineHeight: 24,
  color: '#334155',
  flex: 1,
},
});