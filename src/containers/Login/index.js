/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import InputCode from 'react-native-input-code';
import { connect } from 'react-redux';

import Input from '../../components/GeneralInput';
import ButtonWhite from '../../components/ButtonWhite';
import ButtonGradient from '../../components/ButtonGradient';
import Dialog from '../../components/EmptyDialog';

import { login } from '../../redux/actions/user';

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

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      datausername: '',
      datapin: '',
      dataphone: '',
      modalPin: false,
    };
  }

  componentDidMount() {
  }

  onLoginPress() {
    // eslint-disable-next-line react/destructuring-assignment
    const { datausername, dataphone, datapin } = this.state;
    // eslint-disable-next-line no-shadow
    const { login } = this.props;
    login({ username: datausername, phone: dataphone, pin: datapin });
  }

  onPressPin() {
    this.setState({ modalPin: true });
  }

  onPressPersist() {
    this.setState({ datausername: 'brianJav' });
    this.onLoginPress();
  }

  onFullFill(code) {
    this.setState({ datapin: code });
    // function validar pin
  }

  onChangePhone(phone) {
    this.setState({ dataphone: phone });
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

  render() {
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    const { navigate } = this.props.navigation;
    const {
      modalPin, dataphone, datapin,
    } = this.state;
    const { user } = this.props;
    return (
      <MainWrapper>
        <SvgUri source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/logo3x.png' }} />
        <TextBlack>
                    Bienvenido al
          <TextBlue>
            {' '}
                        Futuro
          </TextBlue>
        </TextBlack>
        <TextGray>El mejor aliado para su operación</TextGray>
        <WrapperInputs>
          <Input title="Número de celular" holder="300000000" onChangeText={text => this.onChangePhone(text)} type="numeric" />
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
        <WrapperButtonsBottom>
          <WrapperButtonGradient>
            <ButtonGradient press={() => this.onPressPersist()} content="persist" />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>

        <WrapperInputs>
          <TextGray>
            inputPhone
            {dataphone}
          </TextGray>
          <TextGray>
            inputPin
            {datapin}
          </TextGray>
          <TextGray>
            Logged
            {user.isLogged.toString()}
          </TextGray>
          <TextBlue>
            Username ?:
            {user.info ? user.info.username : ''}
          </TextBlue>
          <TextBlue>
            phone ?:
            {user.info ? user.info.phone : ''}
          </TextBlue>
          <TextBlue>
            pin ?:
            {user.info ? user.info.pin : ''}
          </TextBlue>
        </WrapperInputs>
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
        <Dialog
          visible={modalPin}
          opacity={0.5}
          animation="top"
        >
          <IconModal>
            {/* eslint-disable-next-line global-require */}
            <SvgModal source={require('../../icons/oval3x.png')}>
              <SvgUriModal source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-smartphone.svg' }} />
            </SvgModal>
          </IconModal>
          <MainWrapperDialog style={{ height: 380, width: '80%' }}>
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
                  // eslint-disable-next-line react/jsx-no-bind
                  onFullFill={code => this.onFullFill(code)}
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

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  login: (userInfo = {}) => dispatch(login(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
