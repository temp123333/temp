import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { MapPin, Clock, TrendingUp } from 'lucide-react-native';
import { hiddenTrails } from '@/services/hiddentrails';

export default function HiddenTrailsScreen() {
  const renderTrailCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push(`/hiddentrails/${item.id}`)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={16} color="#FFFFFF" />
          <Text style={styles.location}>{item.location}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Clock size={14} color="#FFFFFF" />
            <Text style={styles.statText}>{item.duration}</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.stat}>
            <TrendingUp size={14} color="#FFFFFF" />
            <Text style={styles.statText}>{item.elevationGain}</Text>
          </View>
        </View>

        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Hidden Trails',
          headerStyle: {
            backgroundColor: '#F8FAFC',
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
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
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 12,
  },
  difficultyBadge: {
    position: 'absolute',
    top: -240,
    right: 16,
    backgroundColor: 'rgba(30, 64, 175, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
});