import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
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

      console.log(`Response from create profile: ${JSON.stringify(data)}`); // Additional log for debugging

      if (ok && data && data.profileId) {
        Alert.alert('Success', 'Profile created successfully.');
        setProfileName(''); // Clear the input field
        fetchProfiles(); // Refresh the profiles list
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
    <View>
      <TextInput
        value={profileName}
        onChangeText={setProfileName}
        placeholder="Enter profile name"
      />
      <Button title="Create Profile" onPress={handleCreateProfile} />
      <FlatList
        data={profiles}
        keyExtractor={item => item.profileId.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToProfile(item)}>
            <Text>{item.profileName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
