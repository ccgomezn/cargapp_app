/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {
  MainWrapper, ContentView, TextBlack, ContentBlock,
  WrapperButtonsBottom, WrapperButtonGradient, TextGray, BlueText,
} from './style';

import ButtonGradient from '../../components/ButtonGradient';
import CardVehicle from '../../components/CardVehicle';
import VehicleActions from '../../redux/reducers/VehicleRedux';
import PopUpDialog from '../../components/PopUpDialog';
import ButtonWhite from '../../components/ButtonWhite';

class ListVehicles extends Component {
  constructor() {
    super();
    this.state = {
      modalVeh: false,
      selectID: null,
      offer: null,
      isVehicle: false,
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('mis_vehiculos');
    const { getListVehicles, getVehiclesType, navigation } = this.props;
    getListVehicles();
    // get getTypes
    getVehiclesType();
    const selectID = navigation.getParam('selectID');
    const offer = navigation.getParam('offer');
    this.setState({ selectID, offer });
  }

  onViewDetail(data) {
    const { navigate } = this.props.navigation;
    const { selectID, offer } = this.state;
    if (selectID) {
      navigate('ApplyTravels', { selectID: data.id, dataOffer: offer });
      this.setState({ selectID: null });
    } else {
      navigate('DetailVehicle', { dataVehicle: data });
    }
  }

  onValidate() {
    analytics().logEvent('boton_agregar_vehiculo');
    const { navigate } = this.props.navigation;
    const { selectID, offer } = this.state;
    const { vehicles } = this.props;
    const items = vehicles.list.length;
    if (items > 3) {
      // Alert not add
      this.setState({ modalVeh: true });
      // navigate('DetailVehicle');
    } else {
      navigate('DetailVehicle', { selectID, dataOffer: offer });
    }
  }

  closeModal() {
    this.setState({ modalVeh: false });
  }

  render() {
    const { vehicles, navigation } = this.props;
    const {
      modalVeh, offer, isVehicle,
    } = this.state;
    const itemsType = {};

    if (vehicles.status && !vehicles.fetching && vehicles.data !== null) {
      vehicles.data.map((ele) => {
        itemsType[ele.id] = ele.name;
      });
      return (
        <MainWrapper>
          <ContentView>
            <ContentBlock>
              <TextBlack>Mis Vehículos</TextBlack>
              <TextGray>Añade y edita los datos de tus vehículos.</TextGray>
            </ContentBlock>
          </ContentView>

          <ContentView style={{ flexDirection: 'column' }}>
            { vehicles.list.map((data) => {
              if (offer && offer.vehicle_type_id === data.vehicle_type_id) {
                if (!isVehicle) {
                  this.setState({ isVehicle: 'now' });
                }
                return (
                  <CardVehicle
                    data={data}
                    types={itemsType}
                    press={() => this.onViewDetail(data)}
                  />
                );
              } else if (isVehicle === false) {
                this.setState({ isVehicle: null });
              }
            })}
            {offer && isVehicle === null ? (
              <BlueText>
                No tienes vehículos agregados con las
                caracteristicas que necesita el generador
              </BlueText>
            ) : null}
            {vehicles.list.map((data) => {
              if (!offer) {
                return (
                  <CardVehicle
                    data={data}
                    types={itemsType}
                    press={() => this.onViewDetail(data)}
                  />
                );
              }
            })}
          </ContentView>

          <WrapperButtonsBottom>
            <WrapperButtonGradient>
              {offer && (isVehicle === null || isVehicle === 'now') && (
              <ButtonWhite press={() => navigation.navigate('HomeOffers')} content="Cancelar" border />
              )}
            </WrapperButtonGradient>
            <WrapperButtonGradient>
              <ButtonGradient
                content="Añadir Vehículo"
                press={() => this.onValidate()}
              />
            </WrapperButtonGradient>
            <WrapperButtonGradient>
              <ButtonGradient
                content="Doc Vehículo"
                press={() => navigation.navigate('DetailVehicleDoc')}
              />
            </WrapperButtonGradient>
          </WrapperButtonsBottom>
          <PopUpDialog
            textBlack="Advertencia"
            textGray="Ya haz registrado mas de (3) vehículos."
            visible={modalVeh}
            textButton="Entendido"
            onTouchOutside={() => this.closeModal()}
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
  const { user, vehicles } = state;
  return {
    user,
    vehicles,
  };
};

const mapDispatchToProps = dispatch => ({
  getListVehicles: params => dispatch(VehicleActions.getMeVehiclesRequest(params)),
  getVehiclesType: params => dispatch(VehicleActions.getVehicleRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListVehicles);
