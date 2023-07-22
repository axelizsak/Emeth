import React from 'react';
import { Button, View, Text } from 'react-native';
import UserForm from './UserForm';

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <UserForm />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export default HomeScreen;
