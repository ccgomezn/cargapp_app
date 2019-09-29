/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  WrapperButtonGradient,
  TextTerms,
  WrapperButtons,
  WrapperButtonsBottom,
  TextError,
  TextLoad,
} from '../style';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      dataphone: '',
      datadocument: '',
      dataemail: '',
      loadingRegister: false,
      idregister: 0,
      idrole: 11,
      loadingRole: false,
      error: {},
    };
  }

  /* eslint-disable global-require */
  componentDidMount() {
    const { navigation } = this.props;
    const dtphone = navigation.getParam('phone', '');
    this.setState({ dataphone: dtphone });
  }

  async onRegisterPress() {
    const { dataphone, datadocument, dataemail } = this.state;
    const { registerUser } = this.props;
    const doc = datadocument.slice(4, 10);
    // validate info
    if (dataphone != null && dataphone !== ''
      && dataemail != null && dataemail !== ''
      && datadocument != null && datadocument !== ''
    ) {
      const data = {
        user: {
          email: dataemail,
          password: doc,
          password_confirmation: doc,
          identification: parseInt(datadocument, 10),
          phone_number: parseInt(dataphone, 10),
          role_id: 11,
        },
      };

      await registerUser(data);
    }
    this.setState({ loadingRegister: true });
  }

  async onRegisterRole() {
    const { idregister, idrole } = this.state;
    const { registerRole } = this.props;
    if (idrole != null) {
      const data = {
        user_role: {
          user_id: idregister,
          role_id: idrole,
        },
      };

      // console.log(data);
      await registerRole(data);
    }
    this.setState({ loadingRole: true });
  }

  validateForm() {
    const { datadocument, dataemail } = this.state;
    const errormsg = {};
    errormsg.email = '';
    errormsg.doc = '';
    // validate info
    if (dataemail.length < 8 || dataemail === '') {
      errormsg.email = 'Incorrecto: valor inválido';
    }
    if (dataemail !== '' && !/\S+@\S+\.\S+/.test(dataemail)) {
      errormsg.email = 'Incorrecto: formato inválido ';
    }
    if (datadocument.length < 10 || datadocument === '') {
      errormsg.doc = 'Incorrecto: minímo 10 caracteres';
    }
    if (datadocument.length === 10 && !/^\d+$/.test(datadocument)) {
      errormsg.doc = 'Incorrecto: formato inválido';
    }

    // console.log(errormsg);
    this.setState({ error: errormsg });

    if (errormsg.email === '' && errormsg.doc === '') {
      this.onRegisterPress();
      // alert('ok data');
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { user } = this.props;
    const { navigate } = this.props.navigation;
    const {
      dataphone,
      datadocument,
      dataemail,
      loadingRegister,
      loadingRole,
      error,
    } = this.state;

    // validate register User
    if (loadingRegister) {
      if (user.error && !user.fetching) {
        alert('error Api');
        this.setState({ loadingRegister: false });
      }
      if (user.status && !user.fetching) {
        // console.log(user);
        if (user.status.id) {
          // alert(`Registrado id:${user.status.id}`);
          this.setState({ loadingRegister: false, idregister: user.status.id });
          navigate('documents');
          // registrar user_role
          // this.onRegisterRole();
        } else if (loadingRegister && user.unprocess) {
          alert('Datos erroneos');
          this.setState({ loadingRegister: false });
        }
      }
    }

    // validate register role_user
    if (loadingRole) {
      /* if (user.error && !user.fetching) {
        alert('error Api');
        this.setState({ loadingRole: false });
      }
      if (user.status && !user.fetching) {
        console.log(user);
        this.setState({ loadingRole: false });
      } */
    }

    return (
      <MainWrapper>
        <WrapperButtons style={{ justifyContent: 'center', marginVertical: 0, marginBottom: '3%' }}>
          {/* eslint-disable-next-line react/prop-types */}
          <ArrowBack url={() => navigate.goBack()} />
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
        <WrapperInputs>
          <Input
            title="Celular"
            holder="Ingrese número de documento"
            editable={false}
            value={dataphone}
          />
          <Input
            title="Cedula"
            holder="Ingrese número de documento"
            type="numeric"
            maxLength={10}
            value={datadocument}
            onChangeText={value => this.setState({ datadocument: value })}
          />
          <TextError>
            {error.doc}
          </TextError>
          <Input
            title="Correo electrónico"
            placeholder="Correo electrónico"
            type="email-address"
            value={dataemail}
            onChangeText={value => this.setState({ dataemail: value })}
          />
          <TextError>
            {error.email}
          </TextError>
        </WrapperInputs>
        <WrapperButtonsBottom>
          <WrapperButtonGradient>
            {/* eslint-disable-next-line react/prop-types */}
            <ButtonGradient content="Registrarse" press={() => this.validateForm()} />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>
        <TextLoad>
          { loadingRegister ? (
            'loading...'
          ) : null }
        </TextLoad>
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
      </MainWrapper>
    );
  }
}

// export default Registration;

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  registerUser: params => dispatch(UserActions.postRegisterRequest(params)),
  registerRole: params => dispatch(UserActions.postRegisterRoleRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
