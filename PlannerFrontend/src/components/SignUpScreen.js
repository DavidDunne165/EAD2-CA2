import React from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  AlertDialog,
  Center,
  Card,
} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {fetchApi} from '../api/api';

const SignUpScreen = ({navigation}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const onClose = () => setIsOpen(false);
  const showAlert = (title, message) => {
    setAlertMessage({title, message});
    setIsOpen(true);
  };

  return (
    <Center flex={1} px="3">
      <Card rounded="lg" width="90%" p="4">
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
                showAlert('Failed to register', 'No data received.');
              }
            } catch (error) {
              console.error('SignUp error:', error);
              showAlert('SignUp error', error.message);
            }
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required('Username is required'),
          })}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <VStack space={4} w="100%">
              <Input
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholder="Username"
                variant="filled"
                size="md"
              />
              <Button onPress={handleSubmit} size="md">
                Sign Up
              </Button>
            </VStack>
          )}
        </Formik>
      </Card>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{alertMessage.title}</AlertDialog.Header>
          <AlertDialog.Body>{alertMessage.message}</AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default SignUpScreen;