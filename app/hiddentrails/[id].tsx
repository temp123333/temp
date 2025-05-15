import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Dimensions,
  Platform,
  Linking,
  StatusBar
} from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, Clock, TrendingUp, Tent, Map } from 'lucide-react-native';
import { hiddenTrails } from '@/services/hiddentrails';
import ImageGallery from '@/components/ImageGallery';

const { width } = Dimensions.get('window');

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

  const openInMaps = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${trail.coordinates.latitude},${trail.coordinates.longitude}`;
    const label = trail.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton} onPress={openInMaps}>
            <Map size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ImageGallery images={trail.images} />

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
            <Text style={styles.sectionTitle}>Highlights</Text>
            {trail.highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightItem}>
                <View style={styles.bullet} />
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
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
              <View key={index} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.listText}>{attraction}</Text>
              </View>
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
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight + 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  location: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#64748B',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginTop: 6,
  },
  statValue: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginTop: 2,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#334155',
    lineHeight: 26,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    backgroundColor: '#1E40AF',
    marginRight: 12,
  },
  highlightText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#334155',
    flex: 1,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#1E40AF',
  },
  difficultyText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#1E40AF',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  listText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#334155',
    flex: 1,
  },
  gearContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  gearItem: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  gearText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#1E293B',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFF1F2',
  },
  errorText: {
    fontSize: 20,
    color: '#DC2626',
    fontFamily: 'Poppins-Medium',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});
