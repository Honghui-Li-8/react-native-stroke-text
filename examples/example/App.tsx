import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import EllipsisScreen from './screens/EllipsisScreen';
import FontsScreen from './screens/FontsScreen';
import InteractiveScreen from './screens/InteractiveScreen';

const Stack = createStackNavigator();

function Home({ navigation }: any) {
  const screens = [
    { name: 'Home', component: 'HomeScreen', title: 'Basic Examples' },
    { name: 'Ellipsis', component: 'EllipsisScreen', title: 'Ellipsis Examples' },
    { name: 'Fonts', component: 'FontsScreen', title: 'Custom Fonts' },
    { name: 'Interactive', component: 'InteractiveScreen', title: 'Interactive Demo' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Stroke Text Examples</Text>
        {screens.map((screen) => (
          <TouchableOpacity
            key={screen.name}
            style={styles.button}
            onPress={() => navigation.navigate(screen.component)}
          >
            <Text style={styles.buttonText}>{screen.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Basic Examples' }} />
        <Stack.Screen name="EllipsisScreen" component={EllipsisScreen} options={{ title: 'Ellipsis Examples' }} />
        <Stack.Screen name="FontsScreen" component={FontsScreen} options={{ title: 'Custom Fonts' }} />
        <Stack.Screen name="InteractiveScreen" component={InteractiveScreen} options={{ title: 'Interactive Demo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

