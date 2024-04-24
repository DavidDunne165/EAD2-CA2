import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/components/AppNavigator';
import LanguageSwitcher from './src/components/LanguageSwitcher';
import './Localisation/i18n';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Box safeAreaTop width="100%" backgroundColor="primary.600">
          <LanguageSwitcher />
        </Box>
        <AppNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
