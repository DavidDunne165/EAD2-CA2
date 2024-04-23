import React from 'react';
import {View, TextInput, Button} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {fetchApi} from '../api/api';

const SignUpScreen = ({navigation}) => {
  return (
    <Formik
      initialValues={{username: ''}}
      onSubmit={async values => {
        try {
          const data = await fetchApi('User', 'POST', {
            UserName: values.username,
          });
          if (data) {
            navigation.navigate('SignIn');
          } else {
            alert('Failed to register. No data received.');
          }
        } catch (error) {
          console.error('SignUp error:', error);
          alert(`SignUp error: ${error.message}`);
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
          <Button onPress={handleSubmit} title="Sign Up" />
        </View>
      )}
    </Formik>
  );
};

export default SignUpScreen;
