import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/components/AppNavigator';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
