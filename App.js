/* eslint-disable class-methods-use-this */
/**
 * APP.js React Native CargAPp
 * https://github.com/cargappco/cargapp_app
 *
 */

import React from 'react';
import {
  Text, Alert, AsyncStorage, useState, useEffect,
} from 'react-native';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/lib/integration/react';
import { PersistGate } from 'redux-persist/integration/react';
import { firebase } from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import Navigator from './src/navigation';
import { store, persistor } from './src/redux/store';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
    this.createBackgroundNotifications();
  }


  // eslint-disable-next-line class-methods-use-this
  async createBackgroundNotifications() {
    firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {

    });
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    console.log('enableMS', enabled);
    if (enabled) {
      console.log('getToken', await firebase.messaging().getToken());
      /* firebase.messaging().ios.registerForRemoteNotifications().then(() => {
        firebase.messaging().ios.getAPNSToken().then((token) => {
          console.log('tokenRmote', token);
        });
      });
      // console.log('token do usuário:', token);
      console.log('getAPN', await firebase.messaging().ios.getAPNSToken());
      await firebase.messaging().registerForRemoteNotifications();
      console.log('getToken', await firebase.messaging().getToken()); */
    } else {
      this.requestPermission();
    }
  }


  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    firebase.messaging().onMessage(async (remoteMessage) => {
      console.log('FCM Message Data:', remoteMessage.data);

      // Update a users messages list using AsyncStorage
      const currentMessages = await AsyncStorage.getItem('messages');
      const messageArray = JSON.parse(currentMessages);
      messageArray.push(remoteMessage.data);
      await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }


  render() {
    return (

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
