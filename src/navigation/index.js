import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import DrawerScreen from './stacks/drawerScreen';

import { SignUpStackNavigator } from './stacks/stackScreen';

const Navigator = createAppContainer(createSwitchNavigator({
  MenuDrawer: DrawerScreen,
  SignUpStack: SignUpStackNavigator,
}, {
  headerMode: 'none',
  initialRouteName: 'MenuDrawer',
}));

export default class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    return (
      <Navigator navigation={navigation} />
    );
  }
}
