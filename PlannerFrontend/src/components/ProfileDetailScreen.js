import React, {useState, useEffect} from 'react';
import {View, Button, Alert, FlatList, Text} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {fetchApi} from '../api/api';

const ProfileDetailScreen = () => {
  const [events, setEvents] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  const {profile} = route.params;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const {ok, data, error} = await fetchApi(
          `Profile/${profile.profileId}`,
          'GET',
        );
        console.log('API response:', JSON.stringify(data, null, 2)); // Debugging the API response
        if (ok) {
          console.log('Events:', data.events?.$values); // Debugging the events data
          setEvents(data.events?.$values || []);
        } else {
          Alert.alert('Error', error || 'Unable to fetch events');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        Alert.alert('Error', `Network or Parsing Error: ${error.message}`);
      }
    };

    fetchEvents();
  }, [profile.profileId]);

  const navigateToEventCreation = () => {
    navigation.navigate('EventCreation', {profileId: profile.profileId});
  };

  return (
    <View>
      <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
        {profile.profileName}
      </Text>
      <Button title="Create Event" onPress={navigateToEventCreation} />
      {events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={item => item.eventId.toString()}
          renderItem={({item}) => (
            <View>
              <Text>Title: {item.title}</Text>
              <Text>Description: {item.description}</Text>
              <Text>
                Start Time: {new Date(item.startTime).toLocaleString()}
              </Text>
              <Text>End Time: {new Date(item.endTime).toLocaleString()}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={{textAlign: 'center', marginTop: 20}}>
          No events found for this profile.
        </Text>
      )}
    </View>
  );
};

export default ProfileDetailScreen;
