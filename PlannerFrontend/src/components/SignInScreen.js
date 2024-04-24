// SignInScreen.js
import React from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fetchApi } from '../api/api';

const SignInScreen = ({ navigation }) => {
  return (
    <Formik
      initialValues={{ username: '' }}
      onSubmit={async (values) => {
        try {
          const { ok, data, error } = await fetchApi('User', 'GET');
          if (ok) {
            // Ensure data is an array before using .find
            const user = Array.isArray(data) && data.find((u) => u.userName === values.username);
            if (user) {
              navigation.navigate('Home', { userId: user.userId });
            } else {
              Alert.alert('Failed to sign in', 'User not found.');
            }
          } else {
            // Handle the case where the fetch did not succeed
            Alert.alert('Error', error);
          }
        } catch (error) {
          console.error('SignIn error:', error);
          Alert.alert('Sign in error', error.message);
        }
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Username is required'),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <TextInput
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            placeholder="Username"
          />
          <Button onPress={handleSubmit} title="Sign In" />
        </View>
      )}
    </Formik>
  );
};

export default SignInScreen;
