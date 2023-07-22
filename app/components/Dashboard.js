import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

// Import the custom font
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';

const Dashboard = ({ navigation }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch user data here...

    // Placeholder data for illustration:
    setUserData({
      username: 'Test',
      ID: '1',
      nodeRunning: true,
      KYC: 'false',
    });
  }, []);

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
      <Text style={styles.title}>User Dashboard</Text>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.infoItem}><Text style={styles.bold}>Username:</Text> {userData.username}</Text>
        <Text style={styles.infoItem}><Text style={styles.bold}>ID:</Text> {userData.ID}</Text>
        <Text style={styles.infoItem}><Text style={styles.bold}>Node running:</Text> {userData.nodeRunning ? 'Yes' : 'No'}</Text>
        <Text style={styles.infoItem}><Text style={styles.bold}>KYC:</Text> {userData.KYC}</Text>
        {userData.KYC === 'false' && (
          <View style={styles.buttonContainer}>
            <Button title="Go to Upload" onPress={() => navigation.navigate('Upload')} />
          </View>
        )}
      </ScrollView>
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
    color: '#007bff', // Custom title color (blue)
    marginBottom: 20,
  },
  scrollContainer: {
    marginVertical: 10,
  },
  infoItem: {
    fontSize: 18,
    color: '#333', // Changed text color to black
    backgroundColor: '#f0f0f0', // Changed background color to light grey
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default Dashboard;