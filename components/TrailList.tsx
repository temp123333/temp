import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Trail } from '../services/hiddenTrail';

interface HiddenTrailProps {
  trail: Trail;
}

const TrailDetails: React.FC<HiddenTrailProps> = ({ trail }) => {
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: trail.image }} style={styles.image} />
      <View style={styles.detailContainer}>
        <Text style={styles.trailName}>{trail.name}</Text>
        <Text style={styles.location}>{trail.location}</Text>
        <Text style={styles.description}>{trail.description}</Text>

        <Text style={styles.detailTitle}>
          Difficulty: <Text style={styles.detailValue}>{trail.difficulty}</Text>
        </Text>
        <Text style={styles.detailTitle}>
          Best Season: <Text style={styles.detailValue}>{trail.bestSeason}</Text>
        </Text>
        <Text style={styles.detailTitle}>
          Duration: <Text style={styles.detailValue}>{trail.duration}</Text>
        </Text>
        <Text style={styles.detailTitle}>
          Elevation Gain: <Text style={styles.detailValue}>{trail.elevationGain}</Text>
        </Text>

        <Text style={styles.detailTitle}>Nearby Attractions:</Text>
        <View style={styles.attractions}>
          {trail.nearbyAttractions.map((attraction, index) => (
            <Text key={index} style={styles.attraction}>{attraction}</Text>
          ))}
        </View>

        <Text style={styles.detailTitle}>Recommended Gear:</Text>
        <View style={styles.gear}>
          {trail.recommendedGear.map((gear, index) => (
            <Text key={index} style={styles.gearItem}>{gear}</Text>
          ))}
        </View>

        <Text style={styles.detailTitle}>
          Trail Type: <Text style={styles.detailValue}>{trail.trailType}</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  detailContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  trailName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  location: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
  },
  attractions: {
    marginLeft: 20,
  },
  attraction: {
    fontSize: 16,
    color: '#555',
  },
  gear: {
    marginLeft: 20,
  },
  gearItem: {
    fontSize: 16,
    color: '#555',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default TrailDetails;
