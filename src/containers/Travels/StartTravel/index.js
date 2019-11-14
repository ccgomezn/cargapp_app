import React, { Component } from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { ActivityIndicator, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  MainWrapper, AbsoluteWrapper, WrapperImage, TouchableNavigationButtons, WrapperAdresses,
} from './styles';
import AddressesCardMap from '../../../components/AddressesCardMap';

export default class StartTravel extends Component {
  constructor() {
    super();
    this.state = {
      offerSpecific: null,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const offer = navigation.getParam('Offer');
    this.setState({ offerSpecific: offer });
    Geolocation.getCurrentPosition((position) => {
      console.log('gola');
      console.log(position);
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      };
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  }

  onRegionChange(region, lLat, lLon) {
    const { lastLat, lastLong } = this.state;
    this.setState({
      mapRegion: region,
      lastLat: lLat || lastLat,
      lastLong: lLon || lastLong,
    });
  }

  ads(e) {
    const { lastLat, lastLong } = this.state;
    setTimeout(() => {
      console.log(e);
      const lat = lastLat.toString().slice(0, 3);
      const long = lastLong.toString().slice(0, 3);
      const preLat = e.latitude.toString().slice(0, 3);
      const preLong = e.longitude.toString().slice(0, 3);
      if (lat !== preLat && long !== preLong) {
        this.setState({ lastLat: e.latitude, lastLong: e.longitude });
      }
    }, 5000);
  }

  render() {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyD9hrOmzRSUpe9XPMvw78KdHEU5le-CqyE';
    const { offerSpecific, lastLat, lastLong } = this.state;
    if (offerSpecific !== null) {
      return (
        <MainWrapper>
          <MapView
            initialRegion={{
              latitude: lastLat,
              longitude: lastLong,
              latitudeDelta: 0.10,
              longitudeDelta: 0.10,
            }}
            onUserLocationChange={e => this.ads(e.nativeEvent.coordinate)}
            showsUserLocation
            followsUserLocation
            showsIndoorLevelPicker
            style={{ height: '100%', width: '100%' }}
          >
            <MapViewDirections
              origin={{
                latitude: lastLat,
                longitude: lastLong,
              }}
              destination={{
                latitude: Number(offerSpecific.destination_latitude),
                longitude: Number(offerSpecific.destination_longitude),
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor={['#007aff']}
            />
          </MapView>
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
