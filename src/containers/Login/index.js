/* eslint-disable no-else-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import InputCode from 'react-native-input-code';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import Input from '../../components/GeneralInput';
import ButtonWhite from '../../components/ButtonWhite';
import ButtonGradient from '../../components/ButtonGradient';
import Dialog from '../../components/EmptyDialog';
import InputPickercountries from '../../components/InputPickerCountries';

// action - reducers
import UserActions from '../../redux/reducers/UserRedux';
import CountrieActions from '../../redux/reducers/CountrieRedux';

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
  TextError,
  TextLoad,
  WrapperSection,
  SectionRow,
  TouchCloseModal,
  WrapperCloseX,
  TextModal,
  WrapperError,
} from '../Registration/style';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      datapin: '',
      dataphone: '',
      modalPin: false,
      phoneValueCheck: false,
      phoneErrorCheck: false,
      loading: false,
      pinValueCheck: false,
      pinErrorCheck: false,
      loadingPin: false,
      loadingResendPin: false,
      codeCountrie: '57',
    };
  }

  componentDidMount() {
    const { countriesActive } = this.props;
    // validate session
    this.isSession();
    // get countries
    countriesActive();
  }

  async onLoginPress() {
    const { dataphone, codeCountrie } = this.state;
    const { verifyPhone } = this.props;
    if (dataphone != null) {
      const fullPhone = codeCountrie.concat(dataphone);
      const data = {
        user: {
          phone_number: parseInt(fullPhone, 10),
        },
      };

      await verifyPhone(data);
    }
    this.setState({ loading: true });
  }

  async onValidatePin() {
    const { dataphone, datapin, codeCountrie } = this.state;
    const { validatePin } = this.props;

    if (datapin != null) {
      const fullPhone = codeCountrie.concat(dataphone);
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

  onChangePais(value) {
    this.setState({ codeCountrie: value });
  }

  isSession() {
    const { user } = this.props;
    const { navigate } = this.props.navigation;
    // console.log(`is Session:${user.session}`);
    if (user.isLogged) {
      navigate('ScreenHome');
    }
  }

  OnHideModal() {
    this.setState({ modalPin: false });
  }

  init() {
    this.onValidatePin();
  }

  render() {
    const { user, countries } = this.props;
    const { navigate } = this.props.navigation;
    const {
      modalPin,
      dataphone,
      datapin,
      phoneValueCheck,
      phoneErrorCheck,
      loading,
      pinValueCheck,
      pinErrorCheck,
      loadingPin,
      loadingResendPin,
      codeCountrie,
    } = this.state;

    // verify phone
    if (loading) {
      if (user.error && !user.fetching) {
        alert('error Api');
        this.setState({ loading: false });
      }
      if (user.status && !user.fetching) {
        if (user.status.phone_number) {
          // navigate('ScreenHome');
          this.setState({ modalPin: true });
          this.setState({ loading: false });
        } else if (loading) {
          const fullPhone = codeCountrie.concat(dataphone);
          navigate('Personal', { phone: fullPhone });
          this.setState({ loading: false });
        }
      }
    }

    // validate input phone
    if (dataphone) {
      if (
        dataphone.length === 10
        && phoneValueCheck === false
        && /^\d+$/.test(dataphone)
      ) {
        this.setState({ phoneValueCheck: true, phoneErrorCheck: false });
      } else if (dataphone.length < 10 && phoneValueCheck === true) {
        this.setState({ phoneValueCheck: false });
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
          const fullPhone = codeCountrie + dataphone;
          // validate OK
          this.OnHideModal();
          setTimeout(() => {
            navigate('LoginEmail', { phone: fullPhone });
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

    if (countries.data) {
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
                title="Número de celular"
                holder="300000000"
                maxLength={10}
                onChangeText={value => this.setState({ dataphone: value, phoneErrorCheck: true })}
                value={dataphone}
                type="numeric"
              />
            </SectionRow>
          </WrapperSection>

          <WrapperError>
            { phoneErrorCheck ? (
              <TextError>
                Campo incompleto o erroneo
              </TextError>
            ) : null }
          </WrapperError>
          <WrapperButtonsBottom>
            <WrapperButtonGradient>
              <ButtonGradient press={() => this.onPressPin()} content="Ingresar" disabled={!phoneValueCheck} />
            </WrapperButtonGradient>
          </WrapperButtonsBottom>

          <WrapperInputs>
            { loading ? (
              <TextLoad>
                loading...
              </TextLoad>
            ) : null }
          </WrapperInputs>
          <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
          <Dialog
            visible={modalPin}
            opacity={0.5}
            animation="top"
            onTouchOutside={() => this.OnHideModal()}
          >
            <IconModal>
              {/* eslint-disable-next-line global-require */}
              <SvgModal source={require('../../icons/oval3x.png')}>
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
  verifyPhone: params => dispatch(UserActions.postVerifyRequest(params)),
  validatePin: params => dispatch(UserActions.postValidateRequest(params)),
  resendPin: params => dispatch(UserActions.postResendRequest(params)),
  countriesActive: params => dispatch(CountrieActions.postCountriesRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
