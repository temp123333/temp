import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Filter, Search } from 'lucide-react-native';
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
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(query) || 
        dest.region.toLowerCase().includes(query) ||
        dest.description.toLowerCase().includes(query)
      );
    }
    
    // Apply interest filters
    if (selectedInterests.length > 0) {
      filtered = filtered.filter(dest => 
        dest.interests.some(interest => selectedInterests.includes(interest))
      );
    }
    
    setFilteredDestinations(filtered);
  };

  const handleSelectInterest = (id: string) => {
    setSelectedInterests(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E40AF" />
        <Text style={styles.loadingText}>Loading destinations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
          <Filter size={24} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <SearchBar value={searchQuery} onChangeText={handleSearch} />

      <View style={styles.interestsContainer}>
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
      </View>

      {selectedInterests.length > 0 && (
        <TouchableOpacity onPress={clearAllFilters} style={styles.clearFiltersButton}>
          <Text style={styles.clearFiltersText}>Clear All Filters</Text>
        </TouchableOpacity>
      )}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredDestinations.length} {filteredDestinations.length === 1 ? 'place' : 'places'} found
        </Text>
      </View>

      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DestinationListItem destination={item} />
        )}
        contentContainerStyle={styles.destinationsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No destinations found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  filterButton: {
    padding: 8,
  },
  interestsContainer: {
    marginTop: 8,
  },
  interestsList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  clearFiltersButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 16,
  },
  clearFiltersText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#EF4444',
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  resultsText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  destinationsList: {
    paddingBottom: 100,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#1E293B',
  },
  emptySubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
  },
});