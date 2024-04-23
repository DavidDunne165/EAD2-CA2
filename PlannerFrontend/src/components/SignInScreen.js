import React from 'react';
import {View, TextInput, Button} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {fetchApi} from '../api/api';

const SignInScreen = ({navigation}) => {
  return (
    <Formik
      
      initialValues={{username: ''}}
      onSubmit={async values => {
        // Fetch users to find if the username exists
        const users = await fetchApi('User', 'GET');
        // Check if the username is in the retrieved user list
        const userExists = users.some(
          user => user.userName === values.username,
        );
        if (userExists) {
          navigation.navigate('Home');
        } else {
          alert('Failed to sign in');
        }
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Username is required'),
      })}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
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
