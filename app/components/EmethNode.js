import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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

  return (
    <View style={styles.container}>
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
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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

const cityData = [
    {name: 'New York', coordinates: [40.7128, -74.0060]},
    {name: 'Los Angeles', coordinates: [34.0522, -118.2437]},
    {name: 'London', coordinates: [51.5074, -0.1278]},
    // add more cities as necessary
  ];
  
  function CityMarkers() {
    return (
      cityData.map(city =>
        <Marker position={city.coordinates}>
          <Popup>{city.name}</Popup>
        </Marker>
      )
    );
  }
  
  function EmethNodes() {
    return (
      <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CityMarkers />
      </MapContainer>
    );
  }

export default EmethNode;
