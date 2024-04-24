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
import {useTranslation} from 'react-i18next'; // Import useTranslation
import {fetchApi} from '../api/api';

const SignUpScreen = ({navigation}) => {
  const {t} = useTranslation(); // Initialize useTranslation
  const [isOpen, setIsOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const onClose = () => setIsOpen(false);
  const showAlert = (title, message) => {
    setAlertMessage({title: t(title), message: t(message)}); // Use translation for alert messages
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
                showAlert('failed_to_register', 'no_data_received');
              }
            } catch (error) {
              console.error('SignUp error:', error);
              showAlert('signup_error', error.message);
            }
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required(t('username_required')), // Use translation for form validation
          })}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <VStack space={4} w="100%">
              <Input
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholder={t('username_placeholder')} // Use translation for placeholders
                variant="filled"
                size="md"
              />
              <Button onPress={handleSubmit} size="md">
                {t('sign_up')} // Use translation for button text
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
