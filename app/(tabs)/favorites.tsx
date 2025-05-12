import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Star, Trash2 } from 'lucide-react-native';
import { useFavorites } from '@/context/FavoritesContext';
import { getDestinationsByIds } from '@/services/destinationService';
import { Destination } from '@/types';
import DestinationListItem from '@/components/DestinationListItem';
import EmptyState from '@/components/EmptyState';

export default function FavoritesScreen() {
  const { favorites, removeFavorite, clearAllFavorites } = useFavorites();
  const [favoritePlaces, setFavoritePlaces] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (favorites.length === 0) {
        setFavoritePlaces([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const places = await getDestinationsByIds(favorites);
        setFavoritePlaces(places);
      } catch (error) {
        console.error('Failed to load favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [favorites]);

  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E40AF" />
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        {favoritePlaces.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearAllFavorites}>
            <Trash2 size={20} color="#EF4444" />
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {favoritePlaces.length > 0 ? (
        <>
          <Text style={styles.favoriteCount}>
            {favoritePlaces.length} {favoritePlaces.length === 1 ? 'place' : 'places'}
          </Text>
          
          <FlatList
            data={favoritePlaces}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DestinationListItem 
                destination={item}
                showRemoveButton
                onRemove={() => handleRemoveFavorite(item.id)}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
        </>
      ) : (
        <EmptyState
          icon={<Star size={48} color="#E2E8F0" />}
          title="No favorites yet"
          description="Start exploring and add places to your favorites"
          buttonText="Discover Places"
          buttonRoute="/discover"
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
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  clearButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#EF4444',
    marginLeft: 8,
  },
  favoriteCount: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingBottom: 100,
  },
});