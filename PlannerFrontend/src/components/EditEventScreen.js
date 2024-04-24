import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {fetchApi} from '../api/api';
import {
  Button,
  FormControl,
  Input,
  Center,
  WarningOutlineIcon,
  Text,
  VStack,
} from 'native-base';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next'; // Import useTranslation

const EditEventScreen = () => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const {t} = useTranslation(); // Initialize useTranslation
  const eventId = route.params.eventId;

  useEffect(() => {
    setLoading(true);
    fetchApi(`Event/${eventId}`, 'GET')
      .then(({ok, data}) => {
        if (ok) {
          setEventData(data);
        } else {
          setError(t('fetch_event_error'));
        }
      })
      .catch(error => setError(t('network_error', {error: error.message})))
      .finally(() => setLoading(false));
  }, [eventId, t]);

  const saveEvent = async values => {
    setLoading(true);
    try {
      const response = await fetchApi(`Event/${eventId}`, 'PUT', values);
      if (response.ok) {
        navigation.goBack();
      } else {
        setError(t('update_event_error'));
      }
    } catch (error) {
      setError(t('json_parse_error'));
      console.error('Failed to parse JSON response:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Center flex={1}>
        <Text>{t('loading')}</Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Center flex={1}>
        <Text>
          {t('error')}: {error}
        </Text>
      </Center>
    );
  }

  return (
    <Formik
      enableReinitialize
      initialValues={
        eventData || {
          title: '',
          description: '',
          startTime: '',
          endTime: '',
          isRecurring: false,
          profileId: '',
        }
      }
      validationSchema={Yup.object().shape({
        title: Yup.string().required(t('title_required')),
        description: Yup.string().required(t('description_required')),
      })}
      onSubmit={values => saveEvent(values)}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <Center flex={1} px="3">
          <VStack space={4} w="100%" mt="4">
            <FormControl isInvalid={touched.title && errors.title}>
              <FormControl.Label>{t('title')}</FormControl.Label>
              <Input
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.title}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={touched.description && errors.description}>
              <FormControl.Label>{t('description')}</FormControl.Label>
              <Input
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.description}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button onPress={handleSubmit} mt="5" colorScheme="indigo">
              {t('save_changes')}
            </Button>
          </VStack>
        </Center>
      )}
    </Formik>
  );
};

export default EditEventScreen;
