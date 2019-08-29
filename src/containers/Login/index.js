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
import PopUpNotification from '../../components/PopUpNotifications';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
    };
  }

  modalChange() {
    const { modal } = this.state;
    this.setState({ modal: !modal });
    setTimeout(() => {
      this.setState({ modal: false });
    }, 3000);
  }

  /* eslint-disable global-require */
  render() {
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    const { navigate } = this.props.navigation;
    const { modal } = this.state;
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
            <ButtonGradient press={() => navigate('ScreenHome')} content="Ingresar" />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>
        <PopUpNotification
          subText="Estamos a la espera de la aprovación del cliente."
          mainText="En aprobación"
          onTouchOutside={() => this.modalChange()}
          visible={modal}
        />
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
      </MainWrapper>
    );
  }
}

export default Registration;
