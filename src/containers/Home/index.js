import React, { Component } from 'react';
import { Linking, Dimensions, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import analytics from '@react-native-firebase/analytics';
import {
  MainWrapper, NormalText, WrapperSwipeable, WrapperContent, CustomImage,
} from './style';
import SwipeableHome from '../../components/SwipeableHome';
import CardInfoStad from '../../components/CardInfoStad';
import ProfileActions from '../../redux/reducers/ProfileRedux';
import OffersActions from '../../redux/reducers/OffersRedux';
import images from '../../icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      unmount: false,
      location: {
        latitude: 4.624335,
        longitude: -74.063644,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5 * (screenWidth / screenHeight),
        name: null,
      },
    };
  }


  componentDidMount() {
    analytics().setCurrentScreen('home_cargapp');
    const { getProfile, getsOffers } = this.props;
    getsOffers();
    getProfile();
    this.geolocation();
    const that = this;
    if (!this.didFocusListener) {
      this.didFocusListener = this.props.navigation.addListener(
        'didFocus',
        () => {
          if (that.state.unmount) {
            this.setState({ unmount: false });
            this.componentDidMount();
          }
        },
      );
    }
    if (!this.didBlurListener) {
      this.didBlurListener = this.props.navigation.addListener(
        'didBlur',
        () => {
          that.setState({ unmount: true });
        },
      );
    }
    Linking.getInitialURL().then((url) => {
      this.navigate(url);
    });
    Linking.addEventListener('url', this.handleOpenURL);
  }

  getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return getActiveRouteName(route);
    }
    return route.routeName;
  }

  geolocation() {
    Geolocation.watchPosition((position) => {
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      };
      this.setState({ location: region });
    });
  }

  handleOpenURL(event) {
    this.navigate(event.url);
  }

  navigate(url) {
    const { navigation } = this.props;
    if (
      url !== 'cargapplite://'
      && url !== 'exp://yx-zvg.cargapp.cargapp-lite.exp.direct:80'
    ) {
      let idItem = url.replace(/.*?:\/\/cargapp.app.link\/psicLa1y7Y/g, '');
      idItem = idItem.replace(/\?offer=/g, '');
      console.log(idItem);
      if (idItem !== '') {
        navigation.navigate('ApplyTravels', { idShare: idItem, share: true });
      }
    }
  }

  render() {
    const { navigation, profile } = this.props;
    const { location, name } = this.state;
    console.log(this.props);
    if (location.latitudeDelta !== 0.5 && profile.data !== null) {
      profile.data.map(data => {
        if (name === null) {
          this.setState({ name: data.profile.firt_name });
        }
      });
      return (
        <MainWrapper>
          <MapView
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: location.latitudeDelta,
              longitudeDelta: location.longitudeDelta,
            }}
            followsUserLocation
            showsIndoorLevelPicker
            style={{ height: '100%', width: '100%' }}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            >
              <CustomImage source={images.truck} />
            </MapView.Marker>
          </MapView>
          <WrapperContent>
            <CardInfoStad
              valuePoint="100"
              textKm="Kms recorridos"
              valueKm="12.000"
              textPoint="Puntos Acumulados"
              title={'¡Hola' + name ? + ' ' + name + '!' : '!' }
            />
            <NormalText>Buscar viajes disponibles</NormalText>
            <WrapperSwipeable>
              <SwipeableHome text="Todos" press={() => navigation.navigate('Second')} />
              <SwipeableHome text="Filtros específicos" press={() => navigation.navigate('Second', { filter: true })} />
            </WrapperSwipeable>
          </WrapperContent>
        </MainWrapper>
      );
    } return (
      <ActivityIndicator
        style={{ alignSelf: 'center', height: '100%' }}
        size="large"
        color="#0000ff"
      />
    );
  }
}


const mapStateToProps = (state) => {
  const {
    offers,
    profile,
    geolocation,
  } = state;
  return {
    offers,
    profile,
    geolocation,
  };
};

const mapDispatchToProps = dispatch => ({
  getProfile: params => dispatch(ProfileActions.getProfileRequest(params)),
  getsOffers: params => dispatch(OffersActions.getOffersRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
