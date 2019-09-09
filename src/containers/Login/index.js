import React, { Component } from 'react';
import InputCode from 'react-native-input-code';
import Input from '../../components/GeneralInput';
import ButtonWhite from '../../components/ButtonWhite';
import ButtonGradient from '../../components/ButtonGradient';
import Dialog from '../../components/EmptyDialog';

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
  MainWrapperDialog,
  ContentDialog,
  WrapperText,
  TitleBlack,
  SubtGray,
  TouchModal,
  ScrollDialog,
  SvgModal,
  SvgUriModal,
  IconModal,
} from '../Registration/style';
import PopUpNotification from '../../components/PopUpNotifications';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      modalPin: false,
    };
  }

  onPressPin() {
    this.setState({ modalPin: true });
  }

  // eslint-disable-next-line class-methods-use-this
  onFullFill(code) {
    // eslint-disable-next-line no-alert
    alert(code);
    // this.setState({ inputCode: code });
    // function validar pin
  }

  OnHideModal() {
    this.setState({ modalPin: false });
  }

  // eslint-disable-next-line class-methods-use-this
  init(nav) {
    this.OnHideModal();
    setTimeout(() => {
      nav('ScreenHome');
    }, 1000);
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
    const { modal, modalPin } = this.state;
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
        {/* <WrapperSocialButtons>
          <ButtonSocial colorBackground="#4285f4" colorLogo="white" text="Ingresar con Google" />
        </WrapperSocialButtons>
        <WrapperSocialButtons>
         <ButtonSocial colorBackground="#4465b8" colorLogo="#4465b8" text="Ingresar con Facebook" />
        </WrapperSocialButtons> */}
        <WrapperInputs>
          <Input title="Número de celular" holder="300000000" type="numeric" />
        </WrapperInputs>
        <WrapperButtonsBottom>
          {/* eslint-disable-next-line react/prop-types */}
          <WrapperButtonGradient>
            <ButtonWhite border press={() => navigate('Vehicle')} content="Registrarse" />
          </WrapperButtonGradient>
          <WrapperButtonGradient>
            <ButtonGradient press={() => this.onPressPin()} content="Ingresar" />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>
        <PopUpNotification
          subText="Estamos a la espera de la aprovación del cliente."
          mainText="En aprobación"
          onTouchOutside={() => this.modalChange()}
          visible={modal}
        />
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
        <Dialog
          visible={modalPin}
          opacity={0.5}
          animation="top"
        >
          {/* eslint-disable-next-line global-require */}
          <IconModal>
            <SvgModal source={require('../../icons/oval3x.png')}>
              <SvgUriModal source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-smartphone.svg' }} />
            </SvgModal>
          </IconModal>
          <MainWrapperDialog style={{ height: '45%', width: '80%' }}>
            <ScrollDialog>
              <ContentDialog>
                <WrapperText>
                  <TitleBlack>Ingresa el pin</TitleBlack>
                  <SubtGray>
                    Debes ingresar el pin que te acaba de llegar a tu celular para validar.
                  </SubtGray>
                </WrapperText>
                <InputCode
                  // eslint-disable-next-line no-return-assign
                  ref={ref => (this.inputCode = ref)}
                  length={4}
                  onChangeCode={this.onChangeCode}
                  onFullFill={this.onFullFill}
                  codeTextStyle={{
                    color: '#0068ff',
                  }}
                  codeContainerStyle={{
                    borderWidth: 1,
                    borderColor: '#ecf0f1',
                    borderRadius: 5,
                    marginLeft: 8,
                  }}
                  codeContainerCaretStyle={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: '#ecf0f1',
                    borderBottomWidth: 2,
                    borderBottomColor: '#0068ff',
                    marginLeft: 8,
                  }}
                  autoFocus
                />
                <TouchModal style={{ paddingTop: 15 }}>
                  <ButtonGradient press={() => this.init(navigate)} content="Continuar" />
                </TouchModal>
                <TouchModal>
                  <ButtonWhite content="Reenviar pin" press={() => this.OnHideModal()} />
                </TouchModal>
              </ContentDialog>
            </ScrollDialog>
          </MainWrapperDialog>
        </Dialog>
      </MainWrapper>
    );
  }
}

export default Registration;
