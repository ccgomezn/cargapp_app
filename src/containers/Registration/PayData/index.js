/* eslint-disable array-callback-return */
/* eslint-disable no-else-return */
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

// actions - reducers
import PaymentActions from '../../../redux/reducers/PaymentRedux';

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
import InputPicker from '../../../components/InputPicker';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      userid: '',
      datapaymethod: '0',
      datacardnumber: '',
      dataexp: '',
      datacvv: '',
      loading: false,
      inputValueCheck: false,
      msgApi: '',
      errorApi: false,
      error: {},
      invalidcardnumber: false,
      invalidpaymethod: false,
      invalidexp: false,
      invalidcvv: false,
    };
  }

  componentDidMount() {
    const { navigation, getPaymentMethod } = this.props;
    // get getPayment_methods
    getPaymentMethod();
    // get userid
    const dtuser = navigation.getParam('iduser', '');
    if (dtuser !== '') {
      this.setState({ userid: dtuser });
    }
  }

  async onRegPay() {
    const {
      userid,
      datapaymethod,
      datacardnumber,
      dataexp,
      datacvv,
    } = this.state;
    const { registerPayment } = this.props;

    if (datapaymethod) {
      const data = {
        user_payment_method: {
          user_id: userid,
          card_number: datacardnumber,
          expiration: dataexp,
          cvv: datacvv,
          active: true,
          payment_method_id: datapaymethod,
        },
      };
      console.log(data);
      await registerPayment(data);
    }
    this.setState({ loading: true, msgApi: null });
  }

  validateForm() {
    const {
      datacardnumber,
      dataexp,
      datacvv,
      datapaymethod,
    } = this.state;
    const errormsg = {};
    this.setState({ error: null });
    errormsg.card_number = '';
    errormsg.exp = '';
    errormsg.cvv = '';
    errormsg.paymethod = '';

    // validate input's
    if (datacardnumber.length < 8 || datacardnumber === '') {
      errormsg.card_number = 'Nº. tarjeta incorrecta: minímo 8 caracteres';
      this.setState({ invalidcardnumber: true });
    }
    if (datapaymethod === '0') {
      errormsg.paymethod = 'Método de pago obligatorio';
      this.setState({ invalidpaymethod: true });
    }
    if (dataexp.length < 3 || dataexp === '') {
      errormsg.exp = 'Fecha de experiencia obligatoria';
      this.setState({ invalidexp: true });
    }
    if (datacvv.length < 3 || datacvv === '') {
      errormsg.cvv = 'CVV incorrecto: minímo 3 caracteres';
      this.setState({ invalidcvv: true });
    }
    this.setState({ error: errormsg });

    if (errormsg.card_number === '') {
      this.setState({ invalidcardnumber: false });
    }
    if (errormsg.paymethod === '') {
      this.setState({ invalidpaymethod: false });
    }
    if (errormsg.exp === '') {
      this.setState({ invalidexp: false });
    }
    if (errormsg.cvv === '') {
      this.setState({ invalidcvv: false });
    }

    if (errormsg.card_number === '' && errormsg.paymethod === '' && errormsg.exp === '' && errormsg.cvv === '') {
      this.onRegPay();
    }
  }

  render() {
    const { payment } = this.props;
    const { navigate, goBack } = this.props.navigation;
    const {
      loading,
      datacardnumber,
      dataexp,
      datacvv,
      datapaymethod,
      inputValueCheck,
      msgApi,
      errorApi,
      error,
      invalidcardnumber,
      invalidpaymethod,
      invalidexp,
      invalidcvv,
    } = this.state;

    const itemsMethod = [];

    // hide Toast
    if (errorApi) {
      setTimeout(() => this.setState({
        errorApi: false,
      }), 5000); // hide toast after 5s
    }

    if (datapaymethod) {
      if (datapaymethod !== '0') {
        if (inputValueCheck === false) {
          this.setState({ inputValueCheck: true });
        }
      } else if (inputValueCheck) {
        this.setState({ inputValueCheck: false });
      }
    }

    // reset password
    if (loading) {
      if (payment.error && !payment.fetching) {
        this.setState({ loading: false, errorApi: true });
      }
      if (payment.status && !payment.fetching) {
        if (payment.status.id && !payment.unprocess) {
          setTimeout(() => {
            this.setState({ loading: false });
            navigate('ScreenHome');
          }, 1500);
        } else if (loading && payment.unprocess) {
          // unProccess
          const message = 'Información No válida';
          this.setState({ msgApi: message, loading: false });
        }
      }
    }

    if (payment.data && !payment.fetching) {
      payment.data.map((ele) => {
        itemsMethod.push({ textItem: ele.name, valueItem: ele.id });
      });
      return (
        <MainWrapper>
          <WrapperButtons style={{ justifyContent: 'center', marginTop: '0%', marginBottom: '2%' }}>
            <ArrowBack url={() => goBack()} />
            <SvgUri source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/logo3x.png' }} />
          </WrapperButtons>
          <TextBlack>
            Datos
            <TextBlue>
              {' '}
              Bancarios
            </TextBlue>
          </TextBlack>
          <TextGray>Bienvenido, necesitamos la siguiente información de método de pago.</TextGray>
          <WrapperSection style={{ marginTop: 10 }}>
            <SectionRow style={{ width: '100%' }}>
              <WrapperInputs>
                {/* <Input
                  title="Método"
                  holder="Ingrese método de pago"
                  onChangeText={(value) => this.setState({ datapaymethod: value })}
                  value={datapaymethod}
                  errorText={invalidpaymethod}
                  type="default"
                /> */}
                <InputPicker
                  title="Método de pago"
                  listdata={itemsMethod}
                  defaultSelect={datapaymethod}
                  editable
                  onChangeValue={(value) => this.setState({ datapaymethod: value })}
                  errorText={invalidpaymethod}
                />
                <Input
                  title="Número de tarjeta"
                  holder="Ingrese número de tarjeta"
                  type="numeric"
                  maxLength={12}
                  errorText={invalidcardnumber}
                  value={datacardnumber}
                  onChangeText={(value) => this.setState({ datacardnumber: value })}
                />
                <Input
                  title="Fecha de vencimiento"
                  holder="Ingrese fecha de venc."
                  onChangeText={(value) => this.setState({ dataexp: value })}
                  value={dataexp}
                  errorText={invalidexp}
                  type="default"
                />
                <Input
                  title="CVV"
                  holder="Ingrese cvv"
                  onChangeText={(value) => this.setState({ datacvv: value })}
                  value={datacvv}
                  errorText={invalidcvv}
                  type="numeric"
                />
              </WrapperInputs>
            </SectionRow>
          </WrapperSection>

          <WrapperError>
            { error.card_number ? (
              <TextError>
                {error.card_number}
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
              <ButtonGradient press={() => this.validateForm()} content="Continuar" disabled={!inputValueCheck} />
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
  const { payment } = state;
  return {
    payment,
  };
};

const mapDispatchToProps = dispatch => ({
  registerPayment: params => dispatch(PaymentActions.postRegPaymentRequest(params)),
  getPaymentMethod: params => dispatch(PaymentActions.getPaymentMethodRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
