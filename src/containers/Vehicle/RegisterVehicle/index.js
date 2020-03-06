/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import Toast from 'react-native-tiny-toast';

import analytics from '@react-native-firebase/analytics';
import {
  MainWrapper, ContentView, TextBlack, ContentBlock, ContentForm, TextLoad,
  WrapperInputs, WrapperButtonsBottom, WrapperButtonGradient, WrapperError, TextError,
} from './style';

import Input from '../../../components/GeneralInput';
import InputPicker from '../../../components/InputPicker';
import ButtonGradient from '../../../components/ButtonGradient';
import VehicleActions from '../../../redux/reducers/VehicleRedux';
import PopUpDialog from '../../../components/PopUpDialog';
import ButtonWhite from '../../../components/ButtonWhite';
import ParametersActions from '../../../redux/reducers/ParametersRedux';

class Vehicle extends Component {
  constructor() {
    super();
    this.state = {
      userid: '',
      dataplate: '',
      databrand: '',
      datamodel: '',
      datacolor: '0',
      datachassis: '',
      dataownername: '',
      dataownerdoc: '',
      datavehicletype: '0',
      datamodelyear: '0',
      invalidvehicletype: false,
      invalidplate: false,
      invalidbrand: false,
      invalidmodel: false,
      invalidmodelyear: false,
      invalidcolor: false,
      invalidchassis: false,
      invalidownername: false,
      invalidownerdoc: false,
      loading: false,
      inputValueCheck: false,
      error: {},
      msgApi: '',
      itemsYears: [],
      errorApi: false,
      modalreg: false,
      edit: true,
      selectID: null,
      dataOffer: null,
      vehicleId: null,
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('datos_vehiculo');
    const {
      getVehiclesType,
      user,
      profile,
      getparameters,
      navigation,
    } = this.props;
    // get getTypes
    getVehiclesType();
    this.getYearModel();
    // get colors
    getparameters('VEHICLE_COLOR');
    // validate iduser - edit
    const dtveh = navigation.getParam('dataVehicle', '');
    const selectID = navigation.getParam('selectID');
    const offer = navigation.getParam('dataOffer');
    this.setState({ selectID, dataOffer: offer });
    if (dtveh !== '') {
      this.setState({
        edit: false,
        userid: user.info.user.id,
        vehicleId: dtveh.id,
        dataplate: dtveh.plate,
        databrand: dtveh.brand,
        datavehicletype: dtveh.vehicle_type_id,
        datamodel: dtveh.model,
        datamodelyear: dtveh.model_year,
        datacolor: dtveh.color,
        datachassis: dtveh.chassis,
        dataownerdoc: dtveh.owner_document_id,
        dataownername: dtveh.owner_vehicle,
      });
    } else {
      this.setState({
        userid: user.info.user.id,
        edit: true,
        dataownerdoc: user.info !== null ? user.info.user.identification : '',
        dataownername: profile.data ? profile.data[0].profile.firt_name : '',
      });
    }
  }

  async onRegVehicle() {
    const {
      userid,
      dataplate,
      datavehicletype,
      databrand,
      datamodel,
      datamodelyear,
      datacolor,
      datachassis,
      dataownername,
      dataownerdoc,
    } = this.state;
    const { registerVehicle } = this.props;

    if (dataplate) {
      const data = {
        vehicle: {
          user_id: userid,
          active: true,
          plate: dataplate.toUpperCase(),
          vehicle_type_id: datavehicletype,
          brand: databrand,
          model: datamodel,
          model_year: datamodelyear,
          color: datacolor,
          chassis: datachassis,
          owner_vehicle: dataownername,
          owner_document_type_id: 5,
          owner_document_id: dataownerdoc,
        },
      };
      await registerVehicle(data);
    }
    this.setState({ loading: true, msgApi: null });
  }

  getYearModel() {
    const items = [];
    const year = new Date().getFullYear() + 2; // Current Year
    // eslint-disable-next-line no-plusplus
    for (let index = 1990; index <= year; index++) {
      items.push({ textItem: index, valueItem: index });
    }
    this.setState({ itemsYears: items });
  }

  closeModal() {
    const { navigate } = this.props.navigation;
    const { vehicleId } = this.state;
    this.setState({ modalreg: false });
    setTimeout(() => {
      navigate('DetailVehicleDoc', { vehicleId });
    }, 100);
  }

  validateForm() {
    analytics().logEvent('boton_confirmar_datos_vehiculo');
    const {
      dataplate,
      datavehicletype,
      databrand,
      datamodel,
      datamodelyear,
      datacolor,
      datachassis,
    } = this.state;
    const errormsg = {};
    this.setState({ error: null });
    errormsg.plate = '';
    errormsg.vehicletype = '';
    errormsg.general = '';

    // validate input's
    if (dataplate.length < 6 || dataplate === '') {
      errormsg.plate = 'Placa incorrecta: minímo 6 caracteres';
      this.setState({ invalidplate: true });
    }
    if (datavehicletype === '0') {
      errormsg.vehicletype = 'Tipo de vehículo obligatorio';
      this.setState({ invalidvehicletype: true });
    }
    if (databrand.length < 1 || databrand === '') {
      errormsg.general = 'Campos sin completar *';
      this.setState({ invalidbrand: true });
    } else {
      this.setState({ invalidbrand: false });
    }
    if (datamodel.length < 1 || datamodel === '') {
      errormsg.general = 'Campos sin completar *';
      this.setState({ invalidmodel: true });
    } else {
      this.setState({ invalidmodel: false });
    }
    if (datamodelyear === '0') {
      errormsg.general = 'Campos sin completar *';
      this.setState({ invalidmodelyear: true });
    } else {
      this.setState({ invalidmodelyear: false });
    }
    if (datacolor === '0') {
      errormsg.general = 'Campos sin completar *';
      this.setState({ invalidcolor: true });
    } else {
      this.setState({ invalidcolor: false });
    }
    if (datachassis.length < 1 || datachassis === '') {
      errormsg.general = 'Campos sin completar *';
      this.setState({ invalidchassis: true });
    } else {
      this.setState({ invalidchassis: false });
    }
    // save error
    this.setState({ error: errormsg });

    if (errormsg.plate === '') {
      this.setState({ invalidplate: false });
    }
    if (errormsg.vehicletype === '') {
      this.setState({ invalidvehicletype: false });
    }

    if (errormsg.plate === '' && errormsg.vehicletype === '' && errormsg.general === '') {
      this.onRegVehicle();
    }
  }

  render() {
    const { vehicles, parameters } = this.props;
    const { navigate } = this.props.navigation;
    const {
      dataplate,
      databrand,
      datamodel,
      datacolor,
      datachassis,
      dataownername,
      dataownerdoc,
      datavehicletype,
      datamodelyear,
      invalidvehicletype,
      invalidplate,
      invalidbrand,
      invalidmodel,
      invalidmodelyear,
      invalidcolor,
      invalidchassis,
      invalidownername,
      invalidownerdoc,
      inputValueCheck,
      error,
      loading,
      msgApi,
      itemsYears,
      errorApi,
      modalreg,
      edit,
      selectID,
      dataOffer,
      vehicleId,
    } = this.state;

    const itemsMethod = [];
    const itemsColors = [];

    // hide Toast
    if (errorApi) {
      setTimeout(() => this.setState({
        errorApi: false,
      }), 5000); // hide toast after 5s
    }

    if (dataplate) {
      if (dataplate !== '') {
        if (inputValueCheck === false) {
          this.setState({ inputValueCheck: true });
        }
      } else if (inputValueCheck) {
        this.setState({ inputValueCheck: false });
      }
    }

    console.log('VehicleID', vehicleId);

    // register vehicle
    if (loading) {
      if (vehicles.error && !vehicles.fetching) {
        this.setState({ loading: false, errorApi: true });
      }
      if (vehicles.reg && !vehicles.fetching) {
        if (vehicles.reg.id && !vehicles.unprocess) {
          setTimeout(() => {
            this.setState({ vehicleId: vehicles.reg.id, loading: false, modalreg: true });
          }, 1200);
        } else if (loading && vehicles.unprocess) {
          // unProccess
          const message = 'Información No válida';
          this.setState({ msgApi: message, loading: false });
        }
      }
    }

    if (vehicles.data !== null
      && !vehicles.fetching && parameters.data !== null && !parameters.fetching) {
      vehicles.data.map((ele) => {
        itemsMethod.push({ textItem: ele.name, valueItem: ele.id });
      });
      parameters.data.parameters.map((colors) => {
        itemsColors.push({ textItem: colors.name, valueItem: colors.code });
      });
      return (
        <MainWrapper>
          <ContentView>
            <ContentBlock>
              <TextBlack>Datos del vehículo</TextBlack>
            </ContentBlock>
          </ContentView>

          <ContentForm>
            <WrapperInputs>
              <Input
                title="Placa del vehículo"
                maxLength={8}
                capitalize="characters"
                holder="Ingrese número de placa"
                errorText={invalidplate}
                value={dataplate}
                editable={edit}
                onChangeText={value => this.setState({ dataplate: value })}
              />
              <InputPicker
                title="Tipo de vehículo"
                listdata={itemsMethod}
                defaultSelect={datavehicletype}
                editable={edit}
                onChangeValue={value => this.setState({ datavehicletype: value })}
                errorText={invalidvehicletype}
              />
              <Input
                title="Marca"
                holder="Ingrese la marca"
                maxLength={20}
                errorText={invalidbrand}
                value={databrand}
                editable={edit}
                onChangeText={value => this.setState({ databrand: value })}
              />
              <Input
                title="Modelo"
                holder="Ingrese el módelo"
                maxLength={20}
                errorText={invalidmodel}
                value={datamodel}
                editable={edit}
                onChangeText={value => this.setState({ datamodel: value })}
              />
              <InputPicker
                title="Año"
                listdata={itemsYears}
                defaultSelect={datamodelyear}
                editable={edit}
                onChangeValue={value => this.setState({ datamodelyear: value })}
                errorText={invalidmodelyear}
              />
              <InputPicker
                title="Color"
                listdata={itemsColors}
                defaultSelect={datacolor}
                editable={edit}
                onChangeValue={value => this.setState({ datacolor: value })}
                errorText={invalidcolor}
              />
              <Input
                title="No. Chasis"
                holder="Ingrese el chasis"
                maxLength={20}
                errorText={invalidchassis}
                value={datachassis}
                editable={edit}
                onChangeText={value => this.setState({ datachassis: value })}
              />
            </WrapperInputs>
          </ContentForm>

          <ContentView>
            <ContentBlock>
              <TextBlack>Datos del propietario</TextBlack>
            </ContentBlock>
          </ContentView>

          <ContentForm>
            <WrapperInputs>
              <Input
                title="Propietario"
                holder="Ingrese nombre"
                maxLength={20}
                errorText={invalidownername}
                value={dataownername}
                editable={edit}
                onChangeText={value => this.setState({ dataownername: value })}
              />
              <Input
                title="Cédula"
                holder="Ingrese No. de cédula"
                maxLength={10}
                type="numeric"
                errorText={invalidownerdoc}
                value={dataownerdoc}
                editable={edit}
                onChangeText={value => this.setState({ dataownerdoc: value })}
              />
            </WrapperInputs>
          </ContentForm>

          <WrapperError>
            { error.plate ? (
              <TextError>
                {error.plate}
              </TextError>
            ) : null }
            { error.vehicletype ? (
              <TextError>
                {error.vehicletype}
              </TextError>
            ) : null }
            { error.general ? (
              <TextError>
                {error.general}
              </TextError>
            ) : null }
            { msgApi ? (
              <TextError>
                {msgApi}
              </TextError>
            ) : null }
          </WrapperError>

          <Toast
            visible={loading}
            position={0}
            loading
            shadow
            animation
          >
            Registrando Vehículo...
          </Toast>

          { edit ? (
            <WrapperButtonsBottom>
              <WrapperButtonGradient>
                <ButtonGradient
                  press={() => this.validateForm()}
                  content="Añadir"
                  disabled={!inputValueCheck}
                />
              </WrapperButtonGradient>
            </WrapperButtonsBottom>
          ) : (
            <WrapperButtonsBottom>
              <WrapperButtonGradient>
                <ButtonWhite content="Volver" border={{ borderWidth: 1, borderStyle: 'outset' }} press={() => navigate('ListVehicle', { selectID, dataOffer })} />
              </WrapperButtonGradient>
              <WrapperButtonGradient>
                <ButtonGradient content="Siguiente" press={() => navigate('DetailVehicleDoc', { vehicleId })} />
              </WrapperButtonGradient>
            </WrapperButtonsBottom>
          )}

          <Toast
            visible={errorApi}
            position={-50}
            duration={Toast.duration.LONG}
            shadow
            animation
          >
            Error, no se pudo procesar la solicitud
          </Toast>
          <PopUpDialog
            textBlack="¡Perfecto!"
            textGray="Ahora debes ingresar la documentación de tu vehículo"
            visible={modalreg}
            textButton="Continuar"
            pressButton={() => this.closeModal()}
          />
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
  const {
    vehicles, user, profile, parameters,
  } = state;
  return {
    vehicles,
    user,
    profile,
    parameters,
  };
};

const mapDispatchToProps = dispatch => ({
  getVehiclesType: params => dispatch(VehicleActions.getVehicleRequest(params)),
  registerVehicle: params => dispatch(VehicleActions.postRegVehicleRequest(params)),
  getparameters: params => dispatch(ParametersActions.parametersRequest(params)),
  getListVehicles: params => dispatch(VehicleActions.getMeVehiclesRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vehicle);
