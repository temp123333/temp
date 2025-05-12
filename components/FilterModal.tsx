import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import { Interest } from '@/types';
import InterestChip from './InterestChip';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  interests: Interest[];
  selectedInterests: string[];
  onSelectInterest: (id: string) => void;
  onClearAll: () => void;
}

export default function FilterModal({
  visible,
  onClose,
  interests,
  selectedInterests,
  onSelectInterest,
  onClearAll
}: FilterModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Filter</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#1E293B" />
            </TouchableOpacity>
          </View>
          
          <ScrollView>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Interests</Text>
                {selectedInterests.length > 0 && (
                  <TouchableOpacity onPress={onClearAll}>
                    <Text style={styles.clearText}>Clear All</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <View style={styles.interestsContainer}>
                {interests.map(interest => (
                  <InterestChip
                    key={interest.id}
                    interest={interest}
                    isSelected={selectedInterests.includes(interest.id)}
                    onSelect={() => onSelectInterest(interest.id)}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <View style={styles.priceContainer}>
                <TouchableOpacity style={[styles.priceButton, styles.activePriceButton]}>
                  <Text style={styles.activePriceText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.priceButton}>
                  <Text style={styles.priceText}>Free</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.priceButton}>
                  <Text style={styles.priceText}>$</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.priceButton}>
                  <Text style={styles.priceText}>$$</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.priceButton}>
                  <Text style={styles.priceText}>$$$</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Duration</Text>
              <View style={styles.durationContainer}>
                <TouchableOpacity style={[styles.durationButton, styles.activeDurationButton]}>
                  <Text style={styles.activeDurationText}>Any</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.durationButton}>
                  <Text style={styles.durationText}>&lt; 1h</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.durationButton}>
                  <Text style={styles.durationText}>1-3h</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.durationButton}>
                  <Text style={styles.durationText}>Half-day</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.durationButton}>
                  <Text style={styles.durationText}>Full-day</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.durationButton}>
                  <Text style={styles.durationText}>Multi-day</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.resetButton} onPress={onClearAll}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
  },
  closeButton: {
    padding: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 16,
  },
  clearText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#EF4444',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  priceContainer: {
    flexDirection: 'row',
  },
  priceButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  activePriceButton: {
    backgroundColor: '#EFF6FF',
    borderColor: '#1E40AF',
  },
  priceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  activePriceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E40AF',
  },
  durationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  durationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
    marginBottom: 8,
  },
  activeDurationButton: {
    backgroundColor: '#EFF6FF',
    borderColor: '#1E40AF',
  },
  durationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  activeDurationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E40AF',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  resetText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#64748B',
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#1E40AF',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  applyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});