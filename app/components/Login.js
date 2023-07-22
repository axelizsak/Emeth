import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Import the custom font
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const Login = ({ navigation }) => {
  const handleFormSubmit = (values) => {
    if (values.username === 'admin' && values.password === 'admin') {
      alert('Successfully logged in!');
      navigation.navigate('Dashboard');
    } else {
      alert('Wrong Username/Password');
    }
  };

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
      <Text style={styles.title}>Login to Emeth</Text>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholder="Username"
                placeholderTextColor="#a8a8a8"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#a8a8a8"
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.worldCoinButton}>
              <Text style={styles.buttonText}>Sign-In with WorldCoin</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5', // Soft white-grey background color
  },
  title: {
    fontFamily: 'Inter_500Medium', // Use the custom font here
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
    color: '#007bff', // Custom title color (blue)
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#a8a8a8',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: '#333',
    fontFamily: 'Inter_500Medium', // Use the custom font for input text too
  },
  loginButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 12,
    marginBottom: 10,
  },
  worldCoinButton: {
    backgroundColor: '#444',
    borderRadius: 5,
    paddingVertical: 12,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Inter_500Medium', // Use the custom font for button text
  },
});

export default Login;