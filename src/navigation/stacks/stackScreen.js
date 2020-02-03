/* eslint-disable global-require */
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
// MENU SCREENS
import ScreenHomeOffers from '../../containers/HomeOffers';
import ScreenHome from '../../containers/Home';
// import ScreenTravels from '../../containers/Travels';
import ScreenApplyTravels from '../../containers/Travels/ApplyOffer';
import ScreenMyTravels from '../../containers/MyTravels';
import ScreenStartTravel from '../../containers/Travels/StartTravel';
import ScreenMyVehicle from '../../containers/Vehicle';
import ScreenProfile from '../../containers/Profile';
import ScreenPoints from '../../containers/Points';
import ScreenAnalytics from '../../containers/Analytics';
// CUPONS
import ScreenCoupons from '../../containers/Coupons/General';
import ScreenCommerceCoupons from '../../containers/Coupons/Commerce';
import ScreenDetailsCoupons from '../../containers/Coupons/Detail';
import ScreenChat from '../../containers/ChatList';
import ScreenBankAccount from '../../containers/BankAccount';
import ScreenDocumentsAccount from '../../containers/DocumentAccount';
// VEHICLES
import ScreenListVehicle from '../../containers/ListVehicles';

// SIGN UP SCREENS
// import ScreenSignUp from '../../containers/Registration';
import ScreenRegister from '../../containers/Registration/Register';
import ScreenVehicle from '../../containers/Registration/Vehicle';
import ScreenInnerChat from '../../containers/Chat';
import ScreenPersonalData from '../../containers/Registration/PersonalData';
import ScreenDocuments from '../../containers/Registration/Documents';
import ScreenLoginEmail from '../../containers/LoginEmail';
// RESET PASSWORD
import ScreenForgot from '../../containers/Registration/ForgotPass';
import ScreenReset from '../../containers/Registration/ResetPass';
// REGISTER GENERATOR
import ScreenRegCompany from '../../containers/Registration/CompanyData';
import ScreenRegPay from '../../containers/Registration/PayData';
// CONFIG
import ScreenConfig from '../../containers/Config';
// SERVICES
import ScreenService from '../../containers/Services';

import {
  IconImg, IconLogo, TouchLeftMenu, TouchCenterMenu, TouchRightMenu,
  BoxPerfil, ImagenPerfil, CircleBorder, ImagenArrow, HeaderStyle,
} from '../style';
// FILTER
import ScreenFilterOffers from '../../containers/FilterOffers';

// eslint-disable-next-line react/prop-types
function leftIconMenu({ navigation, goBack }) {
  return (
    <TouchLeftMenu
      onPress={() => (!goBack
        // eslint-disable-next-line react/prop-types
        ? navigation.toggleDrawer()
        : navigation.navigate('ScreenHome'))
      }
    >
      <IconImg
        source={{
          uri: !goBack ? 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/menu3x.png'
            : 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/home.svg',
        }}
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
            source={require('../../Images/profile.jpg')}
          />
        </CircleBorder>
      </BoxPerfil>
      <BoxPerfil style={{ width: '30%' }}>
        <ImagenArrow
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
      headerTintColor: '#116cff',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
  DetailsCoupons: {
    screen: ScreenDetailsCoupons,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#116cff',
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

export const stackStartTravelNavigator = createStackNavigator({
  StartTravel: {
    screen: ScreenStartTravel,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#116cff',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation, goBack: true }),
    }),
  },
});

export const travelsStackNavigator = createStackNavigator({
  Second: {
    screen: ScreenHomeOffers,
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
      headerTintColor: '#116cff',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
  Filter: {
    screen: ScreenFilterOffers,
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
  ApplyTravels: {
    screen: ScreenApplyTravels,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#116cff',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
});

export const myVehicleStackNavigator = createStackNavigator({
  ListVehicle: {
    screen: ScreenListVehicle,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
  DetailVehicle: {
    screen: ScreenMyVehicle,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#116cff',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
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
  BankAccount: {
    screen: ScreenBankAccount,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#116cff',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerTruncatedBackTitle: 'Atras',
    }),
  },
  DocumentsAccount: {
    screen: ScreenDocumentsAccount,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#116cff',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerTruncatedBackTitle: 'Atras',
    }),
  },
});

export const PointsStackNavigator = createStackNavigator({
  Sixth: {
    screen: ScreenPoints,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#CCC',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerLeft: leftIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
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

export const ServicesStackNavigator = createStackNavigator({
  Services: {
    screen: ScreenService,
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
      headerTintColor: '#116cff',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
  DetailsCoupons: {
    screen: ScreenDetailsCoupons,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#116cff',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
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
  InnerChat: {
    screen: ScreenInnerChat,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#116cff',
      headerStyle: HeaderStyle,
      headerTitle: centerIconMenu({ navigation }),
      headerRight: rightIconMenu({ navigation }),
    }),
  },
});

export const ConfigStackNavigator = createStackNavigator({
  Config: {
    screen: ScreenConfig,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#116cff',
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
