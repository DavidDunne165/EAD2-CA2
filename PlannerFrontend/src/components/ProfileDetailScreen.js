import React, {useState, useEffect} from 'react';
import {Modal, Alert, Dimensions} from 'react-native';
import {Box, Button, Text, VStack, Center} from 'native-base';
import {Calendar} from 'react-native-calendars';
import {useRoute, useNavigation} from '@react-navigation/native';
import {fetchApi} from '../api/api';
import {useTranslation} from 'react-i18next'; // Import useTranslation

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
  const {t} = useTranslation(); // Initialize useTranslation

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const {ok, data} = await fetchApi(`Profile/${profile.profileId}`, 'GET');
      if (ok) {
        const newEvents = data.events?.$values || [];
        setEvents(newEvents);
        updateCalendarMarks(newEvents);
      } else {
        Alert.alert(t('error_title'), t('fetch_events_error'));
      }
    } catch (error) {
      Alert.alert(
        t('error_title'),
        `${t('network_parsing_error')}: ${error.message}`,
      );
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
    Alert.alert(t('delete_event'), t('event_deleted_success'));
    setDetailModalVisible(false);
  };

  const editEvent = event => {
    navigation.navigate('EditEvent', {event});
  };

  const screenWidth = Dimensions.get('window').width;

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
          {t('create_event_button')}
        </Button>
        <Calendar
          current={new Date().toISOString().split('T')[0]}
          markedDates={markedDates}
          onDayPress={handleDayPress}
          style={{width: screenWidth}}
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
              <Button onPress={() => setModalVisible(false)}>
                {t('close_button')}
              </Button>
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
              <Button onPress={() => editEvent(selectedEvent)}>
                {t('edit_button')}
              </Button>
              <Button
                onPress={() => deleteEvent(selectedEvent?.id)}
                colorScheme="red">
                {t('delete_button')}
              </Button>
              <Button onPress={() => setDetailModalVisible(false)}>
                {t('close_button')}
              </Button>
            </VStack>
          </Center>
        </Modal>
      </Center>
    </VStack>
  );
};

export default ProfileDetailScreen;
