/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-root-toast';

import {
  MainWrapper, ContentView, TextBlack, ContentBlock, ContentForm, TextLoad,
  WrapperInputs, WrapperButtonsBottom, WrapperButtonGradient, WrapperError, TextError,
} from './style';

import Input from '../../components/GeneralInput';
import InputPicker from '../../components/InputPicker';
import ButtonGradient from '../../components/ButtonGradient';
import VehicleActions from '../../redux/reducers/VehicleRedux';
import PopUpDialog from '../../components/PopUpDialog';
import ButtonWhite from '../../components/ButtonWhite';

class Vehicle extends Component {
  constructor() {
    super();
    this.state = {
      userid: '',
      dataplate: '',
      databrand: '',
      datamodel: '',
      datacolor: '',
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
    };
  }

  componentDidMount() {
    const {
      getVehiclesType,
      user,
      profile,
      navigation,
    } = this.props;
    // get getPayment_methods
    getVehiclesType();
    this.getYearModel();
    // validate iduser - edit
    console.log(user);
    const dtveh = navigation.getParam('dataVehicle', '');
    if (dtveh !== '') {
      console.log(dtveh);
      this.setState({
        edit: false,
        userid: user.status.user.id,
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
        userid: user.status.user.id,
        edit: true,
        dataownerdoc: user.status.user ? user.status.user.identification : '',
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
          plate: dataplate,
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
      console.log(data);
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
    this.setState({ modalreg: false });
    navigate('ListVehicle');
  }

  validateForm() {
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
    if (datacolor.length < 1 || datacolor === '') {
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
    const { vehicles } = this.props;
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
    } = this.state;

    const itemsMethod = [];

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

    // register vehicle
    if (loading) {
      if (vehicles.error && !vehicles.fetching) {
        this.setState({ loading: false, errorApi: true });
      }
      if (vehicles.reg && !vehicles.fetching) {
        if (vehicles.reg.id && !vehicles.unprocess) {
          setTimeout(() => {
            this.setState({ loading: false, modalreg: true });
          }, 1200);
        } else if (loading && vehicles.unprocess) {
          // unProccess
          const message = 'Información No válida';
          this.setState({ msgApi: message, loading: false });
        }
      }
    }

    if (vehicles.data && !vehicles.fetching) {
      vehicles.data.map((ele) => {
        itemsMethod.push({ textItem: ele.name, valueItem: ele.id });
      });
      return (
        <MainWrapper>
          <ContentView>
            <ContentBlock>
              <TextBlack>Datos de vehículo</TextBlack>
            </ContentBlock>
          </ContentView>

          <ContentForm>
            <WrapperInputs>
              <Input
                title="Placa del vehículo"
                maxLength={8}
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
                title="Módelo"
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
              <Input
                title="Color"
                holder="Ingrese el color"
                maxLength={15}
                errorText={invalidcolor}
                value={datacolor}
                editable={edit}
                onChangeText={value => this.setState({ datacolor: value })}
              />
              <Input
                title="Chasis"
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

          <TextLoad>
            { loading ? (
              <ActivityIndicator
                style={{ alignSelf: 'center', height: 'auto' }}
                size="large"
                color="#0068ff"
              />
            ) : null }
          </TextLoad>

          <WrapperButtonsBottom>
            <WrapperButtonGradient>
              { edit ? (
                <ButtonGradient
                  press={() => this.validateForm()}
                  content="Añadir"
                  disabled={!inputValueCheck}
                />
              ) : <ButtonWhite content="Volver" border={{ borderWidth: 1, borderStyle: 'inset' }} press={() => navigate('ListVehicle')} /> }
            </WrapperButtonGradient>
          </WrapperButtonsBottom>

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
          <PopUpDialog
            textBlack="Vehículo registrado"
            textGray="Tu vehículo ha sido registrado de manera correcta"
            visible={modalreg}
            textButton="Volver a mis Vehículos"
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
  const { vehicles, user, profile } = state;
  return {
    vehicles,
    user,
    profile,
  };
};

const mapDispatchToProps = dispatch => ({
  getVehiclesType: params => dispatch(VehicleActions.getVehicleRequest(params)),
  registerVehicle: params => dispatch(VehicleActions.postRegVehicleRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vehicle);
