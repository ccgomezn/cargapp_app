import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { SafeAreaView, StatusBar } from 'react-native';
import DrawerScreen from './stacks/drawerScreen';
import { SignUpStackNavigator } from './stacks/stackScreen';
import SplashScreen from '../containers/Splash';

const Navigator = createAppContainer(createSwitchNavigator({
  Splash: SplashScreen,
  SignUpStack: SignUpStackNavigator,
  drawerScreen: DrawerScreen,
}, {
  headerMode: 'none',
  initialRouteName: 'Splash',
}));

export default class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navigator />
      </SafeAreaView>
    );
  }
}
