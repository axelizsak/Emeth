import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Import the custom font
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';

const EmethNode = () => {
  // Sample data
  const [data, setData] = useState([
    { id: '1', location: 'New York' },
    { id: '2', location: 'London' },
    { id: '3', location: 'Paris' },
    { id: '4', location: 'Berlin' },
    { id: '5', location: 'Tokyo' },
    { id: '6', location: 'Sydney' },
    { id: '7', location: 'Dubai' },
    { id: '8', location: 'Hong Kong' },
    { id: '9', location: 'Singapore' },
    { id: '10', location: 'Los Angeles' },
  ]);

  // Load the custom font
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null; // Render nothing until the font is loaded
  }

  return (
    <View style={styles.container}>
      {/* Use the custom font for the title */}
      <Text style={styles.title}>Top KYC Node</Text>
      {data.map((item, index) => (
        <View key={item.id} style={styles.row}>
          <Text style={styles.id}>{index + 1}. ID: {item.id}</Text>
          <Text style={styles.location}>Location: {item.location}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Soft white-grey background color
    padding: 20,
  },
  title: {
    fontFamily: 'Inter_500Medium', // Use the custom font here
    fontSize: 24,
    marginBottom: 20,
    color: '#007bff', // Custom title color (blue)
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  id: {
    fontSize: 18,
  },
  location: {
    fontSize: 18,
  },
});

export default EmethNode;