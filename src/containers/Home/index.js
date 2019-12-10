import React, { Component } from 'react';
import { Linking } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import {
  MainWrapper, NormalText, WrapperSwipeable, WrapperContent,
} from './style';
import SwipeableHome from '../../components/SwipeableHome';
import CardInfoStad from '../../components/CardInfoStad';
import ProfileActions from '../../redux/reducers/ProfileRedux';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      unmount: false,
    };
  }


  componentDidMount() {
    const { getProfile } = this.props;

    getProfile();

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
        navigation.navigate('Detail', { itemId: idItem, share: true });
      }
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <MainWrapper>
        <MapView
          initialRegion={{
            latitude: 4.624335,
            longitude: -74.063644,
            latitudeDelta: 0.10,
            longitudeDelta: 0.10,
          }}
          showsUserLocation
          followsUserLocation
          showsIndoorLevelPicker
          style={{ height: '100%', width: '100%' }}
        />
        <WrapperContent>
          <CardInfoStad valuePoint="12000" textKm="Kms recorridos" valueKm="12000" textPoint="1222" title="¡Hola Ernesto!" />
          <NormalText>Buscar viajes disponibles</NormalText>
          <WrapperSwipeable>
            <SwipeableHome text="Todos" press={() => navigation.navigate('Second')} />
            <SwipeableHome text="Filtros específicos" press={() => navigation.navigate('Second', { filter: true })} />
          </WrapperSwipeable>
        </WrapperContent>
      </MainWrapper>
    );
  }
}


const mapStateToProps = (state) => {
  const {

  } = state;
  return {
  };
};

const mapDispatchToProps = dispatch => ({
  getProfile: params => dispatch(ProfileActions.getProfileRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
