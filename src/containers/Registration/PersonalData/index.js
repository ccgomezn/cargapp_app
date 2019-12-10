/* eslint-disable no-alert */
/* eslint-disable array-callback-return */
/* eslint-disable no-else-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toast from 'react-native-tiny-toast';
import { ActivityIndicator } from 'react-native';

import Input from '../../../components/GeneralInput';
import ButtonGradient from '../../../components/ButtonGradient';
// import ButtonWhite from '../../../components/ButtonWhite';
import ArrowBack from '../../../components/ArrowBack';

// action - reducers
import ProfileActions from '../../../redux/reducers/ProfileRedux';

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
      iduser: '',
      dataname: '',
      datalastname: '',
      loadingUpdate: false,
      fetchdata: false,
      error: {},
      msgApi: '',
      errorApi: false,
      datarol: '',
      invalidname: false,
      invalidlastname: false,
    };
  }

  componentDidMount() {
    const { getProfile, navigation } = this.props;
    getProfile();
    const dtrol = navigation.getParam('idrol', '');
    if (dtrol !== '') {
      this.setState({ datarol: dtrol });
    }
  }

  async onUpdatePress() {
    const {
      dataname, datalastname, iduser,
    } = this.state;
    const { editProfile } = this.props;
    // validate data
    if (dataname !== '' || datalastname !== '') {
      const data = {};
      const profile = {};
      if (dataname !== '') {
        profile.firt_name = dataname;
      }
      if (datalastname !== '') {
        profile.last_name = datalastname;
      }
      // data
      data.profile = profile;
      // console.log(data);
      await editProfile(iduser, data);
      this.setState({ loadingUpdate: true });
    } else {
      this.setState({ msgApi: 'No hay campos para actualizar' });
    }
  }

  validateForm() {
    const { dataname, datalastname } = this.state;
    const errormsg = {};
    errormsg.name = '';
    errormsg.last = '';
    // validate info
    if (dataname.length < 4 || dataname === '') {
      errormsg.name = 'Nombre incorrecto: formato inválido';
      this.setState({ invalidname: true });
    } else {
      this.setState({ invalidname: false });
    }
    if (datalastname.length < 4 || datalastname === '') {
      errormsg.last = 'Apellido incorrecto: formato inválido';
      this.setState({ invalidlastname: true });
    } else {
      this.setState({ invalidlastname: false });
    }

    this.setState({ error: errormsg });
    if (errormsg.name === '' && errormsg.last === '') {
      this.onUpdatePress();
    }
  }

  validateRol() {
    const { datarol } = this.state;
    const { user } = this.props;
    const { navigate } = this.props.navigation;
    if (datarol === 11 || datarol === '') {
      navigate('DriverMenu');
    } else {
      navigate('RegCompany', { userdata: user.info });
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { profile } = this.props;
    const { goBack } = this.props.navigation;
    const {
      dataname,
      datalastname,
      error,
      loadingUpdate,
      msgApi,
      errorApi,
      fetchdata,
      invalidname,
      invalidlastname,
    } = this.state;

    // hide Toast
    if (errorApi) {
      setTimeout(() => this.setState({
        errorApi: false,
      }), 5000); // hide toast after 5s
    }

    // Update Profile
    if (loadingUpdate) {
      if (profile.error && !profile.fetching) {
        this.setState({ loadingUpdate: false, errorApi: true });
      }
      if (profile.edit && !profile.fetching) {
        if (profile.edit.id) {
          setTimeout(() => {
            this.setState({ loadingUpdate: false });
            this.validateRol();
          }, 1200);
        } else if (loadingUpdate) {
          // unProccess
          this.setState({ msgApi: 'Datos erroneos', loadingUpdate: false });
        }
      }
    }

    if (profile.data !== null) {
      if (!fetchdata) {
        profile.data.map((data) => {
          this.setState({ fetchdata: true, iduser: data.profile.id });
        });
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
            personales
            </TextBlue>
          </TextBlack>
          <TextGray>
            Excelente!, ahora queremos conocer un poco más de usted.
          </TextGray>
          <WrapperInputs style={{ marginTop: '6%' }}>
            <Input
              title="Nombre"
              holder="Ingrese nombre"
              type="default"
              errorText={invalidname}
              value={dataname}
              onChangeText={value => this.setState({ dataname: value })}
            />
            <Input
              title="Apellidos"
              holder="Ingrese apellido"
              type="default"
              errorText={invalidlastname}
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
            { error.last ? (
              <TextError>
                {error.last}
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
              {/* <ButtonWhite
                border={{ borderWidth: 1, borderStyle: 'inset' }}
                content="Omitir"
                press={() => this.validateRol()}
              /> */}
            </WrapperButtonGradient>
            <WrapperButtonGradient>
              <ButtonGradient content="Confirmar" press={() => this.validateForm()} />
            </WrapperButtonGradient>
          </WrapperButtonsBottom>
          <TextLoad>
            { loadingUpdate ? (
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
            duration={Toast.duration.LONG}
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
  const { user, profile } = state;
  return {
    user,
    profile,
  };
};

const mapDispatchToProps = dispatch => ({
  getProfile: params => dispatch(ProfileActions.getProfileRequest(params)),
  editProfile: (id, data) => dispatch(ProfileActions.editProfileRequest(id, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
