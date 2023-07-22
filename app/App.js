import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;