import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { ActivityIndicator } from 'react-native';
import { MainWrapper, AddressesWrapper } from './style';
import { connect } from 'react-redux';
import CardMapBeginTravel from '../../../components/CardMapBeginTravel';
import AddressesCardMap from '../../../components/AddressesCardMap';
import CompanyActions from '../../../redux/reducers/CompanyRedux';

class ApplyOffer extends Component {
  constructor() {
    super();
    this.state = {
      offer: null,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const dataOffer = navigation.getParam('dataOffer');
    this.setState({ offer: dataOffer });
  }

  render() {
    const { navigation } = this.props;
    const { offer } = this.state;
    console.log(this.props);
    if (offer !== null) {
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
          <AddressesWrapper>
            <AddressesCardMap
              secondAddress="Churros 1"
              nameAddress="Churros 2"
              firstAddress="Churros 3"
            />
          </AddressesWrapper>
          <CardMapBeginTravel
            extra="ExTrA"
            normalText="1 churro"
            amount={offer.price}
            onPressBG={() => navigation.goBack()}
            onPressBW={() => navigation.goBack()}
            delivery="5 días"
            company="Los churros S.A.S"
          />

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
  const { vehicles, companies } = state;
  return {
    vehicles,
    companies,
  };
};

const mapDispatchToProps = dispatch => ({
  getCompanies: params => dispatch(CompanyActions.getCompaniesRequest(params)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplyOffer);
