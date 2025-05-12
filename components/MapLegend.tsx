import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { X } from 'lucide-react-native';

const legendItems = [
  { color: '#4ADE80', label: 'Trekking Destinations' },
  { color: '#60A5FA', label: 'Cultural Sites' },
  { color: '#F472B6', label: 'Nature Spots' },
  { color: '#F87171', label: 'Adventure Locations' },
  { color: '#FBBF24', label: 'Other' }
];

interface MapLegendProps {
  onClose: () => void;
}

export default function MapLegend({ onClose }: MapLegendProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Map Legend</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={legendItems}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <View style={styles.legendItem}>
            <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 120,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  closeButton: {
    padding: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  legendLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#334155',
  },
});