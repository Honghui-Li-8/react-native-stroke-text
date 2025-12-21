import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { StrokeText } from '@charmy.tech/react-native-stroke-text';

export default function FontsScreen() {
  const [fontsLoaded, fontError] = useFonts({
    // Using system fonts for demonstration
    // In a real app, you would load custom font files here
    // Example: 'CustomFont': require('../assets/fonts/CustomFont.ttf'),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setIsReady(true);
    }
  }, [fontsLoaded, fontError]);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Font (Default)</Text>
        <Text style={styles.description}>
          Using default system font without specifying fontFamily
        </Text>
        <View style={styles.example}>
          <StrokeText
            text="System Font Example"
            fontSize={32}
            color="#FFFFFF"
            strokeColor="#000000"
            strokeWidth={3}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Font Family</Text>
        <Text style={styles.description}>
          To use custom fonts, load them with expo-font and specify the fontFamily prop.
          Example: fontFamily="Nunito-Black"
        </Text>
        <View style={styles.example}>
          <StrokeText
            text="Custom Font Example"
            fontSize={32}
            color="#FF6B6B"
            strokeColor="#2C3E50"
            strokeWidth={4}
            fontFamily="System" // Replace with your custom font name
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Font Loading Instructions</Text>
        <View style={styles.instructionsBox}>
          <Text style={styles.instructionText}>
            To use custom fonts in this example:
          </Text>
          <Text style={styles.instructionStep}>
            1. Add font files to example/assets/fonts/
          </Text>
          <Text style={styles.instructionStep}>
            2. Load fonts using expo-font:
          </Text>
          <Text style={styles.codeBlock}>
            {`const [fontsLoaded] = useFonts({
  'MyFont-Bold': require('./assets/fonts/MyFont-Bold.ttf'),
});`}
          </Text>
          <Text style={styles.instructionStep}>
            3. Use the fontFamily prop:
          </Text>
          <Text style={styles.codeBlock}>
            {`<StrokeText
  fontFamily="MyFont-Bold"
  text="Custom Font"
  ...
/>`}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Different Font Sizes</Text>
        <View style={styles.example}>
          <StrokeText
            text="Size 16"
            fontSize={16}
            color="#4ECDC4"
            strokeColor="#1A1A1A"
            strokeWidth={2}
          />
        </View>
        <View style={styles.example}>
          <StrokeText
            text="Size 24"
            fontSize={24}
            color="#4ECDC4"
            strokeColor="#1A1A1A"
            strokeWidth={2}
          />
        </View>
        <View style={styles.example}>
          <StrokeText
            text="Size 32"
            fontSize={32}
            color="#4ECDC4"
            strokeColor="#1A1A1A"
            strokeWidth={2}
          />
        </View>
        <View style={styles.example}>
          <StrokeText
            text="Size 48"
            fontSize={48}
            color="#4ECDC4"
            strokeColor="#1A1A1A"
            strokeWidth={3}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Font with Ellipsis</Text>
        <View style={styles.example}>
          <StrokeText
            text="Custom font text with ellipsis when too long"
            fontSize={24}
            color="#95E1D3"
            strokeColor="#2C3E50"
            strokeWidth={3}
            width={200}
            ellipsis={true}
            numberOfLines={1}
            align="left"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Multi-line Custom Font</Text>
        <View style={styles.example}>
          <StrokeText
            text="This is a longer text using custom font that wraps to multiple lines"
            fontSize={20}
            color="#FFE66D"
            strokeColor="#FF6B6B"
            strokeWidth={4}
            numberOfLines={3}
            align="left"
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
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
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  example: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'center',
    marginBottom: 8,
  },
  instructionsBox: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#6200ee',
  },
  instructionText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  instructionStep: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    lineHeight: 20,
  },
  codeBlock: {
    fontSize: 12,
    fontFamily: 'monospace',
    backgroundColor: '#2d2d2d',
    color: '#f8f8f2',
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
});

