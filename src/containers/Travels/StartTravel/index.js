import React, { Component } from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { ActivityIndicator, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Polyline from '@mapbox/polyline';
import {
  MainWrapper, AbsoluteWrapper, WrapperImage, TouchableNavigationButtons, WrapperAdresses,
} from './styles';
import AddressesCardMap from '../../../components/AddressesCardMap';

const GOOGLE_MAPS_APIKEY = 'AIzaSyD9hrOmzRSUpe9XPMvw78KdHEU5le-CqyE';

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
    this.callLocation();
  }

  async getDirections(startLoc, destinationLoc) {
    const { offerSpecific } = this.state;
    const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc},${destinationLoc}&destination=${offerSpecific.destination_latitude},${offerSpecific.destination_longitude}&mode=DRIVING&key=${GOOGLE_MAPS_APIKEY}`);
    const respJson = await resp.json();
    const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    const coords = points.map((point, index) => ({
      latitude: point[0],
      longitude: point[1],
    }));
    this.setState({ coords });
    return coords;
  }

  callLocation() {
    Geolocation.getCurrentPosition((position) => {
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      };
      this.onRegionChange(region, region.latitude, region.longitude);
      this.getDirections(region.latitude, region.longitude)
        .then((suc) => {
          this.setState({ waypoints: suc });
        })
        .catch((err) => {
          console.log(err);
        });
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
      this.setState({ lastLat: e.latitude, lastLong: e.longitude });
      this.callLocation();
    }, 5000);
  }

  render() {
    const {
      offerSpecific, lastLat, lastLong, waypoints,
    } = this.state;
    if (offerSpecific !== null && waypoints !== undefined) {
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
            <MapView.Polyline coordinates={waypoints} />
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
