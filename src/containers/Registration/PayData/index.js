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

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      userid: '',
      datapaymethod: '',
      datacardnumber: '',
      dataexp: '',
      datacvv: '',
      loading: false,
      inputValueCheck: false,
      msgApi: '',
      errorApi: false,
      error: {},
      invalidphone: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
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
    // const { forgotPass } = this.props;

    if (datapaymethod) {
      const data = {
        user_payment_method: {
          user_id: userid,
          card_number: datacardnumber,
          expiration: dataexp,
          cvv: datacvv,
          active: true,
        },
      };
      console.log(data);
      // await forgotPass(data);
    }
    this.setState({ loading: true, msgApi: null });
  }

  validateForm() {
    const {
      dataphone,
    } = this.state;
    const errormsg = {};
    this.setState({ error: null });
    errormsg.name = '';
    errormsg.phone = '';
    errormsg.type = '';

    // validate input's
    if (dataphone.length < 10 || dataphone === '') {
      errormsg.phone = 'Teléfono incorrecto: minímo 10 caracteres';
      this.setState({ invalidphone: true });
    }
    this.setState({ error: errormsg });

    if (errormsg.phone === '') {
      this.setState({ invalidphone: false });
    }

    if (errormsg.phone === '' && errormsg.doc === '') {
      this.onRegPay();
    }
  }

  render() {
    const { user } = this.props;
    const { goBack } = this.props.navigation;
    const {
      loading,
      datamethod,
      datatarget,
      datadateexp,
      datacvv,
      inputValueCheck,
      msgApi,
      errorApi,
      error,
      invalidphone,
    } = this.state;

    // hide Toast
    if (errorApi) {
      setTimeout(() => this.setState({
        errorApi: false,
      }), 5000); // hide toast after 5s
    }

    if (datamethod) {
      if (datamethod.length >= 1) {
        if (inputValueCheck === false) {
          this.setState({ inputValueCheck: true });
        }
      } else if (inputValueCheck) {
        this.setState({ inputValueCheck: false });
      }
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
            // navigate('ResetPass', { email: dataemail });
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
              <Input
                title="Método"
                holder="Ingrese método de pago"
                onChangeText={(value) => this.setState({ datamethod: value })}
                value={datamethod}
                type="default"
              />
              <Input
                title="Número de tarjeta"
                holder="Ingrese número de tarjeta"
                type="numeric"
                maxLength={12}
                errorText={invalidphone}
                value={datatarget}
                onChangeText={(value) => this.setState({ datatarget: value })}
              />
              <Input
                title="Fecha de vencimiento"
                holder="Ingrese fecha de venc."
                onChangeText={(value) => this.setState({ datadateexp: value })}
                value={datadateexp}
                type="default"
              />
              <Input
                title="CVV"
                holder="Ingrese cvv"
                onChangeText={(value) => this.setState({ datacvv: value })}
                value={datacvv}
                type="numeric"
              />
            </WrapperInputs>
          </SectionRow>
        </WrapperSection>

        <WrapperError>
          { error.phone ? (
            <TextError>
              {error.phone}
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
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  // funtions
  registerPayment: params => dispatch(PaymentActions.postRegPaymentRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
