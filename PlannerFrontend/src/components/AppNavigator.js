import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './Homescreen';
import EventCreationScreen from './EventCreationScreen';
import ProfileDetailScreen from './ProfileDetailScreen';
import EditEventScreen from './EditEventScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
      <Stack.Screen name="EventCreation" component={EventCreationScreen} />
      <Stack.Screen name="EditEvent" component={EditEventScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
