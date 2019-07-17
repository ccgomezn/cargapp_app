import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { Image, StyleSheet, Dimensions } from 'react-native';

import { homeStackNavigator, viajesStackNavigator } from './stackScreen';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
  },
});

const DrawerScreen = createDrawerNavigator(
  {
    ScreenHome: {
      screen: homeStackNavigator,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: () => (
          <Image
            // eslint-disable-next-line global-require
            source={require('../../icons/icon_1.png')}
            style={[styles.icon]}
          />
        ),
      },
    },
    ScreenViajes: {
      screen: viajesStackNavigator,
      navigationOptions: {
        drawerLabel: 'Mis Viajes',
        drawerIcon: () => (
          <Image
            // eslint-disable-next-line global-require
            source={require('../../icons/icon_2.png')}
            style={[styles.icon]}
          />
        ),
      },
    },
  }, {
    headerMode: 'float',
    initialRouteName: 'ScreenHome',
    drawerWidth: Math.min(height, width) * 0.6,
    contentOptions: {
      activeTintColor: 'blue',
      TintColor: '#efefef',
      activeBackgroundColor: 'gray',
      itemsContainerStyle: {
        marginVertical: 60,
        backgroundColor: '#fff',
      },
      iconContainerStyle: {
        opacity: 1,
      },
    },
  },
);

export default createAppContainer(DrawerScreen);
