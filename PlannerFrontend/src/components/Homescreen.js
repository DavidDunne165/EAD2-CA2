import React, {useState, useEffect, useCallback} from 'react';
import {
  Box,
  Input,
  Button,
  Text,
  Center,
  Avatar,
  VStack,
  HStack,
} from 'native-base';
import {Pressable, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchApi} from '../api/api';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [profileName, setProfileName] = useState('');
  const [profiles, setProfiles] = useState([]);
  const {userId} = route.params;

  const fetchProfiles = useCallback(async () => {
    try {
      const {ok, data} = await fetchApi(`User/${userId}`, 'GET');
      if (ok) {
        setProfiles(data.profiles.$values || []);
      } else {
        Alert.alert('Error', 'Could not fetch profiles.');
      }
    } catch (error) {
      console.error('Fetch profiles error:', error);
      Alert.alert('Error', `Could not fetch profiles: ${error.message}`);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchProfiles();
    } else {
      console.error('No userId found');
      Alert.alert('Error', 'No userId was provided.');
    }
  }, [userId, fetchProfiles]);

  const handleCreateProfile = async () => {
    if (profileName.trim() === '') {
      Alert.alert('Error', 'Please enter a profile name.');
      return;
    }

    try {
      const profileData = {profileName, userId};
      const {ok, data} = await fetchApi('Profile', 'POST', profileData);

      if (ok && data && data.profileId) {
        Alert.alert('Success', 'Profile created successfully.');
        setProfileName('');
        fetchProfiles();
      } else {
        console.error('Failed to create profile:', JSON.stringify(data));
        Alert.alert(
          'Error',
          data.error || 'Failed to create profile. Please try again.',
        );
      }
    } catch (error) {
      console.error('Network or parsing error:', error);
      Alert.alert('Error', `Network or Parsing Error: ${error.message}`);
    }
  };

  const navigateToProfile = profile => {
    navigation.navigate('ProfileDetail', {profile});
  };

  return (
    <Box flex={1} p="4">
      <VStack space={4} mb="4">
        <Input
          value={profileName}
          onChangeText={setProfileName}
          placeholder="Enter profile name"
          variant="filled"
          size="md"
        />
        <Button onPress={handleCreateProfile}>Create Profile</Button>
      </VStack>
      <VStack space={4} alignItems="center">
        {Array(Math.ceil(profiles.length / 3))
          .fill()
          .map((_, row) => (
            <HStack
              key={row}
              space={3}
              alignItems="center"
              justifyContent="space-evenly">
              {profiles.slice(row * 3, row * 3 + 3).map((profile, index) => (
                <Pressable
                  key={index}
                  onPress={() => navigateToProfile(profile)}
                  style={{width: '30%'}}>
                  <Center>
                    <Avatar size="lg" name={profile.profileName} />
                    <Text mt="2">{profile.profileName}</Text>
                  </Center>
                </Pressable>
              ))}
            </HStack>
          ))}
      </VStack>
    </Box>
  );
};

export default HomeScreen;
