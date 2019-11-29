import React, { Component } from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { ActivityIndicator, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import Polyline from '@mapbox/polyline';
import StarRating from 'react-native-star-rating';
import OffersTypes from '../../../redux/reducers/OffersRedux';
import MarkersTypes from '../../../redux/reducers/MarkersRedux';
import {
  MainWrapper,
  AbsoluteWrapper,
  WrapperImage,
  TouchableNavigationButtons,
  WrapperAdresses,
  WrapperTopCard,
  BlueText,
} from './styles';
import AddressesCardMap from '../../../components/AddressesCardMap';
import TopCardTravel from '../../../components/TopCardTravel';
import EmptyDialog from '../../../components/EmptyDialog';
import { RateTypes } from '../../../redux/reducers/RateServiceRedux';

const GOOGLE_MAPS_APIKEY = 'AIzaSyD9hrOmzRSUpe9XPMvw78KdHEU5le-CqyE';

class StartTravel extends Component {
  constructor() {
    super();
    this.state = {
      offerSpecific: null,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      status: null,
      unload: false,
      starCount: 4.5,
      modalRating: false,
      load: false,
      inTravel: false,
      unLoad: false,
    };
  }

  componentDidMount() {
    const {
      navigation, offers, getMarkers, putStateOriginTravel,
    } = this.props;
    const offer = navigation.getParam('Offer');
    offers.data.map((newOffer) => {
      if (newOffer.id === offer.id) {
        this.setState({ offerSpecific: offer, status: offer.statu_id });
      }
    });
    this.callLocation();
    if (offer.statu_id === 10) {
      alert('holi');
      const data = {
        service: {
          statu_id: 6,
        },
      };
      putStateOriginTravel(offer.id, data);
    }
    getMarkers();
  }

  async getDirections(startLoc, destinationLoc) {
    const { offerSpecific } = this.state;
    const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc},${destinationLoc}&destination=${offerSpecific.origin_latitude},${offerSpecific.origin_longitude}&mode=DRIVING&key=${GOOGLE_MAPS_APIKEY}`);
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
    const { offerSpecific, status } = this.state;
    const { putStateOriginTravel } = this.props;
    if (offerSpecific.statu_id === 6) {
      this.setState({ lastLat: e.latitude, lastLong: e.longitude });
      this.callLocation();
      const result = this.destinationService(
        e.latitude,
        e.longitude,
        offerSpecific.origin_latitude,
        offerSpecific.origin_longitude,
      );
      if (result > 0.5 && offerSpecific.statu_id === 6) {
        const data = {
          service: {
            statu_id: 7,
          },
        };
        putStateOriginTravel(offerSpecific.id, data);
        alert('soy 7 ahora');
        this.componentDidMount();
        this.setState({ status: 7, load: true });
      }
    } else if (offerSpecific.statu_id === 8) {
      const result = this.destinationService(
        e.latitude,
        e.longitude,
        offerSpecific.destination_latitude,
        offerSpecific.destination_longitude,
      );
      if (result > 0.5) {
        const data = {
          service: {
            statu_id: 9,
          },
        };
        setTimeout(() => {
          putStateOriginTravel(offerSpecific.id, data);
          this.setState({ unload: false, inTravel: true });
          this.componentDidMount();
        }, 1000);
      }
    }
  }

  confirmTravel() {
    const { putStateOriginTravel } = this.props;
    const { offerSpecific, status } = this.state;
    if (status === 7 || offerSpecific.statu_id === 7) {
      alert('soy 8 ahora');
      const data = {
        service: {
          statu_id: 8,
        },
      };
      putStateOriginTravel(offerSpecific.id, data);
      this.componentDidMount();
      this.setState({ status: 8, inTravel: true });
    } else if (status === 9 || offerSpecific.statu_id === 9) {
      alert('soy 11 ahora');
      const data = {
        service: {
          statu_id: 11,
        },
      };
      putStateOriginTravel(offerSpecific.id, data);
      this.componentDidMount();
      this.setState({ status: 11, modalRating: true });
    }
  }

  destinationService(lat1, lon1, lat2, lon2) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    }
    const radLat1 = Math.PI * lat1 / 180;
    const radLat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radTheta = Math.PI * theta / 180;
    let dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2);
    Math.cos(radTheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist *= 1.609344;
    return dist;
  }

  render() {
    const {
      offerSpecific, lastLat, lastLong, waypoints, status, unload,
      modalRating, starCount, load, unLoad, inTravel,
    } = this.state;
    const { companies, markers } = this.props;
    console.log(offerSpecific);
    if (offerSpecific !== null && waypoints !== undefined && markers.data !== null) {
      markers.data.map(commerce => (
        commerce.longitude = commerce.geolocation.split(',')[0],
        commerce.latitude = commerce.geolocation.split(',')[1]
      ));
      if (offerSpecific.statu_id === 11 && !modalRating) {
        this.setState({ modalRating: true });
      }
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

            {markers.data.map(commerce => (
              <MapView.Marker
                coordinate={{
                  latitude: Number(commerce.latitude),
                  longitude: Number(commerce.longitude),
                }}
              />
            ))}

            <MapView.Polyline coordinates={waypoints} strokeWidth={4} strokeColor="#007aff" />
            <MapView.Marker
              coordinate={{
                latitude: Number(offerSpecific.origin_latitude),
                longitude: Number(offerSpecific.origin_longitude),
              }}
              tracksViewChanges={false}
              pinColor="#007aff"
              title="Origen carga"
            />
          </MapView>
          {companies.data.map((CompanyInfo) => {
            if (offerSpecific.company_id === CompanyInfo.id) {
              return (
                <WrapperTopCard>
                  <TopCardTravel
                    travelsCount="20"
                    arrive={offerSpecific.statu_id !== 6 || offerSpecific.statu_id !== 11}
                    unLoad={load}
                    amount="20k"
                    isConfirmLoad={inTravel}
                    company={CompanyInfo.name}
                    actionBtnOk={() => this.confirmTravel()}
                  />
                </WrapperTopCard>
              );
            }
          })}
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
              nameCompany="Tu"
              firstAddress="Ubicación"
              nameAddress={offerSpecific.destination}
              secondAddress={offerSpecific.destination_address}
            />
          </WrapperAdresses>
          <EmptyDialog visible={modalRating}>
            <BlueText>¿Que tal estuvo tu viaje?</BlueText>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={starCount}
              selectedStar={rating => this.setState({ starCount: rating })}
            />
          </EmptyDialog>
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
  const { offers, companies, markers, rateService } = state;
  return {
    offers,
    companies,
    markers,
    rateService,
  };
};

const mapDispatchToProps = dispatch => ({
  putStateOriginTravel: (id, data) => dispatch(OffersTypes.putStateInTravelOriginRequest(id, data)),
  getMarkers: (params = {}) => dispatch(MarkersTypes.getMarkersRequest(params)),
  postRateServices: data => dispatch(RateTypes.postRateServiceRequest(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartTravel);
