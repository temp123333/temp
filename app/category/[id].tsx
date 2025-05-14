import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { getDestinationsByCategory, getCategories } from '@/services/destinationService';
import { Destination, Category } from '@/types';
import DestinationListItem from '@/components/DestinationListItem';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const categories = await getCategories();
      const currentCategory = categories.find(c => c.id === id);
      setCategory(currentCategory || null);

      const categoryDestinations = await getDestinationsByCategory(id);
      setDestinations(categoryDestinations);
    } catch (error) {
      console.error('Failed to load category data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E40AF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowLeft size={24} color="#1E293B" onPress={() => router.back()} />
        <Text style={styles.title}>{category?.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={destinations}
        renderItem={({ item }) => <DestinationListItem destination={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No destinations found</Text>
          </View>
        }
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1E293B',
  },
  list: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#64748B',
  },
});