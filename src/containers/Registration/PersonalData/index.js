/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputCode from 'react-native-input-code';

import Input from '../../../components/GeneralInput';
import ButtonGradient from '../../../components/ButtonGradient';
import ButtonWhite from '../../../components/ButtonWhite';
import ArrowBack from '../../../components/ArrowBack';
import Dialog from '../../../components/EmptyDialog';

// action - reducers
import UserActions from '../../../redux/reducers/UserRedux';

import {
  MainWrapper,
  TextBlack,
  TextBlue,
  TextGray,
  SvgUri,
  WrapperInputs,
  WrapperButtonGradient,
  TextTerms,
  WrapperButtons,
  WrapperButtonsBottom,
  TextError,
  TextLoad,
  IconModal,
  SvgModal,
  SvgUriModal,
  TouchCloseModal,
  WrapperCloseX,
  TextModal,
  MainWrapperDialog,
  ScrollDialog,
  ContentDialog,
  WrapperText,
  TitleBlack,
  SubtGray,
  TouchModal,
  WrapperError,
} from '../style';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      dataphone: '', // '573142412004',
      dataemail: '', // 'hello@cargapp.co',
      loadingRegister: false,
      error: {},
      datapin: '',
      modalPin: false, // test
      loadingPin: false,
      loadingResendPin: false,
      pinErrorCheck: false,
      pinValueCheck: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const dtphone = navigation.getParam('phone', '');
    if (dtphone !== '') {
      this.setState({ dataphone: dtphone });
    }
  }

  onFullFill(code) {
    this.setState({ datapin: code, pinErrorCheck: true });
  }

  onPressPin() {
    this.onLoginPress();
    // this.setState({ modalPin: true });
  }

  onPressResendPin() {
    this.inputCode.reset();
    this.inputCode.focus();
    this.onResendPin();
  }

  async onLogin() {
    const { dataphone, dataemail } = this.state;
    const { loginUser } = this.props;
    const lengthphone = dataphone.length;
    const initlength = lengthphone - 6;
    const clave = dataphone.slice(initlength, lengthphone);
    // validate info
    if (dataphone != null && dataphone !== ''
      && dataemail != null && dataemail !== ''
    ) {
      const data = {
        user: {
          email: dataemail,
          password: clave,
        },
      };

      // console.log(data);
      await loginUser(data);
    }
  }

  async onRegisterPress() {
    const { dataphone, dataemail } = this.state;
    const { registerUser } = this.props;
    const lengthphone = dataphone.length;
    const initlength = lengthphone - 6;
    const clave = dataphone.slice(initlength, lengthphone);
    // validate info
    if (dataphone != null && dataphone !== ''
      && dataemail != null && dataemail !== ''
    // && datadocument != null && datadocument !== ''
    ) {
      const data = {
        user: {
          email: dataemail,
          password: clave,
          password_confirmation: clave,
          // identification: parseInt(datadocument, 10),
          phone_number: parseInt(dataphone, 10),
          role_id: 11,
        },
      };

      // console.log(data);
      await registerUser(data);
    }
    this.setState({ loadingRegister: true });
  }

  async onValidatePin() {
    const { dataphone, datapin } = this.state;
    const { validatePin } = this.props;

    if (datapin != null) {
      const fullPhone = dataphone;
      const data = {
        user: {
          phone_number: parseInt(fullPhone, 10),
          mobile_code: parseInt(datapin, 10),
        },
      };
      // alert(fullPhone);
      await validatePin(data);
    }
    this.setState({ loadingPin: true });
  }

  async onResendPin() {
    const { dataphone } = this.state;
    const { resendPin } = this.props;

    if (dataphone != null) {
      const fullPhone = dataphone;
      const data = {
        user: {
          phone_number: parseInt(fullPhone, 10),
        },
      };
      // console.log(data);
      await resendPin(data);
    }
    this.setState({ loadingResendPin: true });
  }

  validateForm() {
    const { dataemail } = this.state;
    const errormsg = {};
    errormsg.email = '';
    errormsg.doc = '';
    // validate info
    if (dataemail.length < 8 || dataemail === '') {
      errormsg.email = 'Incorrecto: valor inválido';
    }
    if (dataemail !== '' && !/\S+@\S+\.\S+/.test(dataemail)) {
      errormsg.email = 'Incorrecto: formato inválido ';
    }
    /* if (datadocument.length < 10 || datadocument === '') {
      errormsg.doc = 'Incorrecto: minímo 10 caracteres';
    }
    if (datadocument.length === 10 && !/^\d+$/.test(datadocument)) {
      errormsg.doc = 'Incorrecto: formato inválido';
    } */

    // console.log(errormsg);
    this.setState({ error: errormsg });

    if (errormsg.email === '' && errormsg.doc === '') {
      this.onRegisterPress();
    }
  }

  init() {
    this.onValidatePin();
  }

  OnHideModal() {
    this.setState({ modalPin: false });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { user } = this.props;
    const { navigate, goBack } = this.props.navigation;
    const {
      dataphone,
      dataemail,
      datapin,
      loadingRegister,
      error,
      modalPin,
      loadingPin,
      loadingResendPin,
      pinErrorCheck,
      pinValueCheck,
    } = this.state;

    // validate register User
    if (loadingRegister) {
      if (user.error && !user.fetching) {
        alert('error Api');
        this.setState({ loadingRegister: false });
      }
      if (user.status && !user.fetching) {
        // console.log(user);
        if (user.status.id) {
          this.setState({ loadingRegister: false });
          // validare Pin
          this.setState({ modalPin: true });
          // this.onLogin();
        } else if (loadingRegister && user.unprocess) {
          alert('Datos erroneos');
          this.setState({ loadingRegister: false });
        }
      }
    }

    // validate input pin
    if (datapin) {
      if (datapin.length === 4
        && pinValueCheck === false
      ) {
        this.setState({ pinValueCheck: true, pinErrorCheck: false });
      } else if (datapin.length < 4 && pinValueCheck === true) {
        this.setState({ pinValueCheck: false });
      }
    }

    // validate Pin
    if (loadingPin) {
      if (user.error && !user.fetching) {
        alert('error Api');
        this.setState({ loadingPin: false });
      }
      if (user.status && !user.fetching) {
        if (user.status.user != null) {
          // validate OK
          this.OnHideModal();
          setTimeout(() => {
            navigate('documents');
          }, 2000);
          this.setState({ loadingPin: false });
        } else if (loadingPin) {
          alert(`pin ${user.status.message}`);
          this.setState({ loadingPin: false });
        }
      }
    }

    if (loadingResendPin) {
      if (user.error && !user.fetching) {
        alert('error Api');
        this.setState({ loadingResendPin: false });
      }
      if (user.status && !user.fetching) {
        if (user.status.phone_number) {
          // send code ok
          alert('code resend');
          this.setState({ loadingResendPin: false });
        } else if (loadingResendPin) {
          alert(`pin ${user.status.message}`);
          this.setState({ loadingResendPin: false });
        }
      }
    }

    return (
      <MainWrapper>
        <WrapperButtons style={{ justifyContent: 'center', marginVertical: 0, marginBottom: '3%' }}>
          <ArrowBack url={() => goBack()} />
          <SvgUri source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-smartphone.svg' }} />
        </WrapperButtons>
        <TextBlack>
          Datos
          <TextBlue>
            {' '}
          personales
          </TextBlue>
        </TextBlack>
        <TextGray>
          Excelente! su camión es perfecto, ahora queremos conocer un poco más de usted
        </TextGray>
        <WrapperInputs>
          <Input
            title="Celular"
            holder="Ingrese número de documento"
            editable={false}
            value={dataphone}
          />
          {/* <Input
            title="Cedula"
            holder="Ingrese número de documento"
            type="numeric"
            maxLength={10}
            value={datadocument}
            onChangeText={value => this.setState({ datadocument: value })}
          />
          <TextError>
            {error.doc}
          </TextError> */}
          <Input
            title="Correo electrónico"
            placeholder="Correo electrónico"
            type="email-address"
            value={dataemail}
            onChangeText={value => this.setState({ dataemail: value })}
          />
        </WrapperInputs>
        <WrapperError>
          { error.email ? (
            <TextError>
              {error.email}
            </TextError>
          ) : null }
        </WrapperError>
        <WrapperButtonsBottom>
          <WrapperButtonGradient>
            {/* eslint-disable-next-line react/prop-types */}
            <ButtonGradient content="Registrarse" press={() => this.validateForm()} />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>
        <TextLoad>
          { loadingRegister ? (
            'loading...'
          ) : null }
        </TextLoad>
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
        <Dialog
          visible={modalPin}
          opacity={0.5}
          animation="top"
          onTouchOutside={() => this.OnHideModal()}
        >
          <IconModal>
            {/* eslint-disable-next-line global-require */}
            <SvgModal source={require('../../../icons/oval3x.png')}>
              <SvgUriModal source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-smartphone.svg' }} />
            </SvgModal>
          </IconModal>
          <TouchCloseModal
            onPress={() => this.setState({ modalPin: false })}
          >
            <WrapperCloseX>
              <TextModal>x</TextModal>
            </WrapperCloseX>
          </TouchCloseModal>
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
                  onChangeCode={code => this.onFullFill(code)}
                  onFullFill={null}
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
                  <WrapperError>
                    { pinErrorCheck ? (
                      <TextError>
                        Campo incompleto o erroneo
                      </TextError>
                    ) : null }
                  </WrapperError>
                  <ButtonGradient press={() => this.init()} content="Continuar" />
                </TouchModal>
                <TouchModal>
                  <ButtonWhite content="Reenviar pin" press={() => this.onPressResendPin()} />
                </TouchModal>
                <TextLoad>
                  { loadingPin || loadingResendPin ? (
                    'loading...'
                  ) : '' }
                </TextLoad>
              </ContentDialog>
            </ScrollDialog>
          </MainWrapperDialog>
        </Dialog>
      </MainWrapper>
    );
  }
}

// export default Registration;

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  registerUser: params => dispatch(UserActions.postRegisterRequest(params)),
  // registerRole: params => dispatch(UserActions.postRegisterRoleRequest(params)),
  loginUser: params => dispatch(UserActions.postLoginRequest(params)),
  validatePin: params => dispatch(UserActions.postValidateRequest(params)),
  resendPin: params => dispatch(UserActions.postResendRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
