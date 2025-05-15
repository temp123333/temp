import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Filter } from 'lucide-react-native';
import { Destination, Interest } from '@/types';
import { getAllDestinations, getInterests } from '@/services/destinationService';
import DestinationListItem from '@/components/DestinationListItem';
import InterestChip from '@/components/InterestChip';
import SearchBar from '@/components/SearchBar';
import FilterModal from '@/components/FilterModal';

export default function DiscoverScreen() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const destinationsData = await getAllDestinations();
        const interestsData = await getInterests();

        setDestinations(destinationsData);
        setFilteredDestinations(destinationsData);
        setInterests(interestsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedInterests]);

  const applyFilters = () => {
    let filtered = destinations;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (dest) =>
          dest.name.toLowerCase().includes(query) ||
          dest.region.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query)
      );
    }

    if (selectedInterests.length > 0) {
      filtered = filtered.filter((dest) =>
        dest.interests.some((interest) => selectedInterests.includes(interest))
      );
    }

    setFilteredDestinations(filtered);
  };

  const handleSelectInterest = (id: string) => {
    setSelectedInterests((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearAllFilters = () => {
    setSelectedInterests([]);
    setSearchQuery('');
  };

  if (isLoading) {
    return (
      <Animated.View entering={FadeInUp} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B4A" />
        <Text style={styles.loadingText}>Exploring destinations...</Text>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FDF6F0" barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <Animated.View entering={FadeInDown} style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
            <Filter size={22} color="#FFF" />
            <Text style={styles.filterButtonText}>Filters</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Search */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search destinations, regions..."
            style={styles.searchBar}
          />
        </Animated.View>

        {/* Interests scroll */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.interestsContainer}>
          <FlatList
            data={interests}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <InterestChip
                interest={item}
                isSelected={selectedInterests.includes(item.id)}
                onSelect={() => handleSelectInterest(item.id)}
              />
            )}
            contentContainerStyle={styles.interestsList}
          />
        </Animated.View>

        {/* Clear filters */}
        {selectedInterests.length > 0 && (
          <Animated.View entering={FadeInDown.delay(300)} style={styles.clearFiltersContainer}>
            <TouchableOpacity onPress={clearAllFilters} style={styles.clearFiltersButton}>
              <Text style={styles.clearFiltersText}>Reset Filters</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Results */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredDestinations.length} {filteredDestinations.length === 1 ? 'place' : 'places'} found
          </Text>
        </Animated.View>

        {/* Destination list */}
        <FlatList
          data={filteredDestinations}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInUp.delay(100 * index)}>
              <DestinationListItem destination={item} />
            </Animated.View>
          )}
          contentContainerStyle={styles.destinationsList}
          ListEmptyComponent={
            <Animated.View entering={FadeInUp} style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No destinations found</Text>
              <Text style={styles.emptySubtext}>Try different filters or search terms</Text>
            </Animated.View>
          }
        />

        <FilterModal
          visible={showFilters}
          onClose={() => setShowFilters(false)}
          interests={interests}
          selectedInterests={selectedInterests}
          onSelectInterest={handleSelectInterest}
          onClearAll={clearAllFilters}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6F0', // Warm, creamy background
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF6F0',
  },
  loadingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FF6B4A',
    marginTop: 16,
    letterSpacing: 0.3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 36,
    color: '#2D2D2D',
    letterSpacing: -0.5,
    lineHeight: 44,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B4A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#FF6B4A',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  filterButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    marginLeft: 6,
    letterSpacing: 0.2,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EDEDED',
    shadowColor: '#2D2D2D',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  interestsContainer: {
    height: 60,
    marginBottom: 16,
  },
  interestsList: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  clearFiltersContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  clearFiltersButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF6B4A',
    shadowColor: '#2D2D2D',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  clearFiltersText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FF6B4A',
    letterSpacing: 0.3,
  },
  resultsHeader: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    marginBottom: 16,
  },
  resultsText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#4A4A4A',
    letterSpacing: 0.2,
  },
  destinationsList: {
    paddingBottom: 120,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginTop: 16,
    shadowColor: '#2D2D2D',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  emptyText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#2D2D2D',
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});