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
    this.onHeartBeat = this.onHeartBeat.bind(this);
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
    this.getNetworkBandwidth();
  }

  componentWillMount() {
    const { getLocationTargetRequest } = this.props;
    BackgroundGeolocation.onHeartbeat(this.onHeartBeat);
    getLocationTargetRequest();

    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      heartbeatInterval: 60,
      preventSuspend: true,
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
      console.log('- BackgroundGeolocation is configured and ready: ', state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(() => {
          console.log('- Start success');
        });
      }
    });
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

  onError(error) {
    console.warn('[location] ERROR -', error);
  }

  onHeartBeat(event) {
    // eslint-disable-next-line react/prop-types
    const {
      user, sendLocation, profile, geolocation,
    } = this.props;
    BackgroundGeolocation.getCurrentPosition({
      samples: 1,
      persist: true,
    }).then((location) => {
      if (user.isLogged && profile.data) {
        if (geolocation.target) {
          if (geolocation.target.parameters[0].name === 'local') {
            console.log('local');

            sendLocation({
              user_location: {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
                city_id: 5,
                // eslint-disable-next-line react/prop-types
                user_id: profile.data[0].user.id,
                active: true,
              },
            });
          } else if (geolocation.target.parameters[0].name === 'firebase') {
            console.log('firebase');
            firebase.firestore().collection('geolocation').add({
              user_id: profile.data[0].user.id,
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
            });
          }
        }
      }
    }).catch((error) => {
      console.log('- BackgroundGeolocation error: ', error);

      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then((data) => {
        }).catch((err) => {
        });
    });

    // eslint-disable-next-line react/prop-types
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
  getLocationTargetRequest: params => dispatch(GeolocationActions.getLocationTargetRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
