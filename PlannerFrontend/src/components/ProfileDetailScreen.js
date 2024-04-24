// ProfileDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, FlatList, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchApi } from '../api/api';

const ProfileDetailScreen = () => {
  const [events, setEvents] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  // Extract the profile object from route params
  const { profile } = route.params;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { ok, data, error } = await fetchApi(`Profile/${profile.profileId}`, 'GET');
        if (ok) {
          setEvents(data.events.$values);
        } else {
          Alert.alert('Error', error);
        }
      } catch (error) {
        Alert.alert('Error', `Network or Parsing Error: ${error.message}`);
      }
    };

    fetchEvents();
  }, [profile]);

  const navigateToEventCreation = () => {
    // Navigate to the EventCreationScreen with the profileId
    navigation.navigate('EventCreation', { profileId: profile.profileId });
  };

  return (
    <View>
      {/* Display profile name */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
        {profile.profileName}
      </Text>
      <Button title="Create Event" onPress={navigateToEventCreation} />
      {/* Event list will go here */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.eventId.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Title: {item.title}</Text>
            <Text>Description: {item.description}</Text>
            {/* Add more event details here as needed */}
          </View>
        )}
      />
    </View>
  );
};

export default ProfileDetailScreen;
