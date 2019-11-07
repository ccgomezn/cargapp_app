import React, { Component } from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { ActivityIndicator, Linking } from 'react-native';
import {
  MainWrapper, AbsoluteWrapper, WrapperImage, TouchableNavigationButtons, WrapperAdresses,
} from './styles';
import AddressesCardMap from '../../../components/AddressesCardMap';

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
            <TouchableNavigationButtons onPress={() => Linking.openURL(`https://www.waze.com/ul?ll=${offerSpecific.destination_latitude}%2C${offerSpecific.destination_longitude}&navigate=yes`)}>
              <WrapperImage source={{ uri: 'https://web-assets.waze.com/website/assets/packs/media/images/quick_win/icons/icon-waze-e091b33eb21e909bdafd2bcbed317719.png' }} />
            </TouchableNavigationButtons>
            <TouchableNavigationButtons onPress={() => Linking.openURL(`https://www.google.com/maps/place/${offerSpecific.destination_latitude},${offerSpecific.destination_longitude}`)}>
              <WrapperImage source={{ uri: 'https://lh3.googleusercontent.com/xmZuOCh0e0NeVpgsKn99K5Amo4PA2r5y078RIrvXY24zLAEwSLSwYvVcwT7zWSv512n4=w300' }} />
            </TouchableNavigationButtons>
          </AbsoluteWrapper>
          <WrapperAdresses>
            <AddressesCardMap
              nameCompany="Ubicación"
              firstAddress=""
              nameAddress={offerSpecific.destination}
              secondAddress={offerSpecific.destination_address}
            />
          </WrapperAdresses>
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
