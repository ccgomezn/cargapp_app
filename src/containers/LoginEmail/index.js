/* eslint-disable arrow-parens */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-root-toast';

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
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.isSession();
    const dtphone = navigation.getParam('phone', '');
    // validate session
    if (dtphone !== '') {
      // this.setState({ dataphone: dtphone });
    }
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
    if (user.isLogged) {
      // falta validar rol de user
      navigate('DriverMenu');// ScreenHome--DriverMenu--GeneratorMenu
    }
  }

  validateForm() {
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
    const { navigate } = this.props.navigation;
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
      dataroles,
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
        const { roles } = user;
        // eslint-disable-next-line array-callback-return
        roles.map((data) => {
          dataroles.push(data.name);
        });
        console.log(dataroles);
        // validate type rol
        console.log(dataroles.includes('driver'));
        if (dataroles.includes('driver')) {
          navigate('GeneratorMenu');
        } else if (dataroles.includes('load generator')) {
          navigate('DriverMenu');
        }
      } else if (loadingRoles && user.error) {
        // fail
        this.setState({ msgApi: 'No fue posible obtener los datos', loadingRoles: false });
      }
    }

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
                maxLength={12}
                max
                type="default"
              />
              <WrapperButtonWhite>
                <ButtonLink
                  text="Recuperar contraseña"
                  press={() => navigate('ForgotPass')}
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
              press={() => navigate('Register')}
            />
          </WrapperButtonGradient>
          <WrapperButtonGradient>
            <ButtonGradient press={() => this.validateForm()} content="Ingresar" disabled={!inputValueCheck} />
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
          duration={Toast.durations.LONG}
          opacity={0.8}
          shadow
          animation
        >
          Error, no se pudo procesar la solicitud
        </Toast>
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
  loginUser: params => dispatch(UserActions.postLoginRequest(params)),
  getInfoUser: params => dispatch(UserActions.getUserinfoRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
