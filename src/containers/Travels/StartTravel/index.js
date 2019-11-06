import React, { Component } from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { NavigationApps, actions, googleMapsTravelModes } from 'react-native-navigation-apps';
import { ActivityIndicator } from 'react-native';
import { MainWrapper, AbsoluteWrapper } from './styles';

export default class StartTravel extends Component {
  constructor() {
    super();
    this.state = {
      offerSpecific: null,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const offer = navigation.getParam('Offer');
    this.setState({ offerSpecific: offer });
    console.log(offer);
  }

  render() {
    console.log(this.props);
    const { offerSpecific } = this.state;
    if (offerSpecific !== null) {
      return (
        <MainWrapper>
          <MapView
            initialRegion={{
              latitude: 4.624335,
              longitude: -74.063644,
              latitudeDelta: 0.43,
              longitudeDelta: 0.34,
            }}
            style={{ height: '100%', width: '100%' }}
          />
          <AbsoluteWrapper>
            <NavigationApps
              iconSize={50}
              row
              address="Plaza de las americas"
              waze={{
                address: 'Plaza de las americas',
                lat: parseFloat(offerSpecific.destination_latitude),
                lon: parseFloat(offerSpecific.destination_longitude),
                action: actions.searchLocationByLatAndLon,
              }}
              googleMaps={{
                lat: parseFloat(offerSpecific.destination_latitude),
                lon: parseFloat(offerSpecific.destination_longitude),
                action: actions.searchLocationByLatAndLon,
                travelMode: googleMapsTravelModes.driving,
              }}
              modalBtnOpenTitle="hola"
              actionSheetBtnOpenTitle="sda"
              actionSheetCloseTitle="asdsda"
            />
          </AbsoluteWrapper>
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
