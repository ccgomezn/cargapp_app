import { createStackNavigator, createAppContainer } from 'react-navigation';
import DrawerScreen from './stacks/drawerScreen';

const Navigator = createStackNavigator({
  drawerScreen: { screen: DrawerScreen },
}, {
  headerMode: 'none',
  initialRouteName: 'drawerScreen',
});

export default createAppContainer(Navigator);
