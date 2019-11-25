import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { SafeAreaView, StatusBar } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { connect } from 'react-redux';
import DrawerScreen from './stacks/drawerScreen';

import { SignUpStackNavigator } from './stacks/stackScreen';
import SplashScreen from '../containers/Splash';
import GeolocationActions from '../redux/reducers/GeolocationRedux';

const Navigator = createAppContainer(createSwitchNavigator({
  Splash: SplashScreen,
  SignUpStack: SignUpStackNavigator,
  drawerScreen: DrawerScreen,
}, {
  headerMode: 'none',
  initialRouteName: 'Splash',
}));

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onHeartBeat = this.onHeartBeat.bind(this);
  }


  componentWillMount() {
    BackgroundGeolocation.onHeartbeat(this.onHeartBeat);

    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopTimeout: 1,
      heartbeatInterval: 20,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,
      startOnBoot: true,
      // HTTP / SQLite config
      url: 'http://yourserver.com/locations',
      batchSync: false,
      autoSync: true,
      headers: {
        'X-FOO': 'bar',
      },
      params: {
        auth_token: 'maybe_your_server_authenticates_via_token_YES?',
      },
    }, (state) => {
      console.log('- BackgroundGeolocation is configured and ready: ', state.enabled);

      if (!state.enabled) {

        BackgroundGeolocation.start(() => {
          console.log('- Start success');
        });
      }
    });
  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    BackgroundGeolocation.removeListeners();
  }


  onError(error) {
    console.warn('[location] ERROR -', error);
  }

  onHeartBeat(event) {
    // eslint-disable-next-line react/prop-types
    const { user, sendLocation, profile } = this.props;
    console.log('user', user);
    console.log('profile', profile);
    console.log('[onHeartBeat] -', event);
    // eslint-disable-next-line react/prop-types
    if (user.isLogged) {
      sendLocation({
        user_location: {
          longitude: event.location.coords.longitude,
          latitude: event.location.coords.latitude,
          city_id: 5,
          // eslint-disable-next-line react/prop-types
          user_id: profile.data[0].user.id,
          active: true,
        },
      });
    }
  }

  render() {
    return (
      <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navigator />
      </SafeAreaView>
    );
  }
}


const mapStateToProps = (state) => {
  const {
    user, profile,
  } = state;
  return {
    user, profile,
  };
};

const mapDispatchToProps = dispatch => ({
  sendLocation: params => dispatch(GeolocationActions.postLocationRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
