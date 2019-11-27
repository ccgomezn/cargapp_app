import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
// MENU SCREENS
import ScreenHome from '../../containers/Home';
import ScreenTravels from '../../containers/Travels';
import ScreenApplyTravels from '../../containers/Travels/ApplyOffer';
import ScreenMyTravels from '../../containers/MyTravels';
import ScreenStartTravel from '../../containers/Travels/StartTravel';
import ScreenMyVehicle from '../../containers/Vehicle';
import ScreenProfile from '../../containers/Profile';
import ScreenPoints from '../../containers/Points';
import ScreenAnalytics from '../../containers/Analytics';
import ScreenCoupons from '../../containers/Coupons/General';
import ScreenCommerceCoupons from '../../containers/Coupons/Commerce';
import ScreenDetailsCoupons from '../../containers/Coupons/Detail';
import ScreenChat from '../../containers/Chat';
// SIGN UP SCREENS
// import ScreenSignUp from '../../containers/Registration';
import ScreenRegister from '../../containers/Registration/Register';
import ScreenVehicle from '../../containers/Registration/Vehicle';
import ScreenPersonalData from '../../containers/Registration/PersonalData';
import ScreenDocuments from '../../containers/Registration/Documents';
import ScreenLoginEmail from '../../containers/LoginEmail';
// RESET PASSWORD
import ScreenForgot from '../../containers/Registration/ForgotPass';
import ScreenReset from '../../containers/Registration/ResetPass';
// REGISTER GENERATOR
import ScreenRegCompany from '../../containers/Registration/CompanyData';
import ScreenRegPay from '../../containers/Registration/PayData';

import {
  IconImg, IconLogo, TouchLeftMenu, TouchCenterMenu, TouchRightMenu,
  BoxPerfil, ImagenPerfil, CircleBorder, ImagenArrow, HeaderStyle,
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
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
});

export const CouponsStackNavigator = createStackNavigator({
  MainCoupons: {
    screen: ScreenCoupons,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
  CommerceCoupons: {
    screen: ScreenCommerceCoupons,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
  DetailsCoupons: {
    screen: ScreenDetailsCoupons,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
});

export const SignUpStackNavigator = createStackNavigator({
  // Login: { screen: ScreenLogin },
  // SignUp: { screen: ScreenSignUp },
  LoginEmail: { screen: ScreenLoginEmail },
  Register: { screen: ScreenRegister },
  Vehicle: { screen: ScreenVehicle },
  Personal: { screen: ScreenPersonalData },
  Documents: { screen: ScreenDocuments },
  ForgotPass: { screen: ScreenForgot },
  ResetPass: { screen: ScreenReset },
  RegCompany: { screen: ScreenRegCompany },
  RegPay: { screen: ScreenRegPay },
}, {
  headerMode: 'none',
});

export const viajesStackNavigator = createStackNavigator({
  Second: {
    screen: ScreenTravels,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
  ApplyTravels: {
    screen: ScreenApplyTravels,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerStyle: HeaderStyle,
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
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
  StartTravel: {
    screen: ScreenStartTravel,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerStyle: HeaderStyle,
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
      headerStyle: HeaderStyle,
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
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
});

export const PointsStackNavigator = createStackNavigator({
  Sixth: {
    screen: ScreenPoints,
    navigationOptions: () => ({
      headerTintColor: '#CCC',
      // headerStyle: HeaderStyle,
      // headerTitle: centerIconMenu({ navigation }),
      // headerLeft: leftIconMenu({ navigation }),
      // headerRight: rightIconMenu({ navigation }),
    }),
  },
},
{
  headerMode: 'none',
});

export const AnalyticsStackNavigator = createStackNavigator({
  Seventh: {
    screen: ScreenAnalytics,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
});

export const chatStackNavigator = createStackNavigator({
  Eighth: {
    screen: ScreenChat,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerStyle: HeaderStyle,
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
