import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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
          <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} onPress={openInMaps}>
            <Map size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{trail.name}</Text>

          <View style={styles.locationRow}>
            <MapPin size={18} color="#64748B" />
            <Text style={styles.location}>{trail.location}</Text>
          </View>

          <View style={styles.galleryWrapper}>
            <ImageGallery images={trail.images} />
          </View>

          <View style={styles.statsCard}>
            <Stat icon={<Clock size={18} color="#1D4ED8" />} label="Duration" value={trail.duration} />
            <Stat icon={<TrendingUp size={18} color="#1D4ED8" />} label="Elevation" value={trail.elevationGain} />
            <Stat icon={<Calendar size={18} color="#1D4ED8" />} label="Best Season" value={trail.bestSeason} />
          </View>

          <Section title="🌿 About the Trail" content={trail.description} />

          <Section title="✨ Highlights">
            {trail.highlights.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </Section>

          <Section title="🌄 Difficulty Level">
            <View style={styles.difficultyBox}>
              <Tent size={18} color="#1D4ED8" />
              <Text style={styles.difficultyText}>{trail.difficulty}</Text>
            </View>
          </Section>

          <Section title="🏞️ Nearby Attractions">
            {trail.nearbyAttractions.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </Section>

          <Section title="⛰️ Recommended Gear">
            <View style={styles.gearWrap}>
              {trail.recommendedGear.map((gear, index) => (
                <View key={index} style={styles.gearItem}>
                  <Text style={styles.gearText}>{gear}</Text>
                </View>
              ))}
            </View>
          </Section>
        </View>
      </ScrollView>
    </>
  );
}

function Stat({ icon, label, value }) {
  return (
    <View style={styles.statBox}>
      {icon}
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function Section({ title, content, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {content && <Text style={styles.sectionText}>{content}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight + 10,
    zIndex: 99,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBtn: {
    backgroundColor: 'rgba(30,41,59,0.85)',
    padding: 10,
    borderRadius: 24,
  },
  contentContainer: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 100 : 120,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    fontSize: 15,
    marginLeft: 6,
    color: '#475569',
  },
  galleryWrapper: {
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 30,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 5,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 24,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: 10,
    backgroundColor: '#1D4ED8',
  },
  listText: {
    fontSize: 15,
    color: '#334155',
    flex: 1,
  },
  difficultyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#1D4ED8',
  },
  difficultyText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
    color: '#1D4ED8',
  },
  gearWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gearItem: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  gearText: {
    fontSize: 14,
    color: '#0369A1',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#DC2626',
    marginBottom: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
