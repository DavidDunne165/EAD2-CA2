import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fetchApi } from '../api/api';

const SignInScreen = ({ navigation }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values) => {
        try {
          const data = await fetchApi('User/Login', 'POST', { email: values.email, password: values.password });
          if (data) {
            // Handle success (e.g., navigate to the home screen)
            navigation.navigate('Home');
          } else {
            // Handle login failure
            alert('Failed to sign in');
          }
        } catch (error) {
          console.error('Login error', error);
          alert('Login error');
        }
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Email"
          />
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder="Password"
            secureTextEntry
          />
          <Button onPress={handleSubmit} title="Sign In" />
        </View>
      )}
    </Formik>
  );
};

export default SignInScreen;
