import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { StrokeText } from '@charmy.tech/react-native-stroke-text';

export default function App() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Stroke Text</Text>
        <View style={styles.example}>
          <StrokeText
            text="Hello World"
            fontSize={40}
            color="#FFFFFF"
            strokeColor="#000000"
            strokeWidth={2}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thick Stroke</Text>
        <View style={styles.example}>
          <StrokeText
            text="Bold Stroke"
            fontSize={36}
            color="#FF6B6B"
            strokeColor="#2C3E50"
            strokeWidth={8}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colorful Example</Text>
        <View style={styles.example}>
          <StrokeText
            text="Colorful Text"
            fontSize={32}
            color="#4ECDC4"
            strokeColor="#FF6B6B"
            strokeWidth={4}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  example: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'center',
  },
});

