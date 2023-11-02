/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, AppRegistry, PermissionsAndroid} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import Navigation from './src/navigation';
import {AuthProvider} from './src/components/Context/context';

function App(): JSX.Element {
  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  ReactNativeForegroundService.register();
  return (
    <SafeAreaView style={{flex: 1}}>
      <AuthProvider>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}
AppRegistry.registerComponent(appName, () => App);

export default App;
