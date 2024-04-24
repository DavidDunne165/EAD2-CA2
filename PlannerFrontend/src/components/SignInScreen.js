import React from 'react';
import {View, TextInput, Button} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {fetchApi} from '../api/api';

// SignInScreen.js
// ... (other imports)
const SignInScreen = ({ navigation }) => {
  return (
    <Formik
      initialValues={{ username: '' }}
      onSubmit={async values => {
        try {
          // Fetch users to find if the username exists
          const users = await fetchApi('User', 'GET');
          const user = users.find(
            user => user.userName === values.username,
          );
          if (user) {
            // Pass the user ID to the Home screen
            navigation.navigate('Home', { userId: user.userId });
          } else {
            alert('Failed to sign in');
          }
        } catch (error) {
          console.error('SignIn error:', error);
          alert('Sign in error');
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