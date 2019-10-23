import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { MainWrapper, AddressesWrapper } from './style';
import CardMapBeginTravel from '../../../components/CardMapBeginTravel';
import AddressesCardMap from '../../../components/AddressesCardMap';
import CompanyActions from '../../../redux/reducers/CompanyRedux';
import OffersActions, {postApplyOfferSuccess} from '../../../redux/reducers/OffersRedux';

class ApplyOffer extends Component {
  constructor() {
    super();
    this.state = {
      offer: null,
    };
  }

  componentDidMount() {
    const { navigation, getCompanies } = this.props;
    const dataOffer = navigation.getParam('dataOffer');
    this.setState({ offer: dataOffer });
    getCompanies();
  }

  applyOffer(value) {
    const { user, applyOffer } = this.props;
    const data = {
      service_id: value,
      user_id: user.info.user.id,
      active: true,
    };
    applyOffer(data);
  }

  render() {
    const { navigation, companies } = this.props;
    const { offer } = this.state;
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
                  onPressBG={() => this.applyOffer(offer.id)}
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
  const { vehicles, companies, user } = state;
  return {
    vehicles,
    companies,
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  getCompanies: params => dispatch(CompanyActions.getCompaniesRequest(params)),
  applyOffer: service => dispatch(OffersActions.postApplyOfferRequest(service)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplyOffer);
