/* eslint-disable arrow-parens */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-root-toast';
import PopUpDialog from '../../../components/PopUpDialog';

import Input from '../../../components/GeneralInput';
import ButtonGradient from '../../../components/ButtonGradient';
import ArrowBack from '../../../components/ArrowBack';

// action - reducers
import UserActions from '../../../redux/reducers/UserRedux';

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
  WrapperButtons,
} from '../style';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      dataemail: '',
      datapin: '',
      datapass: '',
      datapassconf: '',
      loading: false,
      emailErrorCheck: false,
      passErrorCheck: false,
      pinErrorCheck: false,
      inputValueCheck: false,
      onPressLogin: false,
      msgApi: '',
      dataUpdate: false,
      errorApi: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const dtemail = navigation.getParam('email', '');
    if (dtemail !== '') {
      this.setState({ dataemail: dtemail });
    }
    this.setState({ dataemail: 'bje@cargapp.co' });
  }

  async onNewPass() {
    const {
      dataemail,
      datapass,
      datapassconf,
      datapin,
    } = this.state;
    const { resetPass } = this.props;

    if (dataemail && datapin && datapass && datapassconf) {
      const data = {
        user: {
          email: dataemail,
          pin: datapin,
          new_password: datapass,
          new_password_confirmation: datapassconf,
        },
      };
      // console.log(data);
      await resetPass(data);
    }
    this.setState({ loading: true, msgApi: null });
  }

  validateForm() {
    const {
      dataemail,
      datapass,
      datapassconf,
      datapin,
    } = this.state;

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
      if (datapass === datapassconf) {
        this.setState({ passErrorCheck: false });
      } else {
        this.setState({ passErrorCheck: true });
      }
    }

    if (datapin !== '' && datapin.length >= 4) {
      this.setState({ pinErrorCheck: false });
    } else {
      this.setState({ pinErrorCheck: true });
    }

    this.setState({ onPressLogin: true });
  }

  redirectHome() {
    const { navigate } = this.props.navigation;
    this.setState({ dataUpdate: false });
    setTimeout(() => {
      navigate('LoginEmail');
    }, 800);
  }

  render() {
    const { user } = this.props;
    const { goBack } = this.props.navigation;
    const {
      loading,
      dataemail,
      datapin,
      datapass,
      datapassconf,
      emailErrorCheck,
      passErrorCheck,
      inputValueCheck,
      pinErrorCheck,
      onPressLogin,
      msgApi,
      dataUpdate,
      errorApi,
    } = this.state;

    // hide Toast
    if (errorApi) {
      setTimeout(() => this.setState({
        errorApi: false,
      }), 5000); // hide toast after 5s
    }

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
      if (!emailErrorCheck && !passErrorCheck && !pinErrorCheck) {
        this.onNewPass();
      }
      this.setState({ onPressLogin: false });
    }

    // verify LoginUser
    if (loading) {
      if (user.error && !user.fetching) {
        this.setState({ loading: false, errorApi: true });
      }
      if (user.status && !user.fetching) {
        // console.log(user);
        if (user.status.message) {
          this.setState({ loading: false, dataUpdate: true });
        } else if (loading && user.unprocess) {
          // unProccess
          // const message = user.status.message;
          const message = 'Información erronea ó inválida';
          this.setState({ msgApi: message, loading: false });
        }
      }
    }

    return (
      <MainWrapper>
        <WrapperButtons style={{ justifyContent: 'center', marginTop: '0%', marginBottom: '2%' }}>
          <ArrowBack url={() => goBack()} />
          <SvgUri source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/logo3x.png' }} />
        </WrapperButtons>
        <TextBlack>
          Nueva
          <TextBlue>
            {' '}
            Contraseña
          </TextBlue>
        </TextBlack>
        <TextGray>Ingresa una nueva contraseña, para actualizar tu perfil.</TextGray>
        <WrapperSection style={{ marginTop: 10 }}>
          <SectionRow style={{ width: '100%' }}>
            <WrapperInputs>
              <Input
                title="Correo electrónico"
                holder="Ingrese Email"
                editable={false}
                onChangeText={(value) => this.setState({ dataemail: value.toLowerCase() })}
                value={dataemail.toLowerCase()}
                type="email-address"
              />
              <Input
                title="Pin"
                holder="Ingrese pin"
                maxLength={6}
                onChangeText={(value) => this.setState({ datapin: value })}
                value={datapin}
                errorText={pinErrorCheck}
                type="numeric"
              />
              <Input
                title="Nueva contraseña"
                holder="Ingrese contraseña"
                onChangeText={(value) => this.setState({ datapass: value })}
                value={datapass}
                isPassword
                type="default"
              />
              <Input
                title="Confirmar contraseña"
                holder="Ingrese contraseña"
                onChangeText={(value) => this.setState({ datapassconf: value })}
                value={datapassconf}
                isPassword
                errorText={passErrorCheck}
                type="default"
              />
            </WrapperInputs>
          </SectionRow>
        </WrapperSection>

        <WrapperError>
          { emailErrorCheck ? (
            <TextError>
              Campo incompletos o erroneos
            </TextError>
          ) : null }
          { passErrorCheck ? (
            <TextError>
              Contraseñas incorrectas
            </TextError>
          ) : null }
          { pinErrorCheck ? (
            <TextError>
              Pin invalido
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
            <ButtonGradient press={() => this.validateForm()} content="Cambiar" disabled={!inputValueCheck} />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>

        <TextLoad>
          { loading ? (
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
        <PopUpDialog
          visible={dataUpdate}
          onTouchOutside={null}
          textBlack="Datos actualizados"
          textGray="La contraseña fue actualizada con éxito"
          textButton="Ir al login"
          pressButton={() => this.redirectHome()}
        />
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
  resetPass: params => dispatch(UserActions.postResetPassRequest(params)),
  // forgotPass: params => dispatch(UserActions.postPasswordRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
