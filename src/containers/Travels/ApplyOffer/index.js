import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { ActivityIndicator } from 'react-native';
import { MainWrapper, AddressesWrapper } from './style';
import CardMapBeginTravel from '../../../components/CardMapBeginTravel';
import AddressesCardMap from '../../../components/AddressesCardMap';

export default class ApplyOffer extends Component {
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
    console.log(offer)
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
          />
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
            amount="2000"
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
