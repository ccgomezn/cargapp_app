import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import images from '../../icons';
import ScreenHome from '../../containers/HomeOffers';
import { homeStackNavigator, myTravelsStackNavigator, travelsStackNavigator } from './stackScreen';
import ButtonGradient from '../components/ButtonGradient';
import { NormalText, IconBottomNav } from '../style';

const AppStack = createBottomTabNavigator({
  First: { screen: homeStackNavigator },
  HomeOffers: { screen: travelsStackNavigator },
  Services: { screen: ScreenHome },
  MyTravels: { screen: myTravelsStackNavigator },
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      if (routeName === 'First') {
        return focused
          ? <ButtonGradient press={null} content="Inicio" disabled={false} />
          : (
            <>
              <IconBottomNav source={images.home} />
              <NormalText>Inicio</NormalText>
            </>
          );
      }
      if (routeName === 'HomeOffers') {
        return focused
          ? <ButtonGradient press={null} content="Viajes" disabled={false} />
          : (
            <>
              <IconBottomNav source={images.offers} />
              <NormalText>Viajes</NormalText>
            </>
          );
      }
      if (routeName === 'Services') {
        return focused
          ? <ButtonGradient press={null} content="Servicios" disabled={false} />
          : (
            <>
              <IconBottomNav source={images.services} />
              <NormalText>Servicios</NormalText>
            </>
          );
      }
      if (routeName === 'MyTravels') {
        return focused
          ? <ButtonGradient press={null} content="Mis viajes" disabled={false} />
          : (
            <>
              <IconBottomNav source={images.myTravels} />
              <NormalText>Mis viajes</NormalText>
            </>
          );
      }
    },
  }),
  unmountInactiveScreens: true,
  tabBarOptions: {
    inactiveTintColor: 'gray',
    showLabel: false,
    style: {
      height: 65,
    },
  },
  initialRouteName: 'First',
});

export default AppStack;
