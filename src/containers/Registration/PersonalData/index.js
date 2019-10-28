/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/GeneralInput';
import ButtonGradient from '../../../components/ButtonGradient';
import ButtonWhite from '../../../components/ButtonWhite';
import ArrowBack from '../../../components/ArrowBack';

// action - reducers
import UserActions from '../../../redux/reducers/UserRedux';

import {
  MainWrapper,
  TextBlack,
  TextBlue,
  TextGray,
  WrapperInputs,
  WrapperButtonGradient,
  TextTerms,
  WrapperButtons,
  WrapperButtonsBottom,
  TextError,
  TextLoad,
  WrapperError,
  SvgUri,
} from '../style';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      dataname: '',
      datadocument: '',
      datalastname: '',
      loadingUpdate: false,
      error: {},
      msgApi: '',
    };
  }

  componentDidMount() {
    // const { navigation } = this.props;
    /* const dtid = navigation.getParam('id', '');
    if (dtphone !== '') {
      this.setState({ dataphone: dtphone });
    } */
  }

  async onUpdatePress() {
    const {
      dataname, datalastname, datadocument,
    } = this.state;
    // const { registerUser } = this.props;
    // validate data
    if (datadocument !== '' || dataname !== '' || datalastname !== '') {
      const data = {};
      const profile = {};
      if (datadocument !== '') {
        profile.identification = parseInt(datadocument, 10);
      }
      if (dataname !== '') {
        profile.name = dataname;
      }
      if (datalastname !== '') {
        profile.lastename = datalastname;
      }
      // data
      data.profile = profile;
      // console.log(data);
      // await registerUser(data);
      this.setState({ loadingUpdate: true });
    } else {
      alert('No hay campos para actualizar');
    }
  }

  validateForm() {
    const { dataname, datalastname, datadocument } = this.state;
    const errormsg = {};
    errormsg.name = '';
    errormsg.doc = '';
    // validate info
    if (datadocument.length < 10 && datadocument.length >= 1) {
      errormsg.doc = 'Incorrecto: minímo 10 caracteres';
    }
    if ((dataname.length < 5 && dataname.length >= 1)
    || (datalastname.length < 5 && datalastname.length >= 1)) {
      errormsg.name = 'Incorrecto: formato inválido';
    }

    this.setState({ error: errormsg });
    if (errormsg.name === '' && errormsg.doc === '') {
      this.onUpdatePress();
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { user } = this.props;
    const { navigate, goBack } = this.props.navigation;
    const {
      datadocument,
      dataname,
      datalastname,
      error,
      loadingUpdate,
      msgApi,
    } = this.state;

    // verify Profile
    if (loadingUpdate) {
      if (user.error && !user.fetching) {
        alert('error Api');
        this.setState({ loadingUpdate: false });
      }
      if (user.status && !user.fetching) {
        // console.log(user);
        if (user.session) {
          setTimeout(() => {
            this.setState({ loadingUpdate: false });
            navigate('documents', { userdata: user.info });
          }, 1500);
        } else if (loadingUpdate && user.unprocess) {
          // unProccess
          this.setState({ msgApi: user.status.message, loadingUpdate: false });
        }
      }
    }

    return (
      <MainWrapper>
        <WrapperButtons style={{ justifyContent: 'center', marginTop: '0%', marginBottom: '3%' }}>
          <ArrowBack url={() => goBack()} />
          <SvgUri source={require('../../../Images/Logo3x.png')} />
        </WrapperButtons>
        <TextBlack>
          Datos
          <TextBlue>
            {' '}
          personales
          </TextBlue>
        </TextBlack>
        <TextGray>
          Excelente! su camión es perfecto, ahora queremos conocer un poco más de usted
        </TextGray>
        <WrapperInputs style={{ marginTop: '6%' }}>
          <Input
            title="Número de cédula"
            holder="Ingrese número de documento"
            type="numeric"
            maxLength={12}
            value={datadocument}
            onChangeText={value => this.setState({ datadocument: value })}
          />
          <Input
            title="Nombre"
            holder="Ingrese nombre"
            type="default"
            value={dataname}
            onChangeText={value => this.setState({ dataname: value })}
          />
          <Input
            title="Apellidos"
            holder="Ingrese apellido"
            type="default"
            value={datalastname}
            onChangeText={value => this.setState({ datalastname: value })}
          />
        </WrapperInputs>
        <WrapperError>
          { error.name ? (
            <TextError>
              {error.name}
            </TextError>
          ) : null }
          { error.doc ? (
            <TextError>
              {error.doc}
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
              content="Omitir"
              press={() => navigate('ScreenHome')}
            />
          </WrapperButtonGradient>
          <WrapperButtonGradient>
            <ButtonGradient content="Confirmar" press={() => this.validateForm()} />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>
        <TextLoad>
          { loadingUpdate ? (
            'loading...'
          ) : null }
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
  registerUser: params => dispatch(UserActions.postRegisterRequest(params)),
  // registerRole: params => dispatch(UserActions.postRegisterRoleRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
