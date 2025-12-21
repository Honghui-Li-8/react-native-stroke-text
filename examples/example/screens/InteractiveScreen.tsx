import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Switch, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { StrokeText } from '@charmy.tech/react-native-stroke-text';

export default function InteractiveScreen() {
  const [fontSize, setFontSize] = useState(32);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [text, setText] = useState('Interactive Example');
  const [color, setColor] = useState('#FFFFFF');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [width, setWidth] = useState(250);
  const [ellipsis, setEllipsis] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(0);
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('center');

  const colors = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Purple', value: '#9B59B6' },
    { name: 'Cyan', value: '#00FFFF' },
    { name: 'Orange', value: '#FFA500' },
  ];

  const strokeColors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Purple', value: '#9B59B6' },
    { name: 'Orange', value: '#FFA500' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.previewSection}>
        <Text style={styles.previewTitle}>Live Preview</Text>
        <View style={styles.previewBox}>
          <StrokeText
            text={text}
            fontSize={fontSize}
            color={color}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            width={ellipsis ? width : undefined}
            ellipsis={ellipsis}
            numberOfLines={numberOfLines}
            align={align}
          />
        </View>
      </View>

      <View style={styles.controlSection}>
        <Text style={styles.controlTitle}>Font Size: {fontSize}</Text>
        <Slider
          style={styles.slider}
          minimumValue={12}
          maximumValue={72}
          value={fontSize}
          onValueChange={setFontSize}
          minimumTrackTintColor="#6200ee"
          maximumTrackTintColor="#cccccc"
        />
      </View>

      <View style={styles.controlSection}>
        <Text style={styles.controlTitle}>Stroke Width: {strokeWidth}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={20}
          value={strokeWidth}
          onValueChange={setStrokeWidth}
          minimumTrackTintColor="#6200ee"
          maximumTrackTintColor="#cccccc"
        />
      </View>

      <View style={styles.controlSection}>
        <Text style={styles.controlTitle}>Width: {width}px</Text>
        <Slider
          style={styles.slider}
          minimumValue={100}
          maximumValue={350}
          value={width}
          onValueChange={setWidth}
          minimumTrackTintColor="#6200ee"
          maximumTrackTintColor="#cccccc"
        />
      </View>

      <View style={styles.controlSection}>
        <Text style={styles.controlTitle}>Text Color</Text>
        <View style={styles.colorGrid}>
          {colors.map((colorOption) => (
            <TouchableOpacity
              key={colorOption.name}
              style={[
                styles.colorButton,
                color === colorOption.value && styles.colorButtonSelected,
              ]}
              onPress={() => setColor(colorOption.value)}
            >
              <View
                style={[styles.colorSwatch, { backgroundColor: colorOption.value }]}
              />
              <Text style={styles.colorLabel}>{colorOption.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.controlSection}>
        <Text style={styles.controlTitle}>Stroke Color</Text>
        <View style={styles.colorGrid}>
          {strokeColors.map((colorOption) => (
            <TouchableOpacity
              key={colorOption.name}
              style={[
                styles.colorButton,
                strokeColor === colorOption.value && styles.colorButtonSelected,
              ]}
              onPress={() => setStrokeColor(colorOption.value)}
            >
              <View
                style={[styles.colorSwatch, { backgroundColor: colorOption.value }]}
              />
              <Text style={styles.colorLabel}>{colorOption.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.controlSection}>
        <View style={styles.switchRow}>
          <Text style={styles.controlTitle}>Ellipsis</Text>
          <Switch
            value={ellipsis}
            onValueChange={setEllipsis}
            trackColor={{ false: '#767577', true: '#6200ee' }}
            thumbColor={ellipsis ? '#ffffff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.controlSection}>
        <Text style={styles.controlTitle}>Number of Lines: {numberOfLines === 0 ? 'Unlimited' : numberOfLines}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={5}
          step={1}
          value={numberOfLines}
          onValueChange={setNumberOfLines}
          minimumTrackTintColor="#6200ee"
          maximumTrackTintColor="#cccccc"
        />
      </View>

      <View style={styles.controlSection}>
        <Text style={styles.controlTitle}>Text Alignment</Text>
        <View style={styles.alignButtons}>
          <TouchableOpacity
            style={[
              styles.alignButton,
              align === 'left' && styles.alignButtonSelected,
            ]}
            onPress={() => setAlign('left')}
          >
            <Text style={[styles.alignButtonText, align === 'left' && styles.alignButtonTextSelected]}>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.alignButton,
              align === 'center' && styles.alignButtonSelected,
            ]}
            onPress={() => setAlign('center')}
          >
            <Text style={[styles.alignButtonText, align === 'center' && styles.alignButtonTextSelected]}>Center</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.alignButton,
              align === 'right' && styles.alignButtonSelected,
            ]}
            onPress={() => setAlign('right')}
          >
            <Text style={[styles.alignButtonText, align === 'right' && styles.alignButtonTextSelected]}>Right</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.controlSection}>
        <Text style={styles.controlTitle}>Sample Text Options</Text>
        <View style={styles.textButtons}>
          {['Short', 'Medium Length Text', 'This is a very long text example that demonstrates wrapping'].map((sampleText) => (
            <TouchableOpacity
              key={sampleText}
              style={styles.textButton}
              onPress={() => setText(sampleText)}
            >
              <Text style={styles.textButtonText}>{sampleText}</Text>
            </TouchableOpacity>
          ))}
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
  previewSection: {
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
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  previewBox: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlSection: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  controlTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorButton: {
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    width: '23%',
  },
  colorButtonSelected: {
    borderColor: '#6200ee',
    backgroundColor: '#f3e5f5',
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 4,
  },
  colorLabel: {
    fontSize: 12,
    color: '#666',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alignButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alignButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  alignButtonSelected: {
    backgroundColor: '#6200ee',
  },
  alignButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  alignButtonTextSelected: {
    color: '#ffffff',
  },
  textButtons: {
    gap: 8,
  },
  textButton: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  textButtonText: {
    color: '#333',
    textAlign: 'center',
  },
});

