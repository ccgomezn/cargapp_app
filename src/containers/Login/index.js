/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import InputCode from 'react-native-input-code';
import { connect } from 'react-redux';

import Input from '../../components/GeneralInput';
import ButtonWhite from '../../components/ButtonWhite';
import ButtonGradient from '../../components/ButtonGradient';
import Dialog from '../../components/EmptyDialog';

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
    };
  }

  componentDidMount() {
  }


  async onLoginPress() {
    // eslint-disable-next-line react/destructuring-assignment
    const { dataphone } = this.state;
    // eslint-disable-next-line no-shadow
    const { verifyPhone } = this.props;
    // login data
    // login({ phone: dataphone, pin: datapin });
    if (dataphone != null) {
      const data = {
        user: {
          phone_number: parseInt(dataphone, 10),
        },
      };

      await verifyPhone(data);
    }
    this.setState({ loading: true });
  }

  onFullFill(code) {
    this.setState({ datapin: code });
    // function validar pin
  }

  onPressPin() {
    this.setState({ modalPin: true });
  }

  OnHideModal() {
    this.setState({ modalPin: false });
  }

  // eslint-disable-next-line class-methods-use-this
  init(nav) {
    this.OnHideModal();
    this.onLoginPress(nav);
  }

  render() {
    const { user } = this.props;
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
    } = this.state;

    // verify phone
    if (loading) {
      // console.log(user);
      if (user.error && !user.fetching) {
        alert('error Api');
        this.setState({ loading: false });
      }
      if (user.status && !user.fetching) {
        if (user.status.phone_number) {
          navigate('ScreenHome');
          this.setState({ loading: false });
        } else if (loading) {
          navigate('Vehicle');
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
          <Input
            title="Número de celular"
            holder="300000000"
            maxLength={10}
            onChangeText={value => this.setState({ dataphone: value, phoneErrorCheck: true })}
            value={dataphone}
            type="numeric"
          />
        </WrapperInputs>
        <TextError>
          { phoneErrorCheck ? (
            'Campo incompleto o erroneo'
          ) : '' }
        </TextError>
        <WrapperButtonsBottom>
          <WrapperButtonGradient>
            <ButtonGradient press={() => this.onPressPin()} content="Ingresar" disabled={!phoneValueCheck} />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>

        <WrapperInputs>
          { loading ? (
            <TextError>
              loading...
            </TextError>
          ) : null }
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
                  <TextError>
                    { pinErrorCheck ? (
                      'Campo incompleto o erroneo'
                    ) : '' }
                  </TextError>
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
  login: params => dispatch(UserActions.onUserLogin(params)),
  verifyPhone: params => dispatch(UserActions.postVerifyRequest(params)),
  validatePin: params => dispatch(UserActions.postValidateRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
