import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const Dashboard = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch user data here...

    // Placeholder data for illustration:
    setUserData({
      username: 'user',
      ID: '1',
      nodeRunning: true,
      KYC: 'yes',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Dashboard</Text>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.infoItem}><Text style={styles.bold}>Username:</Text> {userData.username}</Text>
        <Text style={styles.infoItem}><Text style={styles.bold}>ID:</Text> {userData.ID}</Text>
        <Text style={styles.infoItem}><Text style={styles.bold}>Node running:</Text> {userData.nodeRunning ? 'Yes' : 'No'}</Text>
        <Text style={styles.infoItem}><Text style={styles.bold}>KYC:</Text> {userData.KYC}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  scrollContainer: {
    marginVertical: 10,
  },
  infoItem: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#333',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Dashboard;