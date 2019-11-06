/* eslint-disable arrow-parens */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import { ActivityIndicator } from 'react-native';

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
      loading: false,
      emailErrorCheck: false,
      inputValueCheck: false,
      onPressLogin: false,
      msgApi: '',
      errorApi: false,
    };
  }

  componentDidMount() {

  }

  async onforgotPass() {
    const {
      dataemail,
    } = this.state;
    const { forgotPass } = this.props;

    if (dataemail) {
      const data = {
        user: {
          email: dataemail,
          notify: 'phone',
        },
      };
      // console.log(data);
      await forgotPass(data);
    }
    this.setState({ loading: true, msgApi: null });
  }

  validateForm() {
    const {
      dataemail,
    } = this.state;
    this.setState({ emailErrorCheck: false });

    // validate input email
    if (dataemail) {
      if (dataemail !== '' && /\S+@\S+\.\S+/.test(dataemail)) {
        this.setState({ emailErrorCheck: false });
      } else if ((dataemail === '' || !/\S+@\S+\.\S+/.test(dataemail))) {
        this.setState({ emailErrorCheck: true });
      }
    }

    this.setState({ onPressLogin: true });
  }

  render() {
    const { user } = this.props;
    const { navigate, goBack } = this.props.navigation;
    const {
      loading,
      dataemail,
      emailErrorCheck,
      inputValueCheck,
      onPressLogin,
      msgApi,
      errorApi,
    } = this.state;

    // hide Toast
    if (errorApi) {
      setTimeout(() => this.setState({
        errorApi: false,
      }), 5000); // hide toast after 5s
    }

    if (dataemail) {
      if (dataemail.length >= 5) {
        if (inputValueCheck === false) {
          this.setState({ inputValueCheck: true });
        }
      } else if (inputValueCheck) {
        this.setState({ inputValueCheck: false });
      }
    }

    if (onPressLogin) {
      if (!emailErrorCheck) {
        this.onforgotPass();
      }
      this.setState({ onPressLogin: false });
    }

    // reset password
    if (loading) {
      if (user.error && !user.fetching) {
        this.setState({ loading: false, errorApi: true });
      }
      if (user.status && !user.fetching) {
        if (user.status.message && !user.unprocess) {
          setTimeout(() => {
            this.setState({ loading: false });
            navigate('ResetPass', { email: dataemail });
          }, 1500);
        } else if (loading && user.unprocess) {
          // unProccess
          // const message = user.status.message;
          const message = 'Información No válida';
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
        Recuperar
          <TextBlue>
            {' '}
            Contraseña
          </TextBlue>
        </TextBlack>
        <TextGray>Ingresa tu email, para cambiar tu contraseña</TextGray>
        <WrapperSection style={{ marginTop: 10 }}>
          <SectionRow style={{ width: '100%' }}>
            <WrapperInputs>
              <Input
                title="Correo electrónico"
                holder="Ingrese Email"
                onChangeText={(value) => this.setState({ dataemail: value.toLowerCase() })}
                value={dataemail.toLowerCase()}
                type="email-address"
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
          { msgApi ? (
            <TextError>
              {msgApi}
            </TextError>
          ) : null }
        </WrapperError>

        <WrapperButtonsBottom>
          <WrapperButtonGradient>
            <ButtonGradient press={() => this.validateForm()} content="Recuperar" disabled={!inputValueCheck} />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>

        <TextLoad>
          { loading ? (
            <ActivityIndicator
              style={{ alignSelf: 'center', height: '100%' }}
              size="large"
              color="#0068ff"
            />
          ) : '' }
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
  forgotPass: params => dispatch(UserActions.postPasswordRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
