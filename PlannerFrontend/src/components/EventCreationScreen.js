import {fetchApi} from '../api/api';
import React, {useState} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next'; // Import useTranslation

const EventCreationScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const route = useRoute();
  const {profileId} = route.params;
  const {t} = useTranslation(); // Initialize useTranslation

  const handleCreateEvent = async () => {
    try {
      const eventData = {
        title,
        description,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        isRecurring: false,
        profileId,
      };
      const {ok, data} = await fetchApi('Event', 'POST', eventData);
      if (ok && data) {
        Alert.alert(t('success_title'), t('event_creation_success'));
        navigation.goBack();
      } else {
        Alert.alert(t('error_title'), t('event_creation_fail'));
      }
    } catch (error) {
      console.error('Create event error:', error);
      Alert.alert(t('error_title'), t('create_event_error'));
    }
  };

  return (
    <View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder={t('title_placeholder')}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder={t('description_placeholder')}
      />
      <TextInput
        value={startTime}
        onChangeText={setStartTime}
        placeholder={t('start_time_placeholder')}
      />
      <TextInput
        value={endTime}
        onChangeText={setEndTime}
        placeholder={t('end_time_placeholder')}
      />
      <Button title={t('create_event_button')} onPress={handleCreateEvent} />
    </View>
  );
};

export default EventCreationScreen;
