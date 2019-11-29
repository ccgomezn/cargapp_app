import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from 'react-redux/lib/connect/mapDispatchToProps';
import { ActivityIndicator } from 'react-native';
import { MainWrapper, MainTextCard, TextAbsolute, MainWrapperScroll } from './style';
import WhiteCardTravels from '../../components/WhiteCardTravels';

class FilterOffers extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log(this.props);
    const { filterOffers, navigation, vehicles } = this.props;
    if (filterOffers.data !== null) {
      const vehicle_data = {};
      vehicles.data.forEach((vehicle) => {
        vehicle_data[vehicle.id] = vehicle.name;
      });
      return (
        <MainWrapper>
          {filterOffers.data.length >= 1 ? (
            <MainWrapperScroll>
              <MainTextCard>Ofertas encontradas</MainTextCard>
              {filterOffers.data.map(offers => (
                <WhiteCardTravels
                  from={offers.origin}
                  to={offers.destination}
                  vehicle={vehicle_data[offers.vehicle_type_id]}
                  pay={offers.price}
                  date="hoy"
                  actionbtnPrimary={() => navigation.navigate('ApplyTravels', { dataOffer: offers })}
                  btnPrimary="Aplicar"
                  btnSecondary
                />
              ))}
            </MainWrapperScroll>
          ) : (
            <TextAbsolute>No hay ofertas disponibles con esas caracteristicas</TextAbsolute>
          )}
        </MainWrapper>
      );
    } return (
      <ActivityIndicator
        style={{ alignSelf: 'center', height: '100%' }}
        size="large"
        color="#0000ff"
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { offers, filterOffers, vehicles } = state;
  return {
    offers,
    filterOffers,
    vehicles,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterOffers);
