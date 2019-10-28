/* eslint-disable no-else-return */
/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputCode from 'react-native-input-code';
import Toast from 'react-native-root-toast';
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
      datarol: 15,
      loadingRegister: false,
      error: {},
      datapin: '',
      modalPin: false,
      loadingPin: false,
      loadingResendPin: false,
      pinErrorCheck: false,
      pinValueCheck: false,
      loadingLogin: false,
      msgApi: '',
      pressState: true,
      pressStateTwo: false,
      invalidphone: false,
      invalidemail: false,
      invalidpass: false,
      inputValueCheck: false,
      errorApi: false,
      visibleError: false,
      codeCountrie: '57',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { countriesActive } = this.props;
    // get countries
    countriesActive();
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
    const { dataphone, dataemail, datapassword } = this.state;
    const { loginUser } = this.props;
    const clave = datapassword;
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
    this.setState({ loadingLogin: true });
  }

  async onRegisterPress() {
    const {
      dataphone, dataemail, datapassword, datarol, codeCountrie,
    } = this.state;
    const { registerUser } = this.props;
    // validate info
    if (dataphone != null && dataphone !== ''
      && dataemail != null && dataemail !== ''
      && datapassword != null && datapassword !== ''
    ) {
      const fullPhone = codeCountrie.concat(dataphone);
      const data = {
        user: {
          email: dataemail,
          password: datapassword,
          password_confirmation: datapassword,
          phone_number: parseInt(fullPhone, 10),
          role_id: datarol,
        },
      };

      // console.log(data);
      await registerUser(data);
      this.setState({ loadingRegister: true });
    } else {
      // campos incompletos
      this.setState({ loadingRegister: false });
    }
  }

  async onValidatePin() {
    const { dataphone, datapin, codeCountrie } = this.state;
    const { validatePin } = this.props;

    if (datapin != null) {
      const fullPhone = codeCountrie.concat(dataphone);
      const data = {
        user: {
          phone_number: parseInt(fullPhone, 10),
          mobile_code: datapin,
        },
      };
      // alert(fullPhone);
      await validatePin(data);
    }
    this.setState({ loadingPin: true });
  }

  async onResendPin() {
    const { dataphone, codeCountrie } = this.state;
    const { resendPin } = this.props;

    if (dataphone != null) {
      const fullPhone = codeCountrie.concat(dataphone);
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

  onChangePais(value) {
    this.setState({ codeCountrie: value });
  }

  validateForm() {
    const { dataemail, datapassword, dataphone } = this.state;
    const errormsg = {};
    this.setState({ error: null });
    errormsg.email = '';
    errormsg.doc = '';
    errormsg.pass = '';
    errormsg.phone = '';
    // validate info
    if (dataemail.length < 8 || dataemail === '') {
      errormsg.email = 'Correo incorrecto: valor inválido';
      this.setState({ invalidemail: true });
    }
    if (dataemail !== '' && !/\S+@\S+\.\S+/.test(dataemail)) {
      errormsg.email = 'Correo incorrecto: formato inválido';
      this.setState({ invalidemail: true });
    }
    if (datapassword.length < 6 || datapassword === '') {
      errormsg.pass = 'Contraseña incorrecta: minímo 6 caracteres';
      this.setState({ invalidpass: true });
    }
    if (dataphone.length < 10 || dataphone === '') {
      errormsg.phone = 'Teléfono incorrecto: minímo 10 caracteres';
      this.setState({ invalidphone: true });
    }

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

    if (errormsg.email === '' && errormsg.pass === '' && errormsg.phone === '') {
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
    const handlePressButton = () => {
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
    const { navigate, goBack } = this.props.navigation;
    const {
      dataphone,
      dataemail,
      datapassword,
      datapin,
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
      inputValueCheck,
      errorApi,
      visibleError,
    } = this.state;

    // hide Toast
    if (visibleError || errorApi) {
      setTimeout(() => this.setState({
        visibleError: false,
        errorApi: false,
      }), 5000); // hide toast after 5s
    }

    // validate form
    if (dataemail && datapassword) {
      if (dataemail.length >= 8
        && datapassword.length >= 6
        && dataphone.length >= 10) {
        if (inputValueCheck === false) {
          this.setState({ inputValueCheck: true });
        }
      } else if (inputValueCheck) {
        this.setState({ inputValueCheck: false });
      }
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
        } else if (loadingPin) {
          alert(`pin ${user.status.message}`);
          this.setState({ loadingPin: false });
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
          alert('code resend');
          this.setState({ loadingResendPin: false });
        } else if (loadingResendPin) {
          alert(`pin ${user.status.message}`);
          this.setState({ loadingResendPin: false });
        }
      }
    }

    // verify LoginUser
    if (loadingLogin) {
      if (user.error && !user.fetching) {
        this.setState({ loadingLogin: false, errorApi: true });
      }
      if (user.status && !user.fetching) {
        // console.log(user);
        if (user.session) {
          setTimeout(() => {
            this.setState({ loadingLogin: false });
            navigate('Documents', { userdata: user.info });
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
          <WrapperButtons style={{ justifyContent: 'center', marginTop: '0%', marginBottom: '3%' }}>
            <ArrowBack url={() => goBack()} />
            <SvgUri source={require('../../../Images/Logo3x.png')} />
          </WrapperButtons>
          <TextBlack>
            Registrate
            <TextBlue>
              {' '}
            gratis
            </TextBlue>
          </TextBlack>
          <TextGray>
            Este es el primer paso, para iniciar su registro necesitamos...
          </TextGray>
          <WrapperButtons>
            <WrapperButton
              onPress={handlePressButton}
              style={pressState ? containerPress : null}
            >
              {pressState && <Check source={require('../../../Images/Check.png')} />}
              <Svg source={pressState ? require('../../../Images/icon_truck_sel.svg') : require('../../../Images/icon_truck.svg')} />
              <ButtonText
                style={pressState ? TextPress : null}
              >
                Dueño de camión
              </ButtonText>
              <ButtonSubText
                style={pressState ? TextPress : null}
              >
                Trabaje y cuide su vehículo
              </ButtonSubText>
            </WrapperButton>
            <WrapperButton
              onPress={handlePressButtonTwo}
              style={pressStateTwo ? containerPress : null}
            >
              {pressStateTwo && <Check source={require('../../../Images/Check.png')} />}
              <Svg source={pressStateTwo ? require('../../../Images/icon_driver_sel.svg') : require('../../../Images/icon_driver.svg')} />
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
          </WrapperButtons>
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
              title="Correo electrónico"
              holder="Ingresa correo electrónico"
              type="email-address"
              errorText={invalidemail}
              value={dataemail.toLowerCase()}
              onChangeText={value => this.setState({ dataemail: value.toLowerCase() })}
            />
            <Input
              title="Contraseña"
              holder="Ingrese contraseña min.(6)"
              isPassword
              maxLength={10}
              value={datapassword}
              errorText={invalidpass}
              onChangeText={value => this.setState({ datapassword: value })}
            />
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
            {error.pass ? (
              <TextError>
                {error.pass}
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
              {/* eslint-disable-next-line react/prop-types */}
              <ButtonGradient content="Registrarse" press={() => this.validateForm()} disabled={!inputValueCheck} />
            </WrapperButtonGradient>
          </WrapperButtonsBottom>
          <TextLoad>
            { loadingRegister ? (
              <ActivityIndicator
                style={{ alignSelf: 'center', height: '100%' }}
                size="large"
                color="#0068ff"
              />
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
                      <ActivityIndicator
                        style={{ alignSelf: 'center', height: '100%' }}
                        size="small"
                        color="#0068ff"
                      />
                    ) : '' }
                  </TextLoad>
                </ContentDialog>
              </ScrollDialog>
            </MainWrapperDialog>
          </Dialog>
          <Toast
            visible={errorApi}
            position={-50}
            duration={Toast.durations.LONG}
            opacity={0.8}
            shadow
            animation
          >
            Error, no se pudo procesar la solicitud
          </Toast>
          <Toast
            visible={visibleError}
            position={-50}
            duration={Toast.durations.LONG}
            opacity={0.8}
            shadow
            animation
          >
            Los datos son incorrectos, intenta de nuevo
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
