import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { MapPin, Clock, TrendingUp, Star, ChevronRight } from 'lucide-react-native';
import { hiddenTrails } from '@/services/hiddentrails';

export default function HiddenTrailsScreen() {
  const renderTrailCard = ({ item }: { item: HiddenTrail }) => (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: getDifficultyColor(item.difficulty) }]}
      onPress={() => router.push(`/hiddentrails/${item.id}`)}
      activeOpacity={0.9}
    >
      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.name}</Text>
          {item.featured && (
            <View style={styles.featuredBadge}>
              <Star size={14} color="#fff" fill="#fff" />
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}
        </View>

        <View style={styles.locationRow}>
          <MapPin size={16} color="#64748B" />
          <Text style={styles.location}>{item.location}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Clock size={16} color="#64748B" />
            <Text style={styles.statText}>{item.duration}</Text>
          </View>

          <View style={styles.stat}>
            <TrendingUp size={16} color="#64748B" />
            <Text style={styles.statText}>{item.elevationGain}</Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>

          <View style={styles.ctaContainer}>
            <Text style={styles.ctaText}>Explore Trail</Text>
            <ChevronRight size={18} color="#3B82F6" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Hidden Trails',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 24,
            color: '#0F172A',
            
          },
          headerShadowVisible: false,
        }}
      />
      <FlatList
        data={hiddenTrails}
        renderItem={renderTrailCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.listHeader}>Hidden Trails</Text>
            <Text style={styles.subHeader}>Explore offbeat trails, filtered by difficulty</Text>
          </View>
        }
      />
    </>
  );
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy': 
      return '#10B981';     // Emerald
    case 'moderate': 
      return '#F59E0B';     // Amber
    case 'hard': 
    case 'challenging':     // treat 'challenging' as red
      return '#EF4444';     // Red
    case 'expert': 
      return '#7C3AED';     // Purple
    default: 
      return '#3B82F6';     // Blue
  }
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    marginBottom: 20,
    paddingTop: 24,
  },
  listHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: 'capitalize',
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#0F172A',
    lineHeight: 40,
  },
  subHeader: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '400',
    fontStyle: 'normal',
    marginBottom: 10,
    marginTop: 6,
    lineHeight: 22,
    letterSpacing: 0.15,
  },
  card: {
    borderRadius: 18,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 14,
      },
      android: {
        elevation: 7,
        shadowColor: '#000',
      },
    }),
  },
  cardContent: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F172A',
    flex: 1,
    marginBottom: 6,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 5,
  },
  featuredText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  location: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginLeft: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#475569',
    marginLeft: 8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyText: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#3B82F6',
    marginRight: 6,
    textDecorationLine: 'underline',
    textDecorationColor: '#3B82F6',
    textDecorationStyle: 'solid',
  },
});
