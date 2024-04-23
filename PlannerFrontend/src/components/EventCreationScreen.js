import { fetchApi } from '../api/api';
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';


// Example form handling and API posting
const EventCreationScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateEvent = async () => {
    try {
      const data = await fetchApi('Event', 'POST', { title, description });
      if (data) {
        // Handle success
        navigation.goBack();
      } else {
        // Handle failure
        alert('Failed to create event');
      }
    } catch (error) {
      console.error('Create event error', error);
      alert('Create event error');
    }
  };

  return (
    <View>
      <TextInput value={title} onChangeText={setTitle} placeholder="Title" />
      <TextInput value={description} onChangeText={setDescription} placeholder="Description" />
      <Button title="Create Event" onPress={handleCreateEvent} />
    </View>
  );
};

export default EventCreationScreen;