/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
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
      location: {
        latitude: 4.624335,
        longitude: -74.063644,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5 * (screenWidth / screenHeight),
      },
      name: '',
      geoID: null,
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('home_cargapp');
    const { getProfile, getsOffers, user } = this.props;
    getsOffers();
    getProfile();
    try {
      this.geolocation();
    } catch (error) {
      console.log(error);
      Geolocation.requestAuthorization();
    }
    console.log(user);
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
          this.componentWillUnmount();
        },
      );
    }
    Linking.getInitialURL().then((url) => {
      this.navigate(url);
    });
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    const { geoID } = this.state;
    Geolocation.clearWatch(geoID);
  }

  onNavigate(screen, obj) {
    const { navigation } = this.props;
    navigation.navigate(screen, obj);
    if (obj) {
      analytics().logEvent('boton_filtrar');
    } else {
      analytics().logEvent('boton_todos');
    }
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
    console.log('geolocation');
    const geoId = Geolocation.watchPosition((position) => {
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      };
      this.setState({ location: region });
    },
    error => console.log(error));
    this.setState({ geoID: geoId });
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
    const { profile } = this.props;
    const { location, name } = this.state;
    console.log(this.props);
    if (location.latitudeDelta !== 0.5 && profile.data !== null) {
      profile.data.map((data) => {
        if (name === '') {
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
            toolbarEnabled
            showsMyLocationButton
            showsTraffic
            showsCompass
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
              title={name !== '' ? `¡Hola ${name}!` : '¡Hola!'}
            />
            <NormalText>Buscar viajes disponibles</NormalText>
            <WrapperSwipeable>
              <SwipeableHome text="Todos" press={() => this.onNavigate('Second')} />
              <SwipeableHome text="Buscar viajes" press={() => this.onNavigate('Second', { filter: true })} />
              <SwipeableHome text="Cerca a tí" press={() => this.onNavigate('')} />
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
    user,
  } = state;
  return {
    offers,
    profile,
    geolocation,
    user,
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
