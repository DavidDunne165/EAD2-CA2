import React, {useState, useEffect} from 'react';
import {Modal, Alert, Dimensions} from 'react-native'; // Import Dimensions
import {Box, Button, Text, VStack, Center} from 'native-base';
import {Calendar} from 'react-native-calendars';
import {useRoute, useNavigation} from '@react-navigation/native';
import {fetchApi} from '../api/api';

const ProfileDetailScreen = () => {
  const [events, setEvents] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const {profile} = route.params;

  const formatRecurring = (isRecurring) => {
    return isRecurring ? 'Yes' : 'No';
  };

  useEffect(() => {
    fetchEvents(); // Call this on component mount
  }, []);

  const fetchEvents = async () => {
    try {
      const {ok, data} = await fetchApi(`Profile/${profile.profileId}`, 'GET');
      if (ok) {
        const newEvents = data.events?.$values || [];
        setEvents(newEvents);
        updateCalendarMarks(newEvents);
      } else {
        Alert.alert('Error', 'Unable to fetch events');
      }
    } catch (error) {
      Alert.alert('Error', `Network or Parsing Error: ${error.message}`);
    }
  };

  const updateCalendarMarks = events => {
    const marks = {};
    events.forEach(event => {
      const date = new Date(event.startTime).toISOString().split('T')[0];
      marks[date] = {marked: true, dotColor: 'blue', activeOpacity: 0.5};
    });
    setMarkedDates(marks);
  };

  const handleDayPress = day => {
    const eventsForDay = events.filter(
      e => new Date(e.startTime).toISOString().split('T')[0] === day.dateString,
    );
    setSelectedDayEvents(eventsForDay);
    setModalVisible(true);
  };

  const handleEventSelect = event => {
    setSelectedEvent(event);
    setDetailModalVisible(true);
  };

  const deleteEvent = async eventId => {
    // Here you would call the API to delete the event and then refetch or update the state locally
    Alert.alert('Delete Event', 'Event deleted successfully.');
    setDetailModalVisible(false);
  };

  const editEvent = (eventId) => {
    // Navigate to EditEvent screen with eventId as a parameter
    navigation.navigate('EditEvent', { eventId });
  };

  const screenWidth = Dimensions.get('window').width; // Get the width of the screen

  return (
    <VStack space={4} flex={1} p={4}>
      <Center>
        <Text fontSize="xl" bold>
          {profile.profileName}
        </Text>
        <Button
          onPress={() =>
            navigation.navigate('EventCreation', {profileId: profile.profileId})
          }
          mt="4">
          Create Event
        </Button>
        <Calendar
          current={new Date().toISOString().split('T')[0]}
          markedDates={markedDates}
          onDayPress={handleDayPress}
          style={{width: screenWidth}} // Set the calendar width to full screen width
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <Center flex={1} bg="white">
            <VStack space={4}>
              {selectedDayEvents.map((event, index) => (
                <Button key={index} onPress={() => handleEventSelect(event)}>
                  {event.title}
                </Button>
              ))}
              <Button onPress={() => setModalVisible(false)} colorScheme="coolGray">Close</Button>
            </VStack>
          </Center>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={detailModalVisible}
          onRequestClose={() => setDetailModalVisible(!detailModalVisible)}>
          <Center flex={1} bg="white">
            <VStack space={4}>
              <Text fontSize="lg" bold>
                {selectedEvent?.title}
              </Text>
              <Text>{selectedEvent?.description}</Text>
              <Text>Start Time: {selectedEvent?.startTime}</Text>
              <Text>End Time: {selectedEvent?.endTime}</Text>
              <Text>Recurring: {formatRecurring(selectedEvent?.isRecurring)}</Text>
              <Button onPress={() => editEvent(selectedEvent.eventId)}>Edit</Button>
              <Button
                onPress={() => deleteEvent(selectedEvent?.id)}
                colorScheme="red">
                Delete
              </Button>
              <Button onPress={() => setDetailModalVisible(false)}
                colorScheme="coolGray">
                Close
              </Button>
            </VStack>
          </Center>
        </Modal>
      </Center>
    </VStack>
  );
};

export default ProfileDetailScreen;
