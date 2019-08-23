import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
// MENU SCREENS
import ScreenHome from '../../containers/Home';
import ScreenTravels from '../../containers/Travels';
import ScreenMyTravels from '../../containers/MyTravels';
import ScreenMyVehicle from '../../containers/Vehicle';
import ScreenProfile from '../../containers/Profile';
// SIGN UP SCREENS
import ScreenLogin from '../../containers/Login';
import ScreenSignUp from '../../containers/Registration';
import ScreenVehicle from '../../containers/Registration/Vehicle';
import ScreenPersonalData from '../../containers/Registration/PersonalData';
import ScreenDocuments from '../../containers/Registration/Documents';

import {
  IconImg, IconLogo, TouchLeftMenu, TouchCenterMenu, TouchRightMenu,
  BoxPerfil, ImagenPerfil, CircleBorder, ImagenArrow,
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


// eslint-disable-next-line react/prop-types
function rightIconMenu({ navigation }) {
  return (
    <TouchRightMenu
      onPress={() => {
        // eslint-disable-next-line react/prop-types
        navigation.navigate('ScreenProfile');
      }}
    >
      <BoxPerfil
        style={{ width: '57%' }}
      >
        <CircleBorder
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#ff2557', '#320d8e']}
        >
          <ImagenPerfil
            source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
          />
        </CircleBorder>
      </BoxPerfil>
      <BoxPerfil style={{ width: '30%' }}>
        <ImagenArrow
          // eslint-disable-next-line global-require
          source={require('../../Images/arrow-down.png')}
        />
      </BoxPerfil>
    </TouchRightMenu>
  );
}

// eslint-disable-next-line react/prop-types
function centerIconMenu({ navigation }) {
  return (
    <TouchCenterMenu
      onPress={() => {
        // eslint-disable-next-line react/prop-types
        navigation.navigate('ScreenHome');
      }}
    >
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
      headerStyle: {
        // backgroundColor: '#f4511e',
      },
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
});

export const SignUpStackNavigator = createStackNavigator({
  Login: { screen: ScreenLogin },
  SignUp: { screen: ScreenSignUp },
  Vehicle: { screen: ScreenVehicle },
  personal: { screen: ScreenPersonalData },
  documents: { screen: ScreenDocuments },
}, {
  headerMode: 'none',
});

export const viajesStackNavigator = createStackNavigator({
  Second: {
    screen: ScreenTravels,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
});

export const myTravelsStackNavigator = createStackNavigator({
  Third: {
    screen: ScreenMyTravels,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
});

export const myVehicleStackNavigator = createStackNavigator({
  Quarter: {
    screen: ScreenMyVehicle,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
});

export const ProfileStackNavigator = createStackNavigator({
  Fifth: {
    screen: ScreenProfile,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
});

// eslint-disable-next-line react/no-typos
leftIconMenu.PropTypes = {
  navigation: PropTypes.any.isRequired,
};

// eslint-disable-next-line react/no-typos
centerIconMenu.PropTypes = {
  navigation: PropTypes.any.isRequired,
};
