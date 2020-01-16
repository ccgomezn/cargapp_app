import React, { Component } from 'react';
import { StatusBar, PermissionsAndroid, Platform } from 'react-native';
import { measureConnectionSpeed } from 'react-native-network-bandwith-speed';
import {
  MainWrapper, ImageUrl, Text, Wrapper, BoldText,
} from './style';
import EmptyDialog from '../../components/EmptyDialog';

const THREE_SECONDS = 3000;

class Splash extends Component {
  constructor() {
    super();
    this.state = {
      permission: null,
    };
  }

  async requestPermission() {
    if (Platform === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Cargapp',
            message: 'Cargapp neccesita acceso a tu ubicación',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        const grantedTwo = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Cargapp',
            message: 'Cargapp neccesita acceso a su almacenamiento',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        const { navigation } = this.props;
        const network = await measureConnectionSpeed()
          .then((networkSpeed) => {
            if (
              granted
                          && grantedTwo === PermissionsAndroid.RESULTS.GRANTED
                          && networkSpeed.speed > 0.5
            ) {
              this.setState({ permission: true });
              setTimeout(() => {
                navigation.navigate('SignUpStack');
              }, THREE_SECONDS);
            } else {
              this.setState({ permission: false });
              this.requestPermission();
            }
          })
          .catch((err) => {
            console.log(err);
            this.requestPermission();
          });
      } catch (e) {
        this.setState({ permission: false });
      }
    } else {
      this.setState({ permission: true });
      return true;
    }
  }

  async componentDidMount() {
    const { navigation } = this.props;
    await this.requestPermission();
    if (this.state.permission) {
      setTimeout(() => {
        navigation.navigate('SignUpStack');
      }, THREE_SECONDS);
    } else {
      null;
    }
    setTimeout(() => {
      this.setState({ init: true });
    }, 1000);
    this.state.init && this.setState({ init: false });
  }

  render() {
    const { permission, init } = this.state;
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
        <EmptyDialog onTouchOutside={() => {}} visible={!permission}>
          <Wrapper>
            <BoldText>
              {!init
                ? 'Espera un momento...'
                : 'Ops! En este momento no tienes conexión a internet'}
            </BoldText>
          </Wrapper>
        </EmptyDialog>
        <StatusBar backgroundColor="#010935" barStyle="light-content" />
        <ImageUrl source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/logoWhite3x.png' }} />
        <Text>© Todos los derechos reservados. Cargapp 2019</Text>
      </MainWrapper>
    );
  }
}

export default Splash;
