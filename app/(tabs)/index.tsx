import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { Search, ChevronRight, Calendar, MapPin, Star, Compass, Mountain, BookOpen } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { getTopDestinations, getNearbyAttractions } from '@/services/destinationService';
import { Destination } from '@/types';
import DestinationCard from '@/components/DestinationCard';
import SearchBar from '@/components/SearchBar';

// Helper function to darken colors for gradients
const darkenColor = (color: string, percent: number) => {
  // Implementation would depend on your color handling
  return color; // Replace with actual color manipulation
};

const quickFilters = [
  { 
    id: 'heritage', 
    name: 'Heritage', 
    icon: Compass, 
    color: '#B45309',
    description: 'Ancient temples & historical sites' 
  },
  { 
    id: 'nearby', 
    name: 'Near You', 
    icon: MapPin, 
    color: '#10B981',
    description: 'Attractions close to your location' 
  },
  { 
    id: 'himalayas', 
    name: 'Himalayas', 
    icon: Mountain, 
    color: '#3B82F6',
    description: 'Majestic mountain destinations' 
  },
  { 
    id: 'cultural', 
    name: 'Cultural', 
    icon: BookOpen, 
    color: '#8B5CF6',
    description: 'Festivals & local traditions' 
  }
];

const nepaliHighlights = [
  {
    title: 'Local Wisdom',
    description: 'Tips from Nepali guides for authentic experiences',
    icon: BookOpen,
    color: '#B45309'
  },
  {
    title: 'Hidden Trails',
    description: 'Lesser-known paths recommended by locals',
    icon: Mountain,
    color: '#10B981'
  }
];

export default function HomeScreen() {
  const [topDestinations, setTopDestinations] = useState<Destination[]>([]);
  const [nearbyAttractions, setNearbyAttractions] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const topDest = await getTopDestinations();
        const nearby = await getNearbyAttractions();
        
        setTopDestinations(topDest);
        setNearbyAttractions(nearby);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } else {
        Alert.alert(
          'Location Permission',
          'Please enable location services to discover nearby attractions.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Implement search logic here
  };

  const handleDestinationPress = (id: string) => {
    router.push(`/destination/${id}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Namaste</Text>
          <Text style={styles.headerTitle}>Discover Nepal's Hidden Gems</Text>
        </View>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg' }}
          style={styles.avatar}
        />
      </View>

      <SearchBar value={searchQuery} onChangeText={handleSearch} />

      <View style={styles.quickFiltersContainer}>
        <Text style={styles.sectionSubtitle}>Explore Nepal</Text>
        <View style={styles.filtersRow}>
          {quickFilters.map((filter) => (
            <TouchableOpacity 
              key={filter.id}
              style={styles.quickFilterCard}
              onPress={() => router.push(`/discover?filter=${filter.id}`)}
            >
              <LinearGradient
                colors={[filter.color, darkenColor(filter.color, 20)]}
                style={styles.quickFilterGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <filter.icon size={28} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.filterTextContainer}>
                <Text style={styles.quickFilterText}>{filter.name}</Text>
                <Text style={styles.quickFilterDescription}>{filter.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.highlightsContainer}>
        {nepaliHighlights.map((highlight, index) => (
          <View key={index} style={styles.highlightCard}>
            <View style={[styles.highlightIcon, { backgroundColor: highlight.color }]}>
              <highlight.icon size={24} color="#FFFFFF" />
            </View>
            <View style={styles.highlightContent}>
              <Text style={styles.highlightTitle}>{highlight.title}</Text>
              <Text style={styles.highlightDescription}>{highlight.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <TouchableOpacity onPress={() => router.push('/discover')}>
            <View style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color="#1E40AF" />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={topDestinations}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DestinationCard 
              destination={item} 
              onPress={() => handleDestinationPress(item.id)}
            />
          )}
          contentContainerStyle={styles.destinationsList}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Attractions</Text>
          <TouchableOpacity onPress={() => router.push('/map')}>
            <View style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View Map</Text>
              <ChevronRight size={16} color="#1E40AF" />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={nearbyAttractions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DestinationCard 
              destination={item} 
              onPress={() => handleDestinationPress(item.id)}
              compact
            />
          )}
          contentContainerStyle={styles.destinationsList}
        />
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1E40AF',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#1E293B',
    width: '90%',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  quickFiltersContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 16,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickFilterCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  quickFilterGradient: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTextContainer: {
    padding: 12,
  },
  quickFilterText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 4,
  },
  quickFilterDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  highlightsContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  highlightCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  highlightIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  highlightContent: {
    flex: 1,
  },
  highlightTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  highlightDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E40AF',
  },
  destinationsList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  spacer: {
    height: 100,
  },
});