// HomeScreen.js
import React from 'react';
import { View, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation

const HomeScreen = () => {
  const navigation = useNavigation(); // Hook for navigation

  const handleProfileSelect = (profileType) => {
    // Navigate to the EventCreationScreen with the profileType as a parameter
    navigation.navigate('EventCreation', { profileType });
  };

  return (
    <View>
      <Text>Select your profile:</Text>
      <Button title="Work" onPress={() => handleProfileSelect('Work')} />
      <Button title="School" onPress={() => handleProfileSelect('School')} />
      <Button title="Family" onPress={() => handleProfileSelect('Family')} />
    </View>
  );
};

export default HomeScreen;
