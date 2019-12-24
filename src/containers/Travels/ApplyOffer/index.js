/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import {
  MainWrapper, AddressesWrapper, WrapperModal, BlueText,
} from './style';
import CardMapBeginTravel from '../../../components/CardMapBeginTravel';
import AddressesCardMap from '../../../components/AddressesCardMap';
import CompanyActions from '../../../redux/reducers/CompanyRedux';
import OffersActions from '../../../redux/reducers/OffersRedux';
import RateActions from '../../../redux/reducers/RateServiceRedux';
import PopUpNotification from '../../../components/PopUpNotifications';
import EmptyDialog from '../../../components/EmptyDialog';
import ButtonGradient from '../../../components/ButtonGradient';

class ApplyOffer extends Component {
  constructor() {
    super();
    this.state = {
      offer: null,
      successNotification: false,
      errorFalse: false,
      fetchError: false,
      fetchSuccess: false,
      fetchID: false,
      valueApplyOffer: null,
      showTravel: false,
      modalFinish: false,
      modalRate: false,
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('mis_viajes_detalle');
    const {
      navigation, getCompanies, getServices, offers, getRateServices,
    } = this.props;
    const dataOffer = navigation.getParam('dataOffer');
    const booked = navigation.getParam('booked');
    const share = navigation.getParam('share');
    const idShare = navigation.getParam('idShare');
    if (share) {
      offers.data.map((services) => {
        if (services.id === idShare) {
          this.setState({ offer: services });
        }
      });
    }
    if (dataOffer) {
      this.setState({ offer: dataOffer });
    }
    if (dataOffer.statu_id === 11 || (dataOffer.statu_id === 10 && booked)) {
      this.setState({ modalFinish: true });
    }
    getRateServices();
    getCompanies();
    getServices();
  }

  onPressCancel() {
    analytics().logEvent('boton_cancelar_oferta');
    const { navigation } = this.props;
    navigation.goBack();
  }

  onPressQualification() {
    analytics().logEvent('boton_ver_calificacion');
    this.setState({ modalRate: true });
  }

  vehicleType(value, id) {
    analytics().logEvent('boton_aplicar_a_oferta');
    const { navigation } = this.props;
    const { showTravel } = this.state;
    const dataOffer = navigation.getParam('dataOffer');
    if (id) {
      this.applyOffer(id, value);
    } else if (showTravel) {
      navigation.navigate('StartTravel', { Offer: value });
    } else {
      navigation.navigate('ListVehicle', { selectID: true, offer: dataOffer });
    }
  }

  applyOffer(value, valueApplyOffer) {
    const { applyOffer, navigation, profile } = this.props;
    const data = {
      service_id: valueApplyOffer.id,
      user_id: profile.data[0].user.id,
      active: true,
    };
    applyOffer(data);
    navigation.navigate('First');
  }

  nameButton() {
    const { profile } = this.props;
    const { offer, showTravel } = this.state;
    if (profile.data[0].user.id === offer.user_driver_id) {
      if (offer.statu_id === 10) {
        return 'Esperando respuesta';
      }
      if (!showTravel) {
        this.setState({ showTravel: true });
      }
      return 'Iniciar viaje';
    }
    return 'Aplicar a oferta';
  }

  modalBack() {
    const { navigation } = this.props;
    this.setState({ modalFinish: false });
    setTimeout(() => {
      navigation.goBack();
    }, 100);
  }

  render() {
    const {
      offers, navigation, companies, rateService,
    } = this.props;
    const {
      offer, successNotification, errorFalse, fetch, fetchID, modalFinish, modalRate,
    } = this.state;
    if (offers.service !== null && fetch) {
      this.setState({ successNotification: true, fetch: false });
    }
    if (offers.service === null && fetch) {
      this.setState({ errorFalse: true, fetch: false });
    }
    const selectID = navigation.getParam('selectID');
    if (selectID !== undefined && selectID !== null && fetchID === false) {
      this.setState({ fetchID: true });
    }
    if (offer !== null && companies.data !== null && rateService.rate !== null) {
      const rateCompany = [];
      rateService.rate.map((rate) => {
        if (offer.id === rate.service_id) {
          rateCompany.push(rate.service_point);
        }
      });
      const totalRate = rateCompany.reduce((a, b) => a + b, 0);
      return (
        <MainWrapper>
          {fetchID && (
            <PopUpNotification
              subText="Ahora ya puedes postularte al viaje"
              mainText="Muy bien, seleccionaste tu vehículo!"
              onTouchOutside={() => this.setState({ fetchID: null })}
              visible={fetchID}
            />
          )}
          <EmptyDialog visible={modalFinish}>
            <WrapperModal>
              <BlueText>{offer.statu_id === 11 ? 'Esta oferta ya está finalizada' : offer.statu_id === 10 && 'Estamos esperando que acepten el viaje'}</BlueText>
              <ButtonGradient press={() => this.modalBack()} content="Volver" disabled={false} />
            </WrapperModal>
          </EmptyDialog>
          <EmptyDialog visible={modalRate}>
            <WrapperModal>
              <BlueText>
                {totalRate === 0 ? 'Aún no tiene calificación el generador' : `El generador tiene ${totalRate} estrellas`}
                {' '}
              </BlueText>
              <ButtonGradient press={() => this.setState({ modalRate: false })} content="cerrar" disabled={false} />
            </WrapperModal>
          </EmptyDialog>
          <MapView
            initialRegion={{
              latitude: 4.624335,
              longitude: -74.063644,
              latitudeDelta: 0.43,
              longitudeDelta: 0.34,
            }}
            style={{ height: '55%', width: '100%' }}
          >
            <MapView.Marker
              coordinate={{
                latitude: parseInt(offer.origin_latitude),
                longitude: parseInt(offer.origin_longitude),
              }}
              title="Origen del viaje"
            />
          </MapView>
          {successNotification && (
          <PopUpNotification
            subText="Pronto te darémos respuesta..."
            mainText="Has aplicado correctamente a la oferta"
            onTouchOutside={() => this.setState({ successNotification: false })}
            visible={successNotification}
          />
          )}
          {errorFalse && (
          <PopUpNotification
            subText="Intentalo de nuevo más tarde"
            mainText="Ups! Algo ha fallado"
            onTouchOutside={() => this.setState({ errorFalse: false })}
            visible={errorFalse}
          />
          )}
          {companies.data.map((company) => {
            if (offer.company_id === company.id) {
              return (
                <AddressesWrapper>
                  <AddressesCardMap
                    nameCompany={offer.origin}
                    firstAddress={offer.origin_address}
                    nameAddress={offer.destination}
                    secondAddress={offer.destination_address}
                  />
                </AddressesWrapper>
              );
            }
          })}
          {companies.data.map((company) => {
            if (offer.company_id === company.id) {
              return (
                <CardMapBeginTravel
                  extra={offer.description}
                  normalText={company.address}
                  amount={offer.price}
                  onPressBG={() => this.vehicleType(offer, selectID)}
                  onPressBW={() => this.onPressCancel()}
                  delivery="5 días"
                  company={company.name}
                  mainButton={this.nameButton()}
                  onPressQA={() => this.onPressQualification()}
                />
              );
            }
          })}
        </MainWrapper>
      );
    }
    return (
      <ActivityIndicator
        style={{ alignSelf: 'center', height: '100%' }}
        size="large"
        color="#0000ff"
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    vehicles, companies, user, offers, profile, rateService,
  } = state;
  return {
    vehicles,
    companies,
    user,
    offers,
    profile,
    rateService,
  };
};

const mapDispatchToProps = dispatch => ({
  getCompanies: params => dispatch(CompanyActions.getCompaniesRequest(params)),
  applyOffer: service => dispatch(OffersActions.postApplyOfferRequest(service)),
  getServices: (params = {}) => dispatch(OffersActions.getServicesRequest(params)),
  getRateServices: (params = {}) => dispatch(RateActions.getRateServiceRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplyOffer);
