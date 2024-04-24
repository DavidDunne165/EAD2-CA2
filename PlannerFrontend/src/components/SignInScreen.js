import React from 'react';
import {
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
import {useTranslation} from 'react-i18next';

const SignInScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const onClose = () => setIsOpen(false);
  const showAlert = (title, message) => {
    setAlertMessage({title: t(title), message: t(message)});
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
                  showAlert('failed_to_sign_in', 'user_not_found');
                }
              } else {
                showAlert('error', error);
              }
            } catch (error) {
              console.error('SignIn error:', error);
              showAlert('sign_in_error', error.message);
            }
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required(t('username_required')),
          })}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <VStack space={4} w="100%">
              <Input
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholder={t('username_placeholder')}
                variant="filled"
                size="md"
              />
              <Button onPress={handleSubmit} size="md">
                {t('sign_in')}
              </Button>
              <Pressable onPress={() => navigation.navigate('SignUp')}>
                <Text
                  fontSize="sm"
                  mt="2"
                  color="coolGray.600"
                  _dark={{color: 'warmGray.200'}}>
                  {t('not_signed_up')}{' '}
                  {/* Ensure space is within Text component */}
                </Text>
                <Text fontSize="sm" underline color="primary.500">
                  {t('sign_up')}
                </Text>
              </Pressable>
            </VStack>
          )}
        </Formik>
      </Card>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            <Text>{alertMessage.title}</Text>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <Text>{alertMessage.message}</Text>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default SignInScreen;
