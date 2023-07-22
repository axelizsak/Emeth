import React from 'react';
import { Button, StyleSheet, TextInput, View, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
      Alert.alert('Successfully logged in!');
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Wrong Username/Password');
    }
  };
  /*
      if (response.ok) {
        const data = await response.json();
        if (data) {
          Alert.alert('Successfully logged in!');
          navigation.navigate('Dashboard');
        } else {
          Alert.alert('Wrong Username/Password');
        }
      } else {
        Alert.alert('Wrong Username/Password');
      }
    } catch (error) {
      console.error(error);
    }
  };*/

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Emeth</Text>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder="Username"
            />
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Password"
              secureTextEntry
            />
            <Button title="Login" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Login;
