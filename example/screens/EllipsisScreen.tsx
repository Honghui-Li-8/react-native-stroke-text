import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { StrokeText } from '@charmy.tech/react-native-stroke-text';

export default function EllipsisScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Single Line with Ellipsis</Text>
        <Text style={styles.description}>
          Text that exceeds the width will be truncated with ellipsis
        </Text>
        <View style={styles.example}>
          <StrokeText
            text="This is a very long text that will be truncated with ellipsis when it exceeds the width"
            fontSize={24}
            color="#FFFFFF"
            strokeColor="#000000"
            strokeWidth={3}
            width={200}
            ellipsis={true}
            numberOfLines={1}
            align="left"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Two Lines with Ellipsis</Text>
        <Text style={styles.description}>
          Text limited to 2 lines with ellipsis
        </Text>
        <View style={styles.example}>
          <StrokeText
            text="This is a longer text that will wrap to two lines and show ellipsis if it still doesn't fit within the specified width"
            fontSize={20}
            color="#FF6B6B"
            strokeColor="#2C3E50"
            strokeWidth={2}
            width={250}
            ellipsis={true}
            numberOfLines={2}
            align="left"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Three Lines with Ellipsis</Text>
        <Text style={styles.description}>
          Text limited to 3 lines with ellipsis
        </Text>
        <View style={styles.example}>
          <StrokeText
            text="This is an even longer text that demonstrates how the ellipsis feature works when you have multiple lines. The text will wrap to three lines and show ellipsis if it exceeds that limit."
            fontSize={18}
            color="#4ECDC4"
            strokeColor="#1A1A1A"
            strokeWidth={2}
            width={280}
            ellipsis={true}
            numberOfLines={3}
            align="left"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Narrow Width (150px)</Text>
        <Text style={styles.description}>
          Very narrow width constraint
        </Text>
        <View style={styles.example}>
          <StrokeText
            text="Short text that fits"
            fontSize={22}
            color="#95E1D3"
            strokeColor="#2C3E50"
            strokeWidth={3}
            width={150}
            ellipsis={true}
            numberOfLines={1}
            align="center"
          />
        </View>
        <View style={styles.example}>
          <StrokeText
            text="This text is too long for the narrow width"
            fontSize={22}
            color="#95E1D3"
            strokeColor="#2C3E50"
            strokeWidth={3}
            width={150}
            ellipsis={true}
            numberOfLines={1}
            align="center"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wide Width (300px)</Text>
        <Text style={styles.description}>
          Wider width allows more text
        </Text>
        <View style={styles.example}>
          <StrokeText
            text="This is a longer text that fits better in a wider container with more room for content"
            fontSize={20}
            color="#FFE66D"
            strokeColor="#FF6B6B"
            strokeWidth={4}
            width={300}
            ellipsis={true}
            numberOfLines={2}
            align="left"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Without Ellipsis (for comparison)</Text>
        <Text style={styles.description}>
          Same text without ellipsis - text will wrap naturally
        </Text>
        <View style={styles.example}>
          <StrokeText
            text="This text does not use ellipsis so it will wrap naturally to multiple lines without truncation"
            fontSize={20}
            color="#9B59B6"
            strokeColor="#FFFFFF"
            strokeWidth={3}
            width={250}
            ellipsis={false}
            numberOfLines={0}
            align="left"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Center Aligned with Ellipsis</Text>
        <View style={styles.example}>
          <StrokeText
            text="Center aligned text with ellipsis when it's too long"
            fontSize={24}
            color="#FFFFFF"
            strokeColor="#000000"
            strokeWidth={3}
            width={200}
            ellipsis={true}
            numberOfLines={1}
            align="center"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Right Aligned with Ellipsis</Text>
        <View style={styles.example}>
          <StrokeText
            text="Right aligned text with ellipsis"
            fontSize={24}
            color="#FFFFFF"
            strokeColor="#000000"
            strokeWidth={3}
            width={200}
            ellipsis={true}
            numberOfLines={1}
            align="right"
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
    alignItems: 'flex-start',
    minHeight: 60,
    justifyContent: 'center',
  },
});

