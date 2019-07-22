import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import ScreenHome from '../../containers/screenHome';
import ScreenViajes from '../../containers/screenViajes';
// SIGN UP SCREENS
import ScreenSignUp from '../../containers/Registration';
import ScreenVehicle from '../../containers/Registration/Vehicle';
import ScreenPersonalData from '../../containers/Registration/PersonalData';

// eslint-disable-next-line react/prop-types
function leftIconMenu({ navigation }) {
  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          // eslint-disable-next-line react/prop-types
          navigation.toggleDrawer();
        }
        }
      >
        <Text>iconleft</Text>
      </TouchableHighlight>
    </View>
  );
}

function rightIconMenu() {
  return (
    <View>
      <TouchableHighlight>
        <Text>iconleft</Text>
      </TouchableHighlight>
    </View>
  );
}

export const homeStackNavigator = createStackNavigator({
  First: {
    screen: ScreenHome,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerStyle: {
        backgroundColor: 'rgb(255, 45, 25)',
      },
      headerTintColor: 'white',
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu(),
    }),
  },
});

export const SignUpStackNavigator = createStackNavigator({
  SignUp: { screen: ScreenSignUp },
  Vehicle: { screen: ScreenVehicle },
  personal: { screen: ScreenPersonalData },
}, {
  headerMode: 'none',
});

export const viajesStackNavigator = createStackNavigator({
  Second: {
    screen: ScreenViajes,
    navigationOptions: ({ navigation }) => ({
      title: 'Mis Viajes',
      headerStyle: {
        backgroundColor: 'rgb(255, 45, 25)',
      },
      headerTintColor: 'white',
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu(),
    }),
  },
});

// eslint-disable-next-line react/no-typos
leftIconMenu.PropTypes = {
  navigation: PropTypes.any.isRequired,
};
