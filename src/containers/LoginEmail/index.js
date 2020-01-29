/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable arrow-parens */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-tiny-toast';
import analytics from '@react-native-firebase/analytics';

import Input from '../../components/GeneralInput';
import ButtonGradient from '../../components/ButtonGradient';
import ButtonWhite from '../../components/ButtonWhite';
import ButtonLink from '../../components/ButtonLink';

// action - reducers
import UserActions from '../../redux/reducers/UserRedux';

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
  TextError,
  TextLoad,
  WrapperSection,
  SectionRow,
  WrapperError,
  WrapperButtonWhite,
} from '../Registration/style';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      dataemail: '',
      datapass: '',
      loading: false,
      emailErrorCheck: false,
      passErrorCheck: false,
      inputValueCheck: false,
      onPressLogin: false,
      msgApi: '',
      errorApi: false,
      loadingRoles: false,
      dataroles: [],
      loadinitial: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    analytics().setCurrentScreen('bienvenido_cargapp');
    this.isSession();
  }

  async onLogin() {
    const {
      dataemail,
      datapass,
    } = this.state;
    const { loginUser } = this.props;

    if (dataemail && datapass) {
      const data = {
        user: {
          email: dataemail,
          password: datapass,
        },
      };
      await loginUser(data);
    }
    this.setState({ loading: true });
  }

  async onRol() {
    const { getInfoUser } = this.props;
    await getInfoUser();
    this.setState({ loadingRoles: true });
  }

  isSession() {
    const { user } = this.props;
    const { navigate } = this.props.navigation;
    /* register step
    - 1:Pin no validate
    - 2:errorLogin
    - 3:No document
    - 4:No personalData
    - 5:OK sessión
    */
    if (user.step === 1 || user.step === 2) {
      navigate('Register', { stepUser: user.step });
    } else if (user.step === 3) {
      navigate('Documents');
    } else if (user.step === 4) {
      navigate('Personal');
    } else {
      if (user.isLogged) {
        this.setState({ loadinitial: true });
        this.onRol();
      }
    }
  }

  validateRol() {
    const { user } = this.props;
    const { dataroles } = this.state;
    const { navigate } = this.props.navigation;
    const { roles } = user;
    // eslint-disable-next-line array-callback-return
    roles.map((data) => {
      dataroles.push(data.name);
    });
    // validate type rol
    if (dataroles.includes('driver')) {
      navigate('DriverMenu');
    } else if (dataroles.includes('vehicle_munt') || dataroles.includes('conveyor')) {
      // accedo denegado
      this.setState({ msgApi: 'Acceso denegado', loadingRoles: false });
    } else if (dataroles.includes('load generator')) {
      navigate('GeneratorMenu');
    } else {
      // admin, user, etc
      navigate('GeneratorMenu');
    }
  }

  changeView(view) {
    const { navigate } = this.props.navigation;
    if (view === 'Register') {
      analytics().logEvent('boton_registrarse');
    } else {
      analytics().logEvent('boton_recuperar_contrasena');
    }
    this.setState({ dataemail: '', datapass: '' });
    navigate(view);
  }

  validateForm() {
    analytics().logEvent('boton_ingresar');
    const {
      dataemail,
      datapass,
    } = this.state;
    this.setState({ msgApi: null });

    // validate input email
    if (dataemail) {
      if (dataemail !== '' && /\S+@\S+\.\S+/.test(dataemail)) {
        this.setState({ emailErrorCheck: false });
      } else if ((dataemail === '' || !/\S+@\S+\.\S+/.test(dataemail))) {
        this.setState({ emailErrorCheck: true });
      }
    }
    if (datapass) {
      if (datapass !== '' && datapass.length >= 5) {
        this.setState({ passErrorCheck: false });
      } else {
        this.setState({ passErrorCheck: true });
      }
    }

    this.setState({ onPressLogin: true });
  }

  render() {
    const { user } = this.props;
    const {
      loading,
      dataemail,
      datapass,
      emailErrorCheck,
      passErrorCheck,
      inputValueCheck,
      onPressLogin,
      msgApi,
      errorApi,
      loadingRoles,
      loadinitial,
    } = this.state;

    if (dataemail && datapass) {
      if (dataemail.length >= 5 && datapass.length >= 5) {
        if (inputValueCheck === false) {
          this.setState({ inputValueCheck: true });
        }
      } else if (inputValueCheck) {
        this.setState({ inputValueCheck: false });
      }
    }

    if (onPressLogin) {
      if (!emailErrorCheck && !passErrorCheck) {
        this.onLogin();
      }
      this.setState({ onPressLogin: false });
    }

    // hide Toast
    if (errorApi) {
      setTimeout(() => this.setState({
        errorApi: false,
      }), 5000); // hide toast after 5s
    }

    // verify LoginUser
    if (loading) {
      if (user.error && !user.fetching) {
        this.setState({ loading: false, errorApi: true });
      }
      if (user.status && !user.fetching) {
        if (user.session) {
          setTimeout(() => {
            this.setState({ loading: false });
            this.onRol();
          }, 1500);
        } else if (loading && user.unprocess) {
          // unProccess
          this.setState({ msgApi: user.status.message, loading: false });
        }
      }
    }

    // get userRoles
    if (loadingRoles) {
      if (user.error && !user.fetching) {
        this.setState({ loadingRoles: false, errorApi: true });
      }
      if (user.status && !user.fetching) {
        // validate rol
        this.validateRol();
      } else if (loadingRoles && user.error) {
        // fail
        this.setState({ msgApi: 'No fue posible obtener los datos', loadingRoles: false });
      }
    }

    if (!loadinitial) {
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
          <WrapperSection style={{ marginTop: 10 }}>
            <SectionRow style={{ width: '100%' }}>
              <WrapperInputs>
                {/* <Input
                  title="Celular"
                  holder="Ingrese número de contacto"
                  onChangeText={(value) => this.setState({ dataphone: value })}
                  value={dataphone}
                  type="numeric"
                /> */}
                <Input
                  title="Correo electrónico"
                  holder="Ingrese Email"
                  onChangeText={(value) => this.setState({ dataemail: value.toLowerCase() })}
                  value={dataemail.toLowerCase()}
                  maxLength={30}
                  type="email-address"
                />
                <Input
                  title="Contraseña"
                  holder="Ingrese contraseña"
                  isPassword
                  onChangeText={(value) => this.setState({ datapass: value })}
                  value={datapass}
                  maxLength={22}
                  max
                  type="default"
                />
                <WrapperButtonWhite>
                  <ButtonLink
                    text="Recuperar contraseña"
                    press={() => this.changeView('ForgotPass')}
                  />
                </WrapperButtonWhite>
              </WrapperInputs>
            </SectionRow>
          </WrapperSection>

          <WrapperError>
            { emailErrorCheck ? (
              <TextError>
                Campo incompletos o erroneos
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
              <ButtonWhite
                border={{ borderWidth: 1, borderStyle: 'inset' }}
                content="Registrarse"
                press={() => this.changeView('Register')}
              />
            </WrapperButtonGradient>
            <WrapperButtonGradient>
              <ButtonGradient
                press={() => this.validateForm()}
                content="Ingresar"
                disabled={!inputValueCheck}
              />
            </WrapperButtonGradient>
          </WrapperButtonsBottom>
          <TextLoad>
            { loading || loadingRoles ? (
              <ActivityIndicator
                style={{ alignSelf: 'center', height: 'auto' }}
                size="large"
                color="#0068ff"
              />
            ) : null }
          </TextLoad>
          <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
          <Toast
            visible={errorApi}
            position={-50}
            duration={Toast.duration.LONG}
            shadow
            animation
          >
            Error, no se pudo procesar la solicitud
          </Toast>
        </MainWrapper>
      );
    } else {
      return (
        <ActivityIndicator
          style={{ alignSelf: 'center', height: '100%' }}
          size="large"
          color="#0068ff"
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  loginUser: params => dispatch(UserActions.postLoginRequest(params)),
  getInfoUser: params => dispatch(UserActions.getUserinfoRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
