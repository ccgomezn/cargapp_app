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
import { MainWrapper, AddressesWrapper } from './style';
import CardMapBeginTravel from '../../../components/CardMapBeginTravel';
import AddressesCardMap from '../../../components/AddressesCardMap';
import CompanyActions from '../../../redux/reducers/CompanyRedux';
import OffersActions from '../../../redux/reducers/OffersRedux';
import PopUpNotification from '../../../components/PopUpNotifications';
import EmptyDialog from '../../../components/EmptyDialog';
import Vehicle from '../../Vehicle';

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
    };
  }

  componentDidMount() {
    const { navigation, getCompanies, getServices } = this.props;
    const dataOffer = navigation.getParam('dataOffer');
    this.setState({ offer: dataOffer });
    getCompanies();
    getServices();
  }

  vehicleType(value, id) {
    const { navigation } = this.props;
    const { showTravel } = this.state;
    const dataOffer = navigation.getParam('dataOffer');
    alert(showTravel);
    if (id) {
      this.applyOffer(id, value);
    } else if (id || showTravel) {
      navigation.navigate('StartTravel', { Offer: value });
    } else {
      navigation.navigate('ListVehicle', { selectID: true, offer: dataOffer });
    }
  }

  applyOffer(value, valueApplyOffer) {
    const { applyOffer, navigation, profile } = this.props;
    alert(`IM HERE${value}`);
    const data = {
      service_id: valueApplyOffer.id,
      user_id: profile.data[0].user.id,
      active: true,
    };
    applyOffer(data);
    navigation.navigate('StartTravel', { Offer: valueApplyOffer });
  }

  nameButton() {
    const { profile } = this.props;
    const { offer, showTravel } = this.state;
    if (profile.data[0].user.id === offer.user_driver_id) {
      if (offer.statu_id === 10) {
        return 'Esperando respuesta';
      }
      return 'Iniciar viaje';
    }
    return 'Aplicar a oferta';
  }

  render() {
    const { offers, navigation, companies } = this.props;
    console.log(this.props);
    const {
      offer, successNotification, errorFalse, fetch, fetchID, showTravel,
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
    } else if (!showTravel) {
      this.setState({ showTravel: true });
    }
    if (offer !== null && companies.data !== null) {
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
                    nameCompany={company.name}
                    firstAddress={company.address}
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
                  onPressBW={() => navigation.goBack()}
                  delivery="5 días"
                  company={company.name}
                  mainButton={this.nameButton()}
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
    vehicles, companies, user, offers, profile,
  } = state;
  return {
    vehicles,
    companies,
    user,
    offers,
    profile,
  };
};

const mapDispatchToProps = dispatch => ({
  getCompanies: params => dispatch(CompanyActions.getCompaniesRequest(params)),
  applyOffer: service => dispatch(OffersActions.postApplyOfferRequest(service)),
  getServices: (params = {}) => dispatch(OffersActions.getServicesRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplyOffer);
