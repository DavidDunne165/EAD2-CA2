import {fetchApi} from '../api/api';
import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

const EventCreationScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const route = useRoute();
  const {profileId} = route.params;

  const handleCreateEvent = async () => {
    try {
      // Add 'profileId' to the eventData object when making the POST request
      const eventData = {
        title,
        description,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        isRecurring: false,
        profileId, // Assuming your API needs this to associate the event with the profile
      };
      const data = await fetchApi('Event', 'POST', eventData);
      if (data) {
        // Handle success
        alert('Event created successfully!');
        navigation.goBack();
      } else {
        // Handle failure
        alert('Failed to create event');
      }
    } catch (error) {
      console.error('Create event error:', error);
      alert('Create event error');
    }
  };

  return (
    <View>
      <TextInput value={title} onChangeText={setTitle} placeholder="Title" />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <TextInput
        value={startTime}
        onChangeText={setStartTime}
        placeholder="Start Time (YYYY-MM-DDTHH:MM:SS)"
      />
      <TextInput
        value={endTime}
        onChangeText={setEndTime}
        placeholder="End Time (YYYY-MM-DDTHH:MM:SS)"
      />
      <Button title="Create Event" onPress={handleCreateEvent} />
    </View>
  );
};

export default EventCreationScreen;
