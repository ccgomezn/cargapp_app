import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
// MENU SCREENS
import ScreenHome from '../../containers/screenHome';
import ScreenViajes from '../../containers/screenViajes';
// SIGN UP SCREENS
import ScreenSignUp from '../../containers/Registration';
import ScreenVehicle from '../../containers/Registration/Vehicle';

import {
  IconImg, IconLogo, TouchLeftMenu, TouchCenterMenu, TouchRightMenu,
} from '../style';

// eslint-disable-next-line react/prop-types
function leftIconMenu({ navigation }) {
  return (
    <TouchLeftMenu
      onPress={() => {
        // eslint-disable-next-line react/prop-types
        navigation.toggleDrawer();
      }
      }
    >
      <IconImg
        source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/menu3x.png' }}
      />
    </TouchLeftMenu>
  );
}

function rightIconMenu() {
  return (
    <TouchRightMenu>
      <Text>iconright</Text>
    </TouchRightMenu>
  );
}

function centerIconMenu() {
  return (
    <TouchCenterMenu>
      <IconLogo
        source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/logo3x.png' }}
      />
    </TouchCenterMenu>
  );
}

export const homeStackNavigator = createStackNavigator({
  First: {
    screen: ScreenHome,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerTitle: centerIconMenu(),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu(),
    }),
  },
});

export const SignUpStackNavigator = createStackNavigator({
  SignUp: { screen: ScreenSignUp },
  Vehicle: { screen: ScreenVehicle },
}, {
  headerMode: 'none',
});

export const viajesStackNavigator = createStackNavigator({
  Second: {
    screen: ScreenViajes,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerTitle: centerIconMenu(),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu(),
    }),
  },
});

// eslint-disable-next-line react/no-typos
leftIconMenu.PropTypes = {
  navigation: PropTypes.any.isRequired,
};
