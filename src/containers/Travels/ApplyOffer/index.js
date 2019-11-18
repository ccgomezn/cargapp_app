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

class ApplyOffer extends Component {
  constructor() {
    super();
    this.state = {
      offer: null,
      successNotification: false,
      errorFalse: false,
      fetchError: false,
      fetchSuccess: false,
    };
  }

  componentDidMount() {
    const { navigation, getCompanies, getServices } = this.props;
    const dataOffer = navigation.getParam('dataOffer');
    this.setState({ offer: dataOffer });
    getCompanies();
    getServices();
  }

  applyOffer(value) {
    const { user, applyOffer, navigation } = this.props;
    const data = {
      service_id: value.id,
      user_id: user.info.user.id,
      active: true,
    };
    applyOffer(data);
    navigation.navigate('StartTravel', { Offer: value });
    this.setState({ fetch: true });
  }

  render() {
    const { offers, navigation, companies } = this.props;
    console.log(this.props);
    const {
      offer, successNotification, errorFalse, fetch,
    } = this.state;
    if (offers.service !== null && fetch) {
      this.setState({ successNotification: true, fetch: false });
    }
    if (offers.service === null && fetch) {
      this.setState({ errorFalse: true, fetch: false });
    }
    if (offer !== null && companies.data !== null) {
      return (
        <MainWrapper>
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
                  onPressBG={() => this.applyOffer(offer)}
                  onPressBW={() => navigation.goBack()}
                  delivery="5 días"
                  company={company.name}
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
    vehicles, companies, user, offers,
  } = state;
  return {
    vehicles,
    companies,
    user,
    offers,
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
