import React, { Component } from 'react';
import Input from '../../components/GeneralInput';
import ButtonWhite from '../../components/ButtonWhite';
import ButtonGradient from '../../components/ButtonGradient';
import {
  MainWrapper,
  TextBlack,
  TextBlue,
  TextGray,
  SvgUri,
  WrapperInputs,
  WrapperButtonsBottom,
  TextTerms,
  WrapperButtonGradient,
  WrapperSocialButtons,
} from '../Registration/style';
import ButtonSocial from '../../components/ButtonSocial';

class Registration extends Component {
  constructor() {
    super();
    this.state = {};
  }

  /* eslint-disable global-require */
  render() {
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    const { navigate } = this.props.navigation;
    return (
      <MainWrapper>
        <SvgUri source={require('../../Images/Logo3x.png')} />
        <TextBlack>
                    Bienvenido al
          <TextBlue>
            {' '}
                        Futuro
          </TextBlue>
        </TextBlack>
        <TextGray>El mejor aliado para su operación</TextGray>
        <WrapperSocialButtons>
          <ButtonSocial colorBackground="#4285f4" colorLogo="white" text="Ingresar con Google" />
        </WrapperSocialButtons>
        <WrapperSocialButtons>
          <ButtonSocial colorBackground="#4465b8" colorLogo="#4465b8" text="Ingresar con Facebook" />
        </WrapperSocialButtons>
        <WrapperInputs>
          <Input title="Correo electrónico" />
          <Input title="Contraseña" />
        </WrapperInputs>
        <WrapperButtonsBottom>
          {/* eslint-disable-next-line react/prop-types */}
          <WrapperButtonGradient>
            <ButtonWhite press={() => navigate('SignUp')} content="Registrarse" />
          </WrapperButtonGradient>
          <WrapperButtonGradient>
            <ButtonGradient press={() => navigate('')} content="Ingresar" />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
      </MainWrapper>
    );
  }
}

export default Registration;
