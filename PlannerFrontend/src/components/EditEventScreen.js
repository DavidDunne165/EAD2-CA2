import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fetchApi } from '../api/api';
import { Box, Button, FormControl, Input, Center, WarningOutlineIcon, Text, VStack } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';

const EditEventScreen = () => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const eventId = route.params.eventId;

  useEffect(() => {
    setLoading(true);
    fetchApi(`Event/${eventId}`, 'GET')
      .then(({ ok, data }) => {
        if (ok) {
          setEventData(data);
        } else {
          setError('Failed to fetch event details.');
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [eventId]);

  const saveEvent = async (values) => {
    setLoading(true);
    try {
      const response = await fetchApi(`Event/${eventId}`, 'PUT', values);
      if (response.ok) {
        // Assuming your server responds with a status code of 200 and no content
        navigation.goBack();
      } else {
        setError(response.error || 'Failed to update the event.');
      }
    } catch (error) {
      setError('Failed to parse JSON response.');
      // Log the error for debugging
      console.error('Failed to parse JSON response:', error);
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return <Center flex={1}><Text>Loading...</Text></Center>;
  }

  if (error) {
    return <Center flex={1}><Text>Error: {error}</Text></Center>;
  }

  return (
    <Formik
      enableReinitialize // Allows Formik to reset the form when initialValues change
      initialValues={eventData || { title: '', description: '', startTime: '', endTime: '', isRecurring: false, profileId: '' }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        // Add validations for other fields as necessary
      })}
      onSubmit={(values) => saveEvent(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
        <Center flex={1} px="3">
          <VStack space={4} w="100%" mt="4">
            <FormControl isInvalid={touched.title && errors.title}>
              <FormControl.Label>Title</FormControl.Label>
              <Input
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.title}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={touched.description && errors.description}>
              <FormControl.Label>Description</FormControl.Label>
              <Input
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.description}
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Repeat FormControl blocks for startTime, endTime, and isRecurring */}

            <Button onPress={handleSubmit} mt="5" colorScheme="indigo">
              Save Changes
            </Button>
          </VStack>
        </Center>
      )}
    </Formik>
  );
};

export default EditEventScreen;
