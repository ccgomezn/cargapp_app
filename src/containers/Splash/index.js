import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { MainWrapper, ImageUrl, Text } from './style';

const THREE_SECONDS = 3000;

class Splash extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      navigation.navigate('SignUpStack');// documents--SignUp--SignUpStack--drawerScreen
    }, THREE_SECONDS);
  }

  render() {
    return (
      <MainWrapper>
        <StatusBar backgroundColor="#010935" barStyle="light-content" />
        {/* eslint-disable-next-line global-require */}
        <ImageUrl source={require('../../Images/LogoWhite3x.png')} />
        <Text>© Todos los derechos reservados. Cargapp 2019</Text>
      </MainWrapper>
    );
  }
}

export default Splash;
