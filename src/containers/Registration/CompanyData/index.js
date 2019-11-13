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
import InputPicker from '../../../components/InputPicker';

// actions - reducers
import LoadActions from '../../../redux/reducers/LoadRedux';
import CompanyActions from '../../../redux/reducers/CompanyRedux';

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
      dataname: '',
      dataphone: '',
      datatype: '0',
      loading: false,
      inputValueCheck: false,
      msgApi: '',
      errorApi: false,
      error: {},
      invalidphone: false,
      invalidname: false,
    };
  }

  componentDidMount() {
    const { getLoadsType } = this.props;
    const { navigation } = this.props;
    // get loadsType
    getLoadsType();
    // get userid
    const dtuser = navigation.getParam('userdata', '');
    if (dtuser !== '') {
      this.setState({ userid: dtuser.user.id });
    }
  }

  async onRegisterPress() {
    const {
      dataname,
      dataphone,
      datatype,
      userid,
    } = this.state;
    const { registerCompany } = this.props;

    if (dataname) {
      const data = {
        company: {
          name: dataname,
          phone: dataphone,
          load_type_id: datatype,
          user_id: userid,
          active: true,
        },
      };
      console.log(data);
      await registerCompany(data);
    }
    this.setState({ loading: true, msgApi: null });
  }

  validateForm() {
    const {
      dataname,
      dataphone,
      datatype,
    } = this.state;
    const errormsg = {};
    this.setState({ error: null });
    errormsg.name = '';
    errormsg.phone = '';
    errormsg.type = '';

    // validate input's
    if (dataname.length < 3 || dataname === '') {
      errormsg.name = 'Nombre incorrecto: minímo 5 caracteres';
      this.setState({ invalidname: true });
    }

    if (dataphone.length < 7 || dataphone === '') {
      errormsg.phone = 'Teléfono incorrecto: minímo 7 caracteres';
      this.setState({ invalidphone: true });
    }

    this.setState({ error: errormsg });

    if (errormsg.phone === '') {
      this.setState({ invalidphone: false });
    }

    if (errormsg.name === '') {
      this.setState({ invalidname: false });
    }

    if (errormsg.name === '' && errormsg.phone === '' && errormsg.type === '') {
      this.onRegisterPress();
    }
  }

  render() {
    const { companies, loadsType } = this.props;
    const { navigate, goBack } = this.props.navigation;
    const {
      loading,
      dataname,
      dataphone,
      datatype,
      inputValueCheck,
      msgApi,
      errorApi,
      error,
      invalidphone,
      invalidname,
      userid,
    } = this.state;

    const itemsType = [];

    // hide Toast
    if (errorApi) {
      setTimeout(() => this.setState({
        errorApi: false,
      }), 5000); // hide toast after 5s
    }

    if (dataname) {
      if (dataname.length >= 1) {
        if (inputValueCheck === false) {
          this.setState({ inputValueCheck: true });
        }
      } else if (inputValueCheck) {
        this.setState({ inputValueCheck: false });
      }
    }

    // registrar info company
    if (loading) {
      console.log(companies);
      if (companies.error && !companies.fetching) {
        this.setState({ loading: false, errorApi: true });
      }
      if (companies.status && !companies.fetching) {
        if (companies.status.active && !companies.unprocess) {
          setTimeout(() => {
            this.setState({ loading: false });
            navigate('RegPay', { iduser: userid });
          }, 1500);
        } else if (loading && companies.unprocess) {
          // unProccess
          // const message = user.status.message;
          const message = 'Información No válida';
          this.setState({ msgApi: message, loading: false });
        }
      }
    }

    if (loadsType.data && !loadsType.fetching) {
      loadsType.data.map((ele) => {
        itemsType.push({ textItem: ele.name, valueItem: ele.id });
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
              Empresariales
            </TextBlue>
          </TextBlack>
          <TextGray>Bienvenido, necesitamos la siguiente información empresarial.</TextGray>
          <WrapperSection style={{ marginTop: 10 }}>
            <SectionRow style={{ width: '100%' }}>
              <WrapperInputs>
                <Input
                  title="Nombre"
                  holder="Ingrese nombre de empresa"
                  onChangeText={(value) => this.setState({ dataname: value })}
                  value={dataname}
                  errorText={invalidname}
                  type="default"
                />
                <Input
                  title="Teléfono contacto"
                  holder="Ingrese número de contacto"
                  type="numeric"
                  maxLength={10}
                  value={dataphone}
                  errorText={invalidphone}
                  onChangeText={(value) => this.setState({ dataphone: value })}
                />
                <InputPicker
                  title="Tipo de carga"
                  listdata={itemsType}
                  defaultSelect={datatype}
                  onChangeValue={(value) => this.setState({ datatype: value })}
                  editable
                />
              </WrapperInputs>
            </SectionRow>
          </WrapperSection>

          <WrapperError>
            { error.name ? (
              <TextError>
                {error.name}
              </TextError>
            ) : null }
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
  const { companies, loadsType } = state;
  return {
    companies,
    loadsType,
  };
};

const mapDispatchToProps = dispatch => ({
  getLoadsType: params => dispatch(LoadActions.getLoadstypeRequest(params)),
  registerCompany: params => dispatch(CompanyActions.postRegCompaniesRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
