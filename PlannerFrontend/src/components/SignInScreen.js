import React from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  AlertDialog,
  Center,
  Text,
  Pressable,
  Card,
} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {fetchApi} from '../api/api';

const SignInScreen = ({navigation}) => {
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
              const {ok, data, error} = await fetchApi('User', 'GET');
              if (ok) {
                const users = data.$values;
                const user = users.find(
                  u =>
                    u.userName.toLowerCase() === values.username.toLowerCase(),
                );
                if (user) {
                  navigation.navigate('Home', {userId: user.userId});
                } else {
                  showAlert('Failed to sign in', 'User not found.');
                }
              } else {
                showAlert('Error', error);
              }
            } catch (error) {
              console.error('SignIn error:', error);
              showAlert('Sign in error', error.message);
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
                Sign In
              </Button>
              <Pressable onPress={() => navigation.navigate('SignUp')}>
                <Text
                  fontSize="sm"
                  mt="2"
                  color="coolGray.600"
                  _dark={{color: 'warmGray.200'}}>
                  Not signed up?{' '}
                  <Text underline color="primary.500">
                    Sign up
                  </Text>
                </Text>
              </Pressable>
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

export default SignInScreen;