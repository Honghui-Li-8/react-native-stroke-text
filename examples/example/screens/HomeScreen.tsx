import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { StrokeText } from '@charmy.tech/react-native-stroke-text';

export default function HomeScreen() {
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
        <Text style={styles.sectionTitle}>Thin Stroke</Text>
        <View style={styles.example}>
          <StrokeText
            text="Subtle Outline"
            fontSize={32}
            color="#4ECDC4"
            strokeColor="#1A1A1A"
            strokeWidth={1}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Large Text</Text>
        <View style={styles.example}>
          <StrokeText
            text="BIG TEXT"
            fontSize={60}
            color="#FFE66D"
            strokeColor="#FF6B6B"
            strokeWidth={4}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Small Text</Text>
        <View style={styles.example}>
          <StrokeText
            text="Small stroke text example"
            fontSize={16}
            color="#95E1D3"
            strokeColor="#2C3E50"
            strokeWidth={2}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text Alignment - Left</Text>
        <View style={[styles.example, styles.alignedExample]}>
          <StrokeText
            text="Left aligned text"
            fontSize={24}
            color="#FFFFFF"
            strokeColor="#000000"
            strokeWidth={3}
            align="left"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text Alignment - Center</Text>
        <View style={[styles.example, styles.alignedExample]}>
          <StrokeText
            text="Center aligned text"
            fontSize={24}
            color="#FFFFFF"
            strokeColor="#000000"
            strokeWidth={3}
            align="center"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text Alignment - Right</Text>
        <View style={[styles.example, styles.alignedExample]}>
          <StrokeText
            text="Right aligned text"
            fontSize={24}
            color="#FFFFFF"
            strokeColor="#000000"
            strokeWidth={3}
            align="right"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Variations</Text>
        <View style={styles.example}>
          <StrokeText
            text="Red on Blue"
            fontSize={28}
            color="#FF0000"
            strokeColor="#0000FF"
            strokeWidth={4}
          />
        </View>
        <View style={styles.example}>
          <StrokeText
            text="Green on Yellow"
            fontSize={28}
            color="#00FF00"
            strokeColor="#FFFF00"
            strokeWidth={4}
          />
        </View>
        <View style={styles.example}>
          <StrokeText
            text="White on Black"
            fontSize={28}
            color="#FFFFFF"
            strokeColor="#000000"
            strokeWidth={5}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Multi-line Text</Text>
        <View style={styles.example}>
          <StrokeText
            text="This is a longer text that will wrap to multiple lines when needed"
            fontSize={20}
            color="#9B59B6"
            strokeColor="#FFFFFF"
            strokeWidth={3}
            numberOfLines={3}
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
  alignedExample: {
    alignItems: 'stretch',
  },
});

