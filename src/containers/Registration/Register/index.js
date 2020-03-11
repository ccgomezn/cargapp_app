/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-unused-state */
/* eslint-disable radix */
/* eslint-disable no-else-return */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputCode from 'react-native-input-code';
import Toast from 'react-native-tiny-toast';
import analytics from '@react-native-firebase/analytics';
import { ActivityIndicator } from 'react-native';

import Input from '../../../components/GeneralInput';
import ButtonGradient from '../../../components/ButtonGradient';
import ButtonWhite from '../../../components/ButtonWhite';
import ArrowBack from '../../../components/ArrowBack';
import Dialog from '../../../components/EmptyDialog';
import InputPickercountries from '../../../components/InputPickerCountries';

// action - reducers
import UserActions from '../../../redux/reducers/UserRedux';
import CountrieActions from '../../../redux/reducers/CountrieRedux';

import {
  MainWrapper,
  TextBlack,
  TextBlue,
  TextGray,
  WrapperInputs,
  WrapperButtonGradient,
  TextTerms,
  WrapperButtons,
  WrapperButtonsBottom,
  TextError,
  TextLoad,
  MainWrapperDialog,
  ScrollDialog,
  ContentDialog,
  WrapperText,
  TitleBlack,
  SubtGray,
  TouchModal,
  WrapperError,
  WrapperButton,
  ButtonText,
  ButtonSubText,
  Check,
  Svg,
  TextPress,
  containerPress,
  WrapperSection,
  SectionRow,
  SvgUri,
} from '../style';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      dataphone: '',
      dataemail: '',
      datapassword: '',
      datapassconf: '',
      datadocument: '',
      loadingRegister: false,
      error: {},
      datapin: '',
      modalPin: false, // test quitar
      loadingPin: false,
      loadingResendPin: false,
      pinErrorCheck: false,
      pinValueCheck: false,
      loadingLogin: false, // test loading
      msgApi: '',
      datarol: 11,
      pressState: false,
      pressStateTwo: true,
      invalidphone: false,
      invalidemail: false,
      invalidpass: false,
      invaliddoc: false,
      inputValueCheck: false,
      errorApi: false,
      visibleError: false,
      codeCountrie: '57',
      msgError: '',
      invalidpassconf: false,
      pinInvalid: false,
      step: 0,
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('primer_paso_registro');
    const { navigation } = this.props;
    const { countriesActive } = this.props;
    // get countries
    countriesActive();
    // get step process
    const stepUser = navigation.getParam('stepUser', null);
    if (stepUser !== null) {
      // verify step
      if (stepUser === 1) {
        analytics().setCurrentScreen('confirmar_pin_registro');
        this.setState({ modalPin: true, step: stepUser });
      } else if (stepUser === 2) {
        // login
        this.setState({ step: stepUser, loadingLogin: true });
        this.onLogin();
      }
    }
  }

  onFullFill(code) {
    this.setState({ datapin: code, pinErrorCheck: true });
  }

  onPressResendPin() {
    this.inputCode.reset();
    this.inputCode.focus();
    this.onResendPin();
  }

  async onLogin() {
    const { dataemail, datadocument, step } = this.state;
    const { loginUser, user } = this.props;
    const { updateStep } = this.props;
    const clave = datadocument;
    // validate step
    if (step !== null || step !== 0) {
      const dataLog = {
        user: {
          email: user.acount.email,
          password: user.acount.password,
        },
      };
      await loginUser(dataLog);
      updateStep(3);
      this.setState({ loadingLogin: true });
    }
    if (dataemail != null && dataemail !== '') {
      const data = {
        user: {
          email: dataemail,
          password: clave,
        },
      };
      await loginUser(data);
      updateStep(3);
      this.setState({ loadingLogin: true });
    }
  }

  async onRegisterPress() {
    const {
      dataphone, dataemail, datapassword, datarol, codeCountrie, datadocument,
    } = this.state;
    const { registerUser, saveAcount } = this.props;
    // validate info
    if (dataphone != null && dataphone !== ''
      && dataemail != null && dataemail !== ''
    /* && datapassword != null && datapassword !== ''
      && datadocument != null && datadocument !== '' */
    ) {
      const fullPhone = codeCountrie.concat(dataphone);
      const data = {
        user: {
          email: dataemail,
          password: datadocument,
          password_confirmation: datadocument,
          phone_number: parseInt(fullPhone, 10),
          identification: parseInt(datadocument),
          role_id: datarol,
        },
      };

      const acount = {
        email: dataemail,
        password: datadocument,
        rol: datarol,
        phone: fullPhone,
      };

      await registerUser(data);
      await saveAcount(acount);
      this.setState({ loadingRegister: true });
    } else {
      // campos incompletos
      this.setState({ loadingRegister: false });
    }
  }

  async onValidatePin() {
    const {
      dataphone, datapin, codeCountrie, step,
    } = this.state;
    const { validatePin, user } = this.props;

    if (datapin != null) {
      let fullPhone = codeCountrie.concat(dataphone);
      if (step === 1) {
        fullPhone = user.fullPhone == null ? user.acount.phone : user.fullPhone;
      }
      const data = {
        user: {
          phone_number: parseInt(fullPhone, 10),
          mobile_code: datapin,
        },
      };
      await validatePin(data);
    }
    this.setState({ loadingPin: true });
  }

  async onResendPin() {
    const { dataphone, codeCountrie, step } = this.state;
    const { resendPin, user } = this.props;

    if (dataphone != null) {
      let fullPhone = codeCountrie.concat(dataphone);
      if (step === 1) {
        fullPhone = user.fullPhone == null ? user.acount.phone : user.fullPhone;
      }
      const data = {
        user: {
          phone_number: parseInt(fullPhone, 10),
        },
      };
      await resendPin(data);
    }
    this.setState({ loadingResendPin: true });
  }

  onChangePais(value) {
    this.setState({ codeCountrie: value });
  }

  validateForm() {
    const {
      dataemail, datapassword, dataphone, datadocument, datapassconf,
    } = this.state;
    const errormsg = {};
    this.setState({ error: null });
    errormsg.email = '';
    errormsg.doc = '';
    errormsg.pass = '';
    errormsg.phone = '';
    errormsg.valpass = '';
    // validate info
    if (dataemail.length < 8 || dataemail === '') {
      errormsg.email = 'Correo incorrecto: valor inválido';
      this.setState({ invalidemail: true });
    }
    if (dataemail !== '' && !/\S+@\S+\.\S+/.test(dataemail)) {
      errormsg.email = 'Correo incorrecto: formato inválido';
      this.setState({ invalidemail: true });
    }
    /* if (datapassword.length < 6 || datapassword === '') {
      errormsg.pass = 'Contraseña incorrecta: minímo 6 caracteres';
      this.setState({ invalidpass: true });
    } */
    if (dataphone.length < 10 || dataphone === '') {
      errormsg.phone = 'Teléfono incorrecto: minímo 10 caracteres';
      this.setState({ invalidphone: true });
    }
    if (datadocument.length < 6 || datadocument === '') {
      errormsg.doc = 'Cedula incorrecta: minímo 6 caracteres';
      this.setState({ invaliddoc: true });
    }
    /* if (datapassconf === '' || datapassconf.length < 5) {
      errormsg.pass = 'Contraseña incorrecta: minímo 6 caracteres';
      this.setState({ invalidpass: true });
    }
    if (datapassword) {
      if (datapassword !== datapassconf) {
        errormsg.valpass = 'Contraseñas erroneas';
        this.setState({ invalidpassconf: true });
      }
    } */

    this.setState({ error: errormsg });

    if (errormsg.email === '') {
      this.setState({ invalidemail: false });
    }
    if (errormsg.pass === '') {
      this.setState({ invalidpass: false });
    }
    if (errormsg.phone === '') {
      this.setState({ invalidphone: false });
    }
    if (errormsg.doc === '') {
      this.setState({ invaliddoc: false });
    }
    if (errormsg.valpass === '') {
      this.setState({ invalidpassconf: false });
    }

    if (errormsg.email === '' && errormsg.pass === '' && errormsg.phone === '' && errormsg.doc === '' && errormsg.valpass === '') {
      this.onRegisterPress();
    }
  }

  init() {
    analytics().logEvent('boton_confirmar_pin');
    const { datapin } = this.state;
    this.setState({ pinErrorCheck: false });
    if (datapin.length < 4 || datapin === '') {
      this.setState({ pinErrorCheck: true });
    } else {
      this.onValidatePin();
    }
  }

  OnHideModal() {
    this.setState({ modalPin: false });
  }

  goBack() {
    const { navigation } = this.props;
    analytics().logEvent('boton_atras_registro');
    navigation.goBack();
  }

  render() {
    const handlePressButton = () => {
      analytics().logEvent('boton_generador');
      const { pressState, pressStateTwo } = this.state;
      if (pressStateTwo) {
        this.setState({
          pressStateTwo: !pressStateTwo,
          pressState: !pressState,
          datarol: 15,
        });
      }
    };
    const handlePressButtonTwo = () => {
      analytics().logEvent('boton_conductor');
      const { pressState, pressStateTwo } = this.state;
      if (pressState) {
        this.setState({
          pressState: !pressState,
          pressStateTwo: !pressStateTwo,
          datarol: 11,
        });
      }
    };
    // eslint-disable-next-line react/prop-types
    const { user, countries } = this.props;
    const { navigate } = this.props.navigation;
    const {
      dataphone,
      dataemail,
      datapassword,
      datapassconf,
      datapin,
      datadocument,
      loadingRegister,
      error,
      modalPin,
      loadingPin,
      loadingResendPin,
      pinErrorCheck,
      pinValueCheck,
      loadingLogin,
      msgApi,
      pressState,
      pressStateTwo,
      invalidphone,
      invalidemail,
      invalidpass,
      invaliddoc,
      inputValueCheck,
      errorApi,
      visibleError,
      msgError,
      datarol,
      invalidpassconf,
      pinInvalid,
    } = this.state;

    // hide Toast
    if (visibleError || errorApi || msgError) {
      setTimeout(() => this.setState({
        visibleError: false,
        errorApi: false,
        msgError: '',
      }), 6000); // hide toast after 5s
    }

    // validate form
    if (dataphone.length >= 10) {
      if (inputValueCheck === false) {
        this.setState({ inputValueCheck: true });
      }
    } else if (inputValueCheck) {
      this.setState({ inputValueCheck: false });
    }

    // validate register User
    if (loadingRegister) {
      if (user.error && !user.fetching) {
        this.setState({ loadingRegister: false, errorApi: true });
      }
      if (user.status && !user.fetching) {
        // console.log(user);
        if (user.status.id) {
          this.setState({ loadingRegister: false });
          // validare Pin
          this.setState({ modalPin: true });
        } else if (user.status.message === 'error twillio') {
          // data incorrect
          this.setState({ loadingRegister: false, modalPin: true, msgError: 'Error al enviar código' });
        } else if (loadingRegister && user.unprocess) {
          // data incorrect
          this.setState({ loadingRegister: false, visibleError: true });
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
        this.setState({ loadingPin: false, errorApi: true });
      }
      if (user.status && !user.fetching) {
        if (user.status.user != null) {
          // validate OK
          this.OnHideModal();
          this.onLogin();
          this.setState({ loadingPin: false });
        } else if (loadingPin && user.unprocess) {
          this.setState({
            loadingPin: false,
            msgError: 'El Pin no es válido',
            pinInvalid: true,
          });
        }
      }
    }

    // validate resendPin
    if (loadingResendPin) {
      if (user.error && !user.fetching) {
        this.setState({ loadingResendPin: false, errorApi: true });
      }
      if (user.status && !user.fetching) {
        if (user.status.phone_number) {
          // send code ok
          this.setState({ loadingResendPin: false, msgError: 'Pin enviado' });
        } else if (loadingResendPin) {
          this.setState({
            loadingResendPin: false,
            msgError: `Pin ${user.status.message}`,
          });
        }
      }
    }

    // verify LoginUser
    if (loadingLogin) {
      if (user.error && !user.fetching) {
        this.setState({ loadingLogin: false, errorApi: true });
      }
      if (user.status && !user.fetching) {
        if (user.session) {
          setTimeout(() => {
            this.setState({ loadingLogin: false });
            if (datarol === 11) {
              navigate('Documents');
            } else {
              // navigate('RegCompany', { userdata: user.info });
              navigate('Personal', { idrol: datarol });
            }
          }, 1500);
        } else if (loadingLogin && user.unprocess) {
          // unProccess
          this.setState({ msgApi: user.status.message, loadingLogin: false });
        }
      }
    }

    if (countries.data) {
      return (
        <MainWrapper>
          <WrapperButtons style={{ justifyContent: 'center', marginTop: '0%', marginBottom: '2%' }}>
            <ArrowBack url={() => this.goBack()} />
            <SvgUri source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/logo3x.png' }} />
          </WrapperButtons>
          <TextBlack style={{ textAlign: 'center' }}>
            Registrate
            <TextBlue>
              {' '}
            gratis
            </TextBlue>
          </TextBlack>
          <TextGray>
            Esto solo debes hacerlo una vez y tomará un par de minutos.
            {'\n'}
          </TextGray>
          {/* <WrapperButtons>
            <WrapperButton
              onPress={handlePressButtonTwo}
              style={pressStateTwo ? containerPress : null}
            >
              {pressStateTwo && <Check source={require('../../../Images/Check.png')} />}
              <Svg source={pressStateTwo ? { uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon_truck_sel.svg' } : { uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon_truck.svg' }} />
              <ButtonText
                style={pressStateTwo ? TextPress : null}
              >
                Conductor
              </ButtonText>
              <ButtonSubText
                style={pressStateTwo ? TextPress : null}
              >
                Más trabajo más ingresos
              </ButtonSubText>
            </WrapperButton>
            <WrapperButton
              // onPress={handlePressButton}
              style={pressState ? containerPress : null}
            >
              {pressState && <Check source={require('../../../Images/Check.png')} />}
              <Svg source={pressState ? { uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon_driver_sel.svg' } : { uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon_driver.svg' }} />
              <ButtonText
                style={pressState ? TextPress : null}
              >
                Generador de carga
              </ButtonText>
              <ButtonSubText
                style={pressState ? TextPress : null}
              >
                Maneje y administre su carga.
              </ButtonSubText>
            </WrapperButton>
          </WrapperButtons> */}
          <WrapperInputs>
            <WrapperSection>
              <SectionRow style={{ width: '22%' }}>
                <InputPickercountries
                  title="Pais"
                  editable
                  defaultSelect="CO"
                  defaultCode="57"
                  listdata={countries.data ? countries : null}
                  onChange={value => this.onChangePais(value)}
                />
              </SectionRow>
              <SectionRow style={{ width: '78%' }}>
                <Input
                  title="Celular"
                  holder="Ingrese número de contacto"
                  type="numeric"
                  maxLength={10}
                  value={dataphone}
                  errorText={invalidphone}
                  onChangeText={value => this.setState({ dataphone: value })}
                />
              </SectionRow>
            </WrapperSection>
            <Input
              title="Número de cédula"
              holder="Ingrese número de documento"
              type="numeric"
              maxLength={12}
              value={datadocument}
              errorText={invaliddoc}
              onChangeText={value => this.setState({ datadocument: value })}
            />
            <Input
              title="Correo electrónico"
              holder="Ingresa correo electrónico"
              type="email-address"
              errorText={invalidemail}
              value={dataemail.toLowerCase()}
              onChangeText={value => this.setState({ dataemail: value.toLowerCase() })}
            />
            {/* <Input
              title="Contraseña"
              holder="Ingrese contraseña min.(6)"
              isPassword
              maxLength={20}
              value={datapassword}
              errorText={invalidpass}
              onChangeText={value => this.setState({ datapassword: value })}
            />
            <Input
              title="Confirmar contraseña"
              holder="Ingrese contraseña"
              onChangeText={value => this.setState({ datapassconf: value })}
              value={datapassconf}
              maxLength={20}
              isPassword
              errorText={invalidpassconf}
            /> */}
          </WrapperInputs>
          <WrapperError>
            { error.phone ? (
              <TextError>
                {error.phone}
              </TextError>
            ) : null }
            { error.email ? (
              <TextError>
                {error.email}
              </TextError>
            ) : null }
            { error.doc ? (
              <TextError>
                {error.doc}
              </TextError>
            ) : null }
            { error.pass ? (
              <TextError>
                {error.pass}
              </TextError>
            ) : null }
            { error.valpass ? (
              <TextError>
                {error.valpass}
              </TextError>
            ) : null }
            { msgApi ? (
              <TextError>
                {msgApi}
              </TextError>
            ) : null }
          </WrapperError>
          <WrapperButtonsBottom>
            <WrapperButtonGradient>
              <ButtonGradient
                content="Registrarse"
                press={() => this.validateForm()}
                disabled={!inputValueCheck}
              />
            </WrapperButtonGradient>
          </WrapperButtonsBottom>
          <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
          <Dialog
            visible={modalPin}
            opacity={0.3}
            animation="top"
            styleWrapper={{ width: '85%' }}
          >
            <MainWrapperDialog>
              <ScrollDialog>
                <ContentDialog>
                  <WrapperText>
                    <TitleBlack>Ingresa el código</TitleBlack>
                    <SubtGray>
                      Ingresa el código de verificación que llegó a tu celular por mensaje de texto
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
                  <WrapperError style={{ marginVertical: 12 }}>
                    { pinErrorCheck ? (
                      <TextError>
                        Campo incompleto o erroneo
                      </TextError>
                    ) : null }
                    { pinInvalid ? (
                      <TextError>
                        PIN incorrecto
                      </TextError>
                    ) : null }
                  </WrapperError>
                  <TouchModal>
                    <ButtonGradient
                      press={() => this.init()}
                      content="Continuar"
                    />
                  </TouchModal>
                  <TouchModal>
                    <ButtonWhite
                      content="Solicitar nuevo código"
                      press={() => this.onPressResendPin()}
                    />
                  </TouchModal>
                  <TextLoad>
                    { loadingPin || loadingResendPin ? (
                      <ActivityIndicator
                        style={{ alignSelf: 'center', height: 'auto' }}
                        size="large"
                        color="#0068ff"
                      />
                    ) : null }
                  </TextLoad>
                </ContentDialog>
              </ScrollDialog>
              <Toast
                visible={msgError !== ''}
                position={80}
                duration={Toast.duration.LONG}
                shadow
                animation
              >
                {msgError}
              </Toast>
            </MainWrapperDialog>
          </Dialog>
          <Toast
            visible={errorApi}
            position={-40}
            duration={Toast.duration.LONG}
            shadow
            animation
          >
            Error, no se pudo procesar la solicitud
          </Toast>
          <Toast
            visible={visibleError}
            position={-40}
            duration={Toast.duration.LONG}
            shadow
            animation
          >
            Los datos son erroneos y/o ya están registrados.
          </Toast>
          <Toast
            visible={loadingLogin || loadingRegister}
            position={0}
            loading
            shadow
            animation
          >
            Cargando
          </Toast>
        </MainWrapper>
      );
    } else {
      return (
        <ActivityIndicator
          style={{ alignSelf: 'center', height: '100%' }}
          size="large"
          color="#0000ff"
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { user, countries } = state;
  return {
    user,
    countries,
  };
};

const mapDispatchToProps = dispatch => ({
  registerUser: params => dispatch(UserActions.postRegisterRequest(params)),
  loginUser: params => dispatch(UserActions.postLoginRequest(params)),
  validatePin: params => dispatch(UserActions.postValidateRequest(params)),
  resendPin: params => dispatch(UserActions.postResendRequest(params)),
  countriesActive: params => dispatch(CountrieActions.postCountriesRequest(params)),
  saveAcount: params => dispatch(UserActions.saveAcountSuccess(params)),
  updateStep: params => dispatch(UserActions.updateStep(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
