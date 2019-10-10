/* eslint-disable arrow-parens */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/GeneralInput';
import ButtonGradient from '../../components/ButtonGradient';

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
} from '../Registration/style';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      dataphone: '',
      dataemail: '',
      datapass: '',
      loading: false,
      emailErrorCheck: false,
      passErrorCheck: false,
      inputValueCheck: false,
      onPressLogin: false,
      msgApi: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const dtphone = navigation.getParam('phone', '');
    if (dtphone !== '') {
      this.setState({ dataphone: dtphone });
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

  validateForm() {
    const {
      dataemail,
      datapass,
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
    }

    this.setState({ onPressLogin: true });
  }

  render() {
    const { user } = this.props;
    const { navigate } = this.props.navigation;
    const {
      dataphone,
      loading,
      dataemail,
      datapass,
      emailErrorCheck,
      passErrorCheck,
      inputValueCheck,
      onPressLogin,
      msgApi,
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

    // verify LoginUser
    if (loading) {
      if (user.error && !user.fetching) {
        alert('error Api');
        this.setState({ loading: false });
      }
      if (user.status && !user.fetching) {
        // console.log(user);
        if (user.session) {
          setTimeout(() => {
            this.setState({ loading: false });
            navigate('ScreenHome');
          }, 1500);
        } else if (loading && user.unprocess) {
          // unProccess
          this.setState({ msgApi: user.status.message, loading: false });
        }
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

        <WrapperSection>
          <SectionRow style={{ width: '100%' }}>
            <WrapperInputs>
              <Input
                title="Celular"
                holder="Ingrese número de documento"
                editable={false}
                value={dataphone}
              />
              <Input
                title="Correo electrónico"
                holder=""
                onChangeText={(value) => this.setState({ dataemail: value.toLowerCase() })}
                value={dataemail.toLowerCase()}
                type="email-address"
              />
              <Input
                title="Contraseña"
                holder=""
                isPassword
                onChangeText={(value) => this.setState({ datapass: value })}
                value={datapass}
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
          { msgApi ? (
            <TextError>
              {msgApi}
            </TextError>
          ) : null }
        </WrapperError>

        <WrapperButtonsBottom>
          <WrapperButtonGradient>
            <ButtonGradient press={() => this.validateForm()} content="Ingresar" disabled={!inputValueCheck} />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>

        <TextLoad>
          { loading ? (
            'loading...'
          ) : '' }
        </TextLoad>
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
