import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fetchApi } from '../api/api';

const SignUpScreen = ({ navigation }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values) => {
        try {
          const data = await fetchApi('User', 'POST', { email: values.email, password: values.password });
          if (data) {
            // Handle success (e.g., navigate to the sign-in screen)
            navigation.navigate('SignIn');
          } else {
            // Handle registration failure
            alert('Failed to register');
          }
        } catch (error) {
          console.error('Registration error', error);
          alert('Registration error');
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
          <Button onPress={handleSubmit} title="Sign Up" />
        </View>
      )}
    </Formik>
  );
};

export default SignUpScreen;
