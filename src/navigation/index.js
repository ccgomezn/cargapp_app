import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { SafeAreaView, StatusBar } from 'react-native';
import DrawerScreen from './stacks/drawerScreen';
import { SignUpStackNavigator } from './stacks/stackScreen';

const Navigator = createAppContainer(createSwitchNavigator({
  drawerScreen: DrawerScreen,
  SignUpStack: SignUpStackNavigator,
}, {
  headerMode: 'none',
  initialRouteName: 'SignUpStack',
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
