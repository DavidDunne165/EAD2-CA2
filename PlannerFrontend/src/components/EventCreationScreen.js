import {fetchApi} from '../api/api';
import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';

const EventCreationScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleCreateEvent = async () => {
    try {
      const eventData = {
        title: title,
        description: description,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        isRecurring: false, // You can modify this as needed or make it dynamic
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
