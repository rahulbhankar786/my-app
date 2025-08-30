import { Assets as NavigationAssets } from '@react-navigation/elements';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { I18nManager, useColorScheme } from 'react-native';
import { Navigation } from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "@myapp/i18n"; 
import i18n from '@myapp/i18n/index';
import { storageKey } from './utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

preventAutoHideAsync();

const prefix = createURL('/');
export const App = () =>{
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

  const setLanguage = async () => {
    AsyncStorage.getItem(storageKey.language).then((savedLanguage) => {
      if (i18n.dir() === "rtl") {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
      } else {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
      }
      if(!savedLanguage) {
        i18n.changeLanguage('en');
      } else {
        i18n.changeLanguage(savedLanguage);
      }
    });
  }

  useEffect(() => {
    setLanguage();
  }, []);

  return (
    <GestureHandlerRootView>
      <Navigation
        theme={theme}
        linking={{
          enabled: 'auto',
          prefixes: [prefix],
        }}
        onReady={() => {
          hideAsync();
        }}
      />
    </GestureHandlerRootView>
  );
}
