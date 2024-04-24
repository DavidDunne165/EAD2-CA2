import React, {useState, useEffect, useCallback} from 'react';
import {
  Box,
  Input,
  Button,
  Alert,
  Text,
  Center,
  Avatar,
  VStack,
  HStack,
} from 'native-base';
import {Pressable} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchApi} from '../api/api';
import { useTranslation } from 'react-i18next';  // Import useTranslation

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [profileName, setProfileName] = useState('');
  const [profiles, setProfiles] = useState([]);
  const {userId} = route.params;
  const { t } = useTranslation();  // Initialize useTranslation

  const fetchProfiles = useCallback(async () => {
    try {
      const {ok, data} = await fetchApi(`User/${userId}`, 'GET');
      if (ok) {
        setProfiles(data.profiles.$values || []);
      } else {
        Alert.alert(t('error_title'), t('fetch_profiles_error'));  // Use translation for alerts
      }
    } catch (error) {
      console.error('Fetch profiles error:', error);
      Alert.alert(t('error_title'), `${t('fetch_profiles_error')}: ${error.message}`);
    }
  }, [userId, t]);

  useEffect(() => {
    if (userId) {
      fetchProfiles();
    } else {
      console.error('No userId found');
      Alert.alert(t('error_title'), t('no_user_id_error'));
    }
  }, [userId, fetchProfiles, t]);

  const handleCreateProfile = async () => {
    if (profileName.trim() === '') {
      Alert.alert(t('error_title'), t('enter_profile_name_error'));
      return;
    }

    try {
      const profileData = {profileName, userId};
      const {ok, data} = await fetchApi('Profile', 'POST', profileData);

      if (ok && data && data.profileId) {
        Alert.alert(t('success_title'), t('profile_creation_success'));
        setProfileName('');
        fetchProfiles();
      } else {
        console.error('Failed to create profile:', JSON.stringify(data));
        Alert.alert(
          t('error_title'),
          data.error || t('profile_creation_fail_error')
        );
      }
    } catch (error) {
      console.error('Network or parsing error:', error);
      Alert.alert(t('error_title'), `${t('network_parsing_error')}: ${error.message}`);
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
          placeholder={t('enter_profile_name')}  // Translated placeholder
          variant="filled"
          size="md"
        />
        <Button onPress={handleCreateProfile}>{t('create_profile')}</Button>  // Translated button text
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
                    <Text mt="2">{profile.profileName}</Text>  // Assuming profile names do not require translation
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
