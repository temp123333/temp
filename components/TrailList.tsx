import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { colors, spacing, typography, shadows, borderRadius } from '@/constants/theme';
import ImageWithLoading from './ImageWithLoading';
import Card from './Card';

interface Trail {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  difficulty: string;
  bestSeason: string;
  duration: string;
  elevationGain: string;
  nearbyAttractions: string[];
  recommendedGear: string[];
  trailType: string;
}

interface HiddenTrailProps {
  trail: Trail;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TrailDetails: React.FC<HiddenTrailProps> = ({ trail }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <ImageWithLoading 
          source={{ uri: trail.image }} 
          width={SCREEN_WIDTH} 
          height={250}
          style={styles.image} 
        />
        <View style={styles.imageOverlay} />
        <Text style={styles.trailName}>{trail.name}</Text>
        <Text style={styles.location}>{trail.location}</Text>
      </View>

      <Card style={styles.detailContainer}>
        <Text style={styles.description}>{trail.description}</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Difficulty</Text>
            <Text style={styles.statValue}>{trail.difficulty}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Best Season</Text>
            <Text style={styles.statValue}>{trail.bestSeason}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>{trail.duration}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Elevation Gain</Text>
            <Text style={styles.statValue}>{trail.elevationGain}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Attractions</Text>
          <View style={styles.attractions}>
            {trail.nearbyAttractions.map((attraction: string, index: number) => (
              <View key={index} style={styles.attractionItem}>
                <Text style={styles.attractionText}>{attraction}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Gear</Text>
          <View style={styles.gearGrid}>
            {trail.recommendedGear.map((gear: string, index: number) => (
              <View key={index} style={styles.gearItem}>
                <Text style={styles.gearText}>{gear}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trail Type</Text>
          <Text style={styles.trailType}>{trail.trailType}</Text>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  imageContainer: {
    position: 'relative',
    height: 250,
    marginBottom: spacing.lg,
  },
  image: {
    width: '100%',
    height: 250,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  trailName: {
    ...typography.h1,
    color: colors.gray[50],
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.lg,
    right: spacing.lg,
  },
  location: {
    ...typography.subtitle1,
    color: colors.gray[100],
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
  },
  detailContainer: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  description: {
    ...typography.body1,
    color: colors.gray[700],
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
    marginBottom: spacing.xl,
  },
  statItem: {
    width: '50%',
    padding: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.gray[500],
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.subtitle1,
    color: colors.gray[800],
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.gray[800],
    marginBottom: spacing.md,
  },
  attractions: {
    marginLeft: -spacing.xs,
  },
  attractionItem: {
    backgroundColor: colors.primary[50],
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  attractionText: {
    ...typography.body2,
    color: colors.primary[700],
  },
  gearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  gearItem: {
    backgroundColor: colors.gray[200],
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    margin: spacing.xs,
  },
  gearText: {
    ...typography.caption,
    color: colors.gray[700],
  },
  trailType: {
    ...typography.body1,
    color: colors.gray[700],
    backgroundColor: colors.gray[200],
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
});

export default TrailDetails;
