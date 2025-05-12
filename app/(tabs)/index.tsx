import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Search, Play, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getTopDestinations, getNearbyAttractions, getInterests } from '@/services/destinationService';
import { Destination, Interest } from '@/types';
import DestinationCard from '@/components/DestinationCard';
import InterestChip from '@/components/InterestChip';
import SearchBar from '@/components/SearchBar';

export default function HomeScreen() {
  const [topDestinations, setTopDestinations] = useState<Destination[]>([]);
  const [nearbyAttractions, setNearbyAttractions] = useState<Destination[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const topDest = await getTopDestinations();
        const nearby = await getNearbyAttractions();
        const interestData = await getInterests();
        
        setTopDestinations(topDest);
        setNearbyAttractions(nearby);
        setInterests(interestData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSelectInterest = (id: string) => {
    setSelectedInterest(selectedInterest === id ? null : id);
  };

  const handleDestinationPress = (id: string) => {
    router.push(`/destination/${id}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Namaste</Text>
          <Text style={styles.headerTitle}>Discover Hidden Gems in Nepal</Text>
        </View>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg' }}
          style={styles.avatar}
        />
      </View>

      <SearchBar />

      <View style={styles.interestsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore by Interest</Text>
        </View>
        <FlatList
          data={interests}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <InterestChip
              interest={item}
              isSelected={selectedInterest === item.id}
              onSelect={() => handleSelectInterest(item.id)}
            />
          )}
          contentContainerStyle={styles.interestsList}
        />
      </View>

      <View style={styles.featuredContainer}>
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => handleDestinationPress('featured001')}
          style={styles.featuredCard}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2698413/pexels-photo-2698413.jpeg' }}
            style={styles.featuredImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.featuredGradient}
          >
            <View style={styles.audioGuideTag}>
              <Play size={12} color="#ffffff" />
              <Text style={styles.audioGuideText}>Audio Guide</Text>
            </View>
            <Text style={styles.featuredTitle}>Gosainkunda Lake</Text>
            <Text style={styles.featuredSubtitle}>
              A sacred alpine freshwater lake in Langtang National Park
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Hidden Gems</Text>
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
    paddingTop: 60,
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
  interestsContainer: {
    marginTop: 16,
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
  interestsList: {
    paddingLeft: 16,
    paddingRight: 8,
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
  featuredContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  featuredCard: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  audioGuideTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B91C1C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  audioGuideText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#ffffff',
    marginLeft: 4,
  },
  featuredTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#ffffff',
  },
  featuredSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#E2E8F0',
    marginTop: 4,
  },
  section: {
    marginTop: 24,
  },
  destinationsList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  spacer: {
    height: 100,
  },
});