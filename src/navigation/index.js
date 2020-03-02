/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { SafeAreaView, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { StatusBar } from 'react-native';
import { Wrapper, BoldText} from './style';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { connect } from 'react-redux';
import { firebase } from '@react-native-firebase/firestore';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { measureConnectionSpeed } from 'react-native-network-bandwith-speed';
import NetInfo from '@react-native-community/netinfo';
import { ContainerDriver, ContainerGenerator } from './stacks/drawerScreen';

import { SignUpStackNavigator } from './stacks/stackScreen';
import SplashScreen from '../containers/Splash';
import GeolocationActions from '../redux/reducers/GeolocationRedux';
import AppStack from './stacks/bottomNavigator';
import EmptyDialog from '../components/EmptyDialog';

const Navigator = createAppContainer(createSwitchNavigator({
  Splash: SplashScreen,
  SignUpStack: SignUpStackNavigator,
  DriverMenu: ContainerDriver,
  GeneratorMenu: ContainerGenerator,
}, {
  headerMode: 'none',
  initialRouteName: 'Splash',
  backBehavior: false,
}));

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      netSpeed: 0,
      modalVisible: false,
    };

    const unsubscribe = NetInfo.addEventListener(state => {
      this.getNetworkBandwidth();
      if (!state.isConnected && this.state.netSpeed > 0.5) {
        this.visibleNet();
      } else {
        this.setState({ modalVisible: false });
      }
    });
  }

  componentDidMount() {
    const { user , getLocationTargetRequest } = this.props;
    this.getNetworkBandwidth();

    if (user.isLogged) {
      getLocationTargetRequest();

      // This handler fires whenever bgGeo receives a location update.
      BackgroundGeolocation.onLocation(this.onLocation.bind(this), this.onError);
    
      // This handler fires when movement states changes (stationary->moving; moving->stationary)
      BackgroundGeolocation.onMotionChange(this.onMotionChange);

      // This event fires when a change in motion activity is detected
      BackgroundGeolocation.onActivityChange(this.onActivityChange);

      // This event fires when the user toggles location-services authorization
      BackgroundGeolocation.onProviderChange(this.onProviderChange);
      
      BackgroundGeolocation.ready({
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 1200,
        stopTimeout: 1,
        debug: true,
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: false,
        startOnBoot: true,
        batchSync: false,
        autoSync: true,
        headers: {
          'X-FOO': 'bar',
        },
        params: {
          auth_token: 'maybe_your_server_authenticates_via_token_YES?',
        },
      }, (state) => {
        // console.log('- BackgroundGeolocation is configured and ready: ', state.enabled);

        if (!state.enabled) {
          BackgroundGeolocation.start(() => {
            // console.log('- Start success');
          });
        }
      });

    }
  }

  componentWillUnmount() {
    BackgroundGeolocation.removeListeners();
  }

  async getNetworkBandwidth() {
    try {
      const networkSpeed: NetworkBandwidthTestResults = await measureConnectionSpeed();
      this.setState({ netSpeed: networkSpeed.speed });
    } catch (err) {
      console.log(err);
    }
  }

  visibleNet() {
    this.setState({ modalVisible: true });
    return <StatusBar backgroundColor="red" barStyle="dark-content" />;
  }

  onLocation(location) {
    console.log('[location] -', location);
    this.saveLocation(location);
  }

  saveLocation(location){
    const {
      user, sendLocation, profile, geolocation,
    } = this.props;

    if (user.isLogged && profile.data) {
      if (geolocation.target) {
        if (geolocation.target.parameters[0].name === 'local') {
          sendLocation({
            user_location: {
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
              city_id: 5,
              user_id: profile.data[0].user.id,
              active: true,
            },
          });
        } else if (geolocation.target.parameters[0].name === 'firebase') {
          firebase.firestore().collection('geolocation').add({
            user_id: profile.data[0].user.id,
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          });
        }
      }
    }
    
  }

  onError(error) {
    console.warn('[location] ERROR -', error);
  }
  onActivityChange(event) {
    console.log('[activitychange] -', event);
  }
  onProviderChange(provider) {
    console.log('[providerchange] -', provider.enabled, provider.status);
  }
  onMotionChange(event) {
    console.log('[motionchange] -', event.isMoving, event.location);
  }

  render() {
    const { modalVisible } = this.state;

    return (
      <SafeAreaView forceInset={{ top: 'never', bottom: 'never' }} style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <EmptyDialog onTouchOutside={() => {}} visible={modalVisible}>
          <Wrapper>
            <BoldText>
              Ops! En este momento no tienes conexión a internet...
            </BoldText>
          </Wrapper>
        </EmptyDialog>
        <Navigator />
      </SafeAreaView>
    );
  }
}


const mapStateToProps = (state) => {
  const {
    user, profile, geolocation,
  } = state;
  return {
    user, profile, geolocation,
  };
};

const mapDispatchToProps = dispatch => ({
  sendLocation: params => dispatch(GeolocationActions.postLocationRequest(params)),
  getLocationTargetRequest: () => dispatch(GeolocationActions.getLocationTargetRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
