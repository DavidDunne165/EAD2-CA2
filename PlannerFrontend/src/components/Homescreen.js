// HomeScreen.js
import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchApi} from '../api/api'; // Make sure this points to your API function

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [profileName, setProfileName] = useState('');

  // Retrieve the userId from the route parameters
  const {userId} = route.params;

  const handleCreateProfile = async () => {
    if (profileName.trim() === '') {
      Alert.alert('Error', 'Please enter a profile name.');
      return;
    }
    try {
      const {ok, data, error} = await fetchApi('Profile', 'POST', {
        profileName: profileName,
        userId: userId, // Update this line to send userId directly
      });

      if (ok) {
        if (data.ProfileId) {
          Alert.alert('Success', 'Profile created successfully.');
        } else {
          Alert.alert('Error', 'Failed to create profile.');
        }
      } else {
        Alert.alert('Error', error);
      }
    } catch (error) {
      Alert.alert('Error', `Network or Parsing Error: ${error.message}`);
    }
  };

  return (
    <View>
      <TextInput
        value={profileName}
        onChangeText={setProfileName}
        placeholder="Enter profile name"
      />
      <Button title="Create Profile" onPress={handleCreateProfile} />
    </View>
  );
};

export default HomeScreen;
