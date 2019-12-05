import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';
import ScreenHome from '../../containers/Home';
import { homeStackNavigator, myTravelsStackNavigator } from './stackScreen';
import ButtonGradient from '../components/ButtonGradient';
import { NormalText } from '../style';

const AppStack = createBottomTabNavigator({
  First: { screen: homeStackNavigator },
  Gif: { screen: ScreenHome },
  Services: { screen: ScreenHome },
  MyTravels: { screen: myTravelsStackNavigator },
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      if (routeName === 'First') {
        return focused
          ? <ButtonGradient press={null} content="Inicio" disabled={false} />
          : <NormalText>Inicio</NormalText>;
      }
      if (routeName === 'Gif') {
        return focused
          ? <ButtonGradient press={null} content="Premios" disabled={false} />
          : <NormalText>Premios</NormalText>;
      }
      if (routeName === 'Services') {
        return focused
          ? <ButtonGradient press={null} content="Servicios" disabled={false} />
          : <NormalText>Servicios</NormalText>;
      }
      if (routeName === 'MyTravels') {
        return focused
          ? <ButtonGradient press={null} content="Mis viajes" disabled={false} />
          : <NormalText>Mis viajes</NormalText>;
      }
    },
  }),
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
