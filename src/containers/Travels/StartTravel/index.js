import React, { Component } from 'react';
import {Platform} from 'react-native';

import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { ActivityIndicator, Linking, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import Polyline from '@mapbox/polyline';
import StarRating from 'react-native-star-rating';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import OffersTypes from '../../../redux/reducers/OffersRedux';
import RateTypes from '../../../redux/reducers/RateServiceRedux';
import MarkersTypes from '../../../redux/reducers/MarkersRedux';
import {
  MainWrapper,
  AbsoluteWrapper,
  WrapperImage,
  TouchableNavigationButtons,
  WrapperAdresses,
  WrapperTopCard,
  BlueText,
  WrapperModal,
} from './styles';
import AddressesCardMap from '../../../components/AddressesCardMap';
import TopCardTravel from '../../../components/TopCardTravel';
import EmptyDialog from '../../../components/EmptyDialog';
import DocumentActions from '../../../redux/reducers/DocumentRedux';

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
      finished: false,
      manifestSet: false,
    };
  }

  actionMan() {
    console.log(this.props.user.session.access_token);
    const { android } = RNFetchBlob;
    const { dirs } = RNFetchBlob.fs;

      RNFetchBlob
        .config({
          fileCache: false,
          appendExt: 'pdf',
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mime: 'application/pdf',
            mediaScannable: true,
            title: 'manifest.pdf',
            path: `${dirs.DownloadDir}/manifest.pdf`,
          },
        })
        .fetch('GET', this.state.manifest)
        .then((resp) => {

          if(Platform.OS == 'ios') RNFetchBlob.ios.openDocument(resp.path());
          if (Platform.OS == 'android') android.actionViewIntent(resp.path(), 'application/pdf');

        });

  }

  componentDidMount() {
    const {
      navigation, offers, getMarkers, getDocsServiceRequest,
    } = this.props;
    const offer = navigation.getParam('Offer');
    offers.data.map((newOffer) => {
      if (newOffer.id === offer.id) {
        this.setState({ offerSpecific: offer, status: offer.statu_id });
      }
    });
    Geolocation.watchPosition(e => this.ads(e.coords));
    getDocsServiceRequest(offer.id);
    this.callLocation();
    if (offer.statu_id === 7) {
      this.setState({ load: true, inTravel: false });
    } else if (offer.statu_id === 8 || offer.statu_id === 6) {
      this.setState({ inTravel: true });
    }
    getMarkers();
  }


  setManifest() {
    const { document } = this.props;
    document.serviceDocuments.forEach((document_data) => {
      if (document_data.document_type === 'manifiesto') {
        this.setState({ manifest: document_data.document });
      }
    });
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
    if (status === 6) {
      this.setState({ lastLat: e.latitude, lastLong: e.longitude });
      this.callLocation();
      const result = this.destinationService(
        e.latitude,
        e.longitude,
        offerSpecific.origin_latitude,
        offerSpecific.origin_longitude,
      );
      if (result < 0.5) {
        const data = {
          service: {
            statu_id: 7,
          },
        };
        putStateOriginTravel(offerSpecific.id, data);
        this.setState({ status: 7, load: true, inTravel: false });

        // this.componentDidMount();
      }
    } else if (status === 8) {
      const result = this.destinationService(
        e.latitude,
        e.longitude,
        offerSpecific.destination_latitude,
        offerSpecific.destination_longitude,
      );
      if (result < 0.5) {
        const data = {
          service: {
            statu_id: 9,
          },
        };
        setTimeout(() => {
          putStateOriginTravel(offerSpecific.id, data);
          this.setState({ status: 9, load: false, inTravel: false });
          // this.componentDidMount();
        }, 1000);
      }
    }
  }


  async onRegisterDoc(source, name) {
    const { registerDocument, profile } = this.props;
    const { offerSpecific } = this.state;

    const user_id = profile.data[0].user.id;
    let photoName = source.fileName;
    if (source.fileName === '' || source.fileName === null) {
      photoName = `img_${source.fileSize}.jpg`;
    }
    const data = new FormData();
    data.append('service_document[document_type]', 'foto');
    data.append('service_document[document]', {
      name: photoName,
      uri: source.uri,
      type: source.type,
    });
    data.append('service_document[user_id]', user_id);
    data.append('service_document[name]', name);
    data.append('service_document[active]', 1);
    data.append('service_document[service_id]', offerSpecific.id);

    await registerDocument(data);
    this.setState({ loadingRegister: true });
  }


  async load(statu_id, name) {
    const { putStateOriginTravel } = this.props;
    const { offerSpecific } = this.state;


    const options = {
      title: 'Vincular Documento',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tomar Foto',
      chooseFromLibraryButtonTitle: 'Elige de la biblioteca',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // user cancelled image picker
        this.setState({ error: 'Tienes 1 o más documentos invalidos' });
      } else if (response.error) {
        // Error imagePicker
        this.setState({ error: 'Tienes 1 o más documentos con formato incorrecto' });
      } else {
        this.onRegisterDoc(response, name);
        const data = {
          service: {
            statu_id,
          },
        };
        putStateOriginTravel(offerSpecific.id, data);
        this.componentDidMount();
        this.setState({ status: statu_id, inTravel: true });
      }
    });
  }

  async confirmTravel() {
    const { offerSpecific, status } = this.state;
    if (status === 7 || offerSpecific.statu_id === 7) {
      await this.load(8, 'Confirmacion de cargue');
    } else if (status === 9 || offerSpecific.statu_id === 9) {
      await this.load(11, 'Confirmacion de descargue');
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

  rating(value) {
    const { postRateServices, profile, navigation } = this.props;
    const { offerSpecific } = this.state;
    this.setState({ modalRating: false, finished: true });
    const data = {
      rate_service: {
        service_point: value,
        service_id: offerSpecific.id,
        user_id: profile.data[0].user.id,
        driver_id: profile.data[0].user.id,
        active: true,
      },
    };
    setTimeout(() => {
      postRateServices(data);
      navigation.navigate('First');
    }, 1000);
  }

  render() {
    const {
      offerSpecific, lastLat, lastLong, waypoints, status, finished, unload,
      modalRating, starCount, load, unLoad, inTravel, manifestSet, manifest,
    } = this.state;
    const { companies, markers, document } = this.props;
    if (document.serviceDocuments && !manifestSet) {
      this.setManifest();
      this.setState({ manifestSet: true });
    }
    if (offerSpecific !== null && waypoints !== undefined && markers.data !== null) {
      markers.data.map(commerce => (
        commerce.longitude = commerce.geolocation.split(',')[0],
        commerce.latitude = commerce.geolocation.split(',')[1]
      ));
      if ((offerSpecific.statu_id === 11 || status === 11) && !modalRating && !finished) {
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
                    arrive={status !== 6 || status !== 11}
                    unLoad={!load}
                    amount="20k"
                    isConfirmLoad={inTravel}
                    company={CompanyInfo.name}
                    actionBtnOk={() => this.confirmTravel()}
                    actionMan={() => this.actionMan()}
                  />
                </WrapperTopCard>
              );
            }
          })}
          <AbsoluteWrapper>
            <TouchableNavigationButtons
              onPress={() => Linking.openURL(`https://www.waze.com/ul?ll=${offerSpecific.destination_latitude}%2C${offerSpecific.destination_longitude}&navigate=yes`)}
            >
              <WrapperImage
                source={{ uri: 'https://web-assets.waze.com/website/assets/packs/media/images/quick_win/icons/icon-waze-e091b33eb21e909bdafd2bcbed317719.png' }}
              />
            </TouchableNavigationButtons>
            <TouchableNavigationButtons
              onPress={() => Linking.openURL(`https://www.google.com/maps/place/${offerSpecific.destination_latitude},${offerSpecific.destination_longitude}`)}
            >
              <WrapperImage
                source={{ uri: 'https://lh3.googleusercontent.com/xmZuOCh0e0NeVpgsKn99K5Amo4PA2r5y078RIrvXY24zLAEwSLSwYvVcwT7zWSv512n4=w300' }}
              />
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
          <EmptyDialog visible={modalRating && !finished}>
            <WrapperModal>
              <BlueText>¿Que tal estuvo tu viaje?</BlueText>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={starCount}
                selectedStar={rating => this.rating(rating)}
                fullStarColor="#0068ff"
              />
            </WrapperModal>
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
  const {
    offers, companies, markers, rateService, profile, document, user,
  } = state;
  return {
    offers,
    companies,
    markers,
    rateService,
    profile,
    document,
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  putStateOriginTravel: (id, data) => dispatch(OffersTypes.putStateInTravelOriginRequest(id, data)),
  getMarkers: (params = {}) => dispatch(MarkersTypes.getMarkersRequest(params)),
  postRateServices: data => dispatch(RateTypes.postRateServiceRequest(data)),
  registerDocument: params => dispatch(DocumentActions.postRegisterDocServiceRequest(params)),
  getDocsServiceRequest: id => dispatch(DocumentActions.getDocsServiceRequest(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartTravel);
