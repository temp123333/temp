import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { router } from 'expo-router';
import { Search, Play, ChevronRight, MapPin, Star } from 'lucide-react-native';
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
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(30))[0];

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [topDest, nearby, interestData] = await Promise.all([
          getTopDestinations(),
          getNearbyAttractions(),
          getInterests()
        ]);
        
        setTopDestinations(topDest);
        setNearbyAttractions(nearby);
        setInterests(interestData);
        
        // Start animations when data is loaded
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 600,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          })
        ]).start();
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
    <Animated.ScrollView 
      style={[styles.container, { opacity: fadeAnim }]}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={[styles.header, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Namaste, User!</Text>
          <Text style={styles.headerTitle}>Discover Hidden Gems in Nepal</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
        <SearchBar />
      </Animated.View>

      <Animated.View style={[styles.interestsContainer, { opacity: fadeAnim }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore by Interest</Text>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>See more</Text>
          </TouchableOpacity>
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
      </Animated.View>

      <Animated.View style={[styles.featuredContainer, { opacity: fadeAnim }]}>
        <Text style={styles.featuredLabel}>Featured Destination</Text>
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => handleDestinationPress('featured001')}
          style={styles.featuredCard}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2698413/pexels-photo-2698413.jpeg' }}
            style={styles.featuredImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
            locations={[0, 0.6, 1]}
            style={styles.featuredGradient}
          >
            <View style={styles.featuredBadges}>
              <View style={styles.audioGuideTag}>
                <Play size={12} color="#ffffff" fill="#ffffff" />
                <Text style={styles.audioGuideText}>Audio Guide</Text>
              </View>
              <View style={styles.ratingTag}>
                <Star size={12} color="#FFD700" fill="#FFD700" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
            <View>
              <View style={styles.locationTag}>
                <MapPin size={14} color="#ffffff" />
                <Text style={styles.locationText}>Langtang National Park</Text>
              </View>
              <Text style={styles.featuredTitle}>Gosainkunda Lake</Text>
              <Text style={styles.featuredSubtitle}>
                Sacred alpine lake at 4,380m altitude with stunning Himalayan views
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Top Hidden Gems</Text>
            <View style={styles.titleUnderline} />
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/discover')}
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRight size={16} color="#1E40AF" />
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
      </Animated.View>

      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Nearby Attractions</Text>
            <View style={styles.titleUnderline} />
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/map')}
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>View Map</Text>
            <ChevronRight size={16} color="#1E40AF" />
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
      </Animated.View>

      <View style={styles.spacer} />
    </Animated.ScrollView>
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
    alignItems: 'flex-start',
    paddingHorizontal: 24,
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
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 32,
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
    marginTop: 24,
    paddingHorizontal: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    position: 'relative',
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1E293B',
  },
  titleUnderline: {
    position: 'absolute',
    bottom: -4,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#1E40AF',
    opacity: 0.3,
    borderRadius: 2,
  },
  interestsList: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 4,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  viewAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E40AF',
    marginRight: 2,
  },
  seeMoreText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  featuredContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  featuredLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
    marginLeft: 4,
  },
  featuredCard: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  featuredBadges: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  audioGuideTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(185, 28, 28, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  audioGuideText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#ffffff',
    marginLeft: 4,
  },
  ratingTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#FFD700',
    marginLeft: 4,
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#E2E8F0',
    marginLeft: 4,
  },
  featuredTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    lineHeight: 28,
    color: '#ffffff',
  },
  featuredSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#E2E8F0',
    marginTop: 6,
    lineHeight: 20,
  },
  section: {
    marginTop: 28,
  },
  destinationsList: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  spacer: {
    height: 100,
  },
});