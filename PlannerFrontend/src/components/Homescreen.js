// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchApi } from '../api/api';

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [profileName, setProfileName] = useState('');
  const [profiles, setProfiles] = useState([]);

  const { userId } = route.params;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { ok, data } = await fetchApi(`User/${userId}`, 'GET');
        if (ok) {
          // Directly use the profiles property since it's not within a $values array
          setProfiles(data.profiles.$values || []);
        } else {
          Alert.alert('Error', 'Could not fetch profiles.');
        }
      } catch (error) {
        console.error('Fetch profiles error:', error);
        Alert.alert('Error', `Could not fetch profiles: ${error.message}`);
      }
    };
  
    if (userId) {
      fetchProfiles();
    } else {
      console.error('No userId found');
      Alert.alert('Error', 'No userId was provided.');
    }
  }, [userId]);
  
  

  const handleCreateProfile = async () => {
    if (profileName.trim() === '') {
      Alert.alert('Error', 'Please enter a profile name.');
      return;
    }
    
    try {
      const { ok, data, error } = await fetchApi('Profile', 'POST', { profileName, userId });

      if (ok && data.ProfileId) {
        // Refresh the profiles list after creating a new profile
        fetchProfiles();
        Alert.alert('Success', 'Profile created successfully.');
      } else {
        Alert.alert('Error', 'Failed to create profile.');
      }
    } catch (error) {
      Alert.alert('Error', `Network or Parsing Error: ${error.message}`);
    }
  };

  const navigateToProfile = (profile) => {
    // Pass the entire profile object to the ProfileDetailScreen
    navigation.navigate('ProfileDetail', { profile });
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
        keyExtractor={(item) => item.profileId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToProfile(item)}>
            <Text>{item.profileName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
