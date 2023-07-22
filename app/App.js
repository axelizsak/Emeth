import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';
import EmethNode from './components/EmethNode'; 
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Login" 
        component={Login} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-in-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Emeth Node" 
        component={EmethNode} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="planet-outline" color={color} size={size} />
          ),
        }}
      /> 
    </Tab.Navigator>
  );
}

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }}/>
          <Stack.Screen name="Upload" component={Upload} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
