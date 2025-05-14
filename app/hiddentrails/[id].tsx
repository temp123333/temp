import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, Clock, TrendingUp, Tent } from 'lucide-react-native';
import { hiddenTrails } from '@/services/hiddentrails';

export default function TrailDetailScreen() {
  const { id } = useLocalSearchParams();
  const trail = hiddenTrails.find(t => t.id.toString() === id);

  if (!trail) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Trail not found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: false
        }} 
      />
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: trail.imageUrl }} 
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.backButtonContainer}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{trail.name}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#64748B" />
            <Text style={styles.location}>{trail.location}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Clock size={20} color="#1E40AF" />
              <Text style={styles.statLabel}>Duration</Text>
              <Text style={styles.statValue}>{trail.duration}</Text>
            </View>

            <View style={styles.statItem}>
              <TrendingUp size={20} color="#1E40AF" />
              <Text style={styles.statLabel}>Elevation</Text>
              <Text style={styles.statValue}>{trail.elevationGain}</Text>
            </View>

            <View style={styles.statItem}>
              <Calendar size={20} color="#1E40AF" />
              <Text style={styles.statLabel}>Best Season</Text>
              <Text style={styles.statValue}>{trail.bestSeason}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About the Trail</Text>
            <Text style={styles.description}>{trail.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Difficulty Level</Text>
            <View style={styles.difficultyContainer}>
              <Tent size={20} color="#1E40AF" />
              <Text style={styles.difficultyText}>{trail.difficulty}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nearby Attractions</Text>
            {trail.nearbyAttractions.map((attraction, index) => (
              <Text key={index} style={styles.listItem}>• {attraction}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended Gear</Text>
            <View style={styles.gearContainer}>
              {trail.recommendedGear.map((gear, index) => (
                <View key={index} style={styles.gearItem}>
                  <Text style={styles.gearText}>{gear}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    marginBottom: 20,
    fontFamily: 'Poppins-Medium',
  },
  backButton: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
    marginTop: -20,
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    marginLeft: 8,
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Poppins-Medium',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
  statValue: {
    fontSize: 14,
    color: '#1E293B',
    marginTop: 2,
    fontFamily: 'Poppins-SemiBold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
  },
  difficultyText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#1E40AF',
    fontFamily: 'Poppins-Medium',
  },
  listItem: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  gearContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gearItem: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  gearText: {
    fontSize: 14,
    color: '#1E293B',
    fontFamily: 'Poppins-Medium',
  },
});