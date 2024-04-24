import React from 'react';
import { Button } from 'native-base';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const LanguageSwitcher = () => {
  const { i18n } = useTranslation(); // Use i18next directly

  return (
    <>
      <Button onPress={() => i18n.changeLanguage('es')}>Español</Button>
      <Button onPress={() => i18n.changeLanguage('en')}>English</Button>
    </>
  );
};

export default LanguageSwitcher;
