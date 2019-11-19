import React, { Component } from 'react';
import { StatusBar, PermissionsAndroid } from 'react-native';
import { MainWrapper, ImageUrl, Text } from './style';

const THREE_SECONDS = 3000;

class Splash extends Component {
  constructor() {
    super();
    this.state = {
      permission: null,
    };
  }

  async requestPermission() {
    try {
      const grantedTwo = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cargapp',
          message: 'Cargapp neccesita acceso a tu ubicación',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      ).then(() => {
        this.setState({ permission: true });
      })
        .catch(() => {
          this.setState({ permission: false });
        });
    } catch (e) {
      this.setState({ permission: false });
    }
  }

  componentDidMount() {
    this.requestPermission();
  }

  render() {
    const { permission } = this.state;
    const { navigation } = this.props;
    if (permission) {
      setTimeout(() => {
        // eslint-disable-next-line react/prop-types
        navigation.navigate('SignUpStack');// SignUpStack--drawerScreen
      }, THREE_SECONDS);
    } else {
      this.componentDidMount();
    }
    return (
      <MainWrapper>
        <StatusBar backgroundColor="#010935" barStyle="light-content" />
        <ImageUrl source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/logoWhite3x.png' }} />
        <Text>© Todos los derechos reservados. Cargapp 2019</Text>
      </MainWrapper>
    );
  }
}

export default Splash;
