/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';
import {
  Platform, ActivityIndicator, Linking, Modal,
} from 'react-native';
import Toast from 'react-native-tiny-toast';
import { firebase } from '@react-native-firebase/firestore';

import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import Polyline from '@mapbox/polyline';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import analytics from '@react-native-firebase/analytics';
import PDFView from 'react-native-view-pdf';
import OffersTypes from '../../../redux/reducers/OffersRedux';
import MarkersTypes from '../../../redux/reducers/MarkersRedux';
import {
  MainWrapper,
  WrapperButtons,
  WrapperImage,
  TouchableNavigationButtons,
  WrapperAdresses,
  WrapperTopCard,
  BlueText,
  WrapperModal,
  CustomImage,
  WrapperInit,
  WrapperSwipeable,
  BlueTextPDF,
} from './styles';

import AddressesCardMap from '../../../components/AddressesCardMap';
import TopCardTravel from '../../../components/TopCardTravel';
import EmptyDialog from '../../../components/EmptyDialog';
import DocumentActions from '../../../redux/reducers/DocumentRedux';
import images from '../../../icons';
import ButtonGradient from '../../../components/ButtonGradient';
import CompanyActions from '../../../redux/reducers/CompanyRedux';
import PopUpNotification from '../../../components/PopUpNotifications';
import Spinner from '../../../components/Spinner';

import OfferByIdActions from '../../../redux/reducers/OfferByIdRedux';
import Swipeable from '../../../components/Swipeable';
import CardBank from '../../../components/ComponentCardBank';
import { Indicator, WrapperButtonImage } from '../../Summary/style';

const GOOGLE_MAPS_APIKEY = 'AIzaSyD9hrOmzRSUpe9XPMvw78KdHEU5le-CqyE';

class StartTravel extends Component {
  constructor() {
    super();
    this.state = {
      offerSpecific: null,
      lastLat: null,
      lastLong: null,
      inTravel: false,
      manifestSet: true,
      geoID: null,
      feed: true,
      feed1: false,
      feed2: false,
      feed3: false,
      feed4: false,
      feed5: false,
      feed6: false,
      spinner: false,
      isOrigin: true,
      aproxOrigin: false,
      initTravel: false,
      mylocation: null,
      loadingRegister: false,
      loadDidMount: false,
      modalDocuments: false,
      modalPDF: false,
      proofOfPayment: '',
      errorProofOfPayment: false,

    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { offerById } = this.props;

    if ((offerById.data !== null) && (offerById.data !== prevProps.offerById.data)) {
      this.setState({ offerSpecific: offerById.data, loadDidMount: true },
        () => {
          this.reviewStatus();
        });
    }
  }

  componentDidMount(isReload = false) {
    analytics().setCurrentScreen('mis_viajes_viaje_iniciado');
    const {
      navigation, getOfferById, offerById, getDocumentsInTravel,
      getDocumentsTypes, dropDocument,
    } = this.props;
    const offer = navigation.getParam('Offer', null);

    console.log('reload', isReload);
    if (offer !== null) {
      console.log('idOffer', offer.id);
      dropDocument();
      getOfferById(offer.id);
      getDocumentsInTravel(offer.id, 'ServiceDownload');
      getDocumentsTypes('ServiceDownload');
    } else {
      console.log('null data');
    }
  }

  componentWillUnmount() {
    const { geoID } = this.state;
    Geolocation.clearWatch(geoID);
  }

  reviewStatus() {
    const { offerSpecific } = this.state;
    const { getDocsServiceRequest, getCompanies, getMarkers } = this.props;

    this.setState({ status: offerSpecific.statu_id },
      () => {
        console.log('Specific', offerSpecific);

        const geoId = Geolocation.watchPosition(
          e => this.ads(e.coords),
          error => console.log(JSON.stringify(error)),
          {
            enableHighAccuracy: false, timeout: 20000, maximumAge: 0, distanceFilter: 100,
          },
        );
        this.setState({ geoID: geoId });

        getDocsServiceRequest(offerSpecific.id);
        this.callLocation();
        console.log('offer', offerSpecific.statu_id);
        const newState = offerSpecific.statu_id;
        if (newState === 6) {
          this.setState({
            inTravel: false, feed: true,
          });
        } else if (newState === 7) {
          this.setState({
            inTravel: false, feed: false, feed2: true, aproxOrigin: true,
          });
        } else if (newState === 17) {
          this.setState({
            inTravel: true,
            isOrigin: false,
            feed: false,
            feed3: true,
            initTravel: true,
            aproxOrigin: false,
          });
        } else if (newState === 8) {
          this.setState({
            inTravel: true, isOrigin: false, feed4: true, feed: false,
          });
        } else if (newState === 18) {
          this.setState({
            inTravel: true, isOrigin: false, feed5: true, feed: false, aproxOrigin: true,
          });
        } else if (newState === 9) {
          this.setState({
            inTravel: true, isOrigin: false, feed6: true, feed: false, aproxOrigin: true,
          });
        } else if (newState === 19) {
          console.log('fin status:19');
          this.setState({
            inTravel: true, isOrigin: false, feed: false,
          });
        } else if (newState === 11) {
          this.onResetTravel(offerSpecific.id);
        }
        getCompanies();
        // getMarkers();
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

  onResetTravel(idOffer) {
    const { putStateOriginTravel } = this.props;

    const data = {
      service: {
        statu_id: 16,
      },
    };

    setTimeout(() => {
      putStateOriginTravel(idOffer, data);
      alert('reset ok');
    }, 1000);
  }

  onInitialTravel() {
    const { offerSpecific } = this.state;
    const { putStateOriginTravel } = this.props;

    const data = {
      service: {
        statu_id: 8,
      },
    };
    putStateOriginTravel(offerSpecific.id, data);
    const sms = `El camionero ha iniciado Viaje en curso hacia el punto de descargue (${offerSpecific.destination})`;
    this.sendNotification(offerSpecific, 'Viaje en curso', sms);

    setTimeout(() => {
      this.setState({
        status: 8, inTravel: true, feed4: true, initTravel: false,
      });
    }, 1000);
  }

  async getDirections(startLoc, destinationLoc) {
    const { offerSpecific, status, isOrigin } = this.state;
    let lat_des = offerSpecific.origin_latitude;
    let lng_des = offerSpecific.origin_longitude;
    if (!isOrigin) {
      lat_des = offerSpecific.destination_latitude;
      lng_des = offerSpecific.destination_longitude;
    }

    const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc},${destinationLoc}&destination=${lat_des},${lng_des}&mode=DRIVING&key=${GOOGLE_MAPS_APIKEY}`);
    const respJson = await resp.json();
    console.log(respJson);
    const points = respJson.routes[0].legs[0].steps;
    const locationStart = respJson.routes[0].legs[0].start_address;
    const n = locationStart.search('Colombia');
    const locationShort = locationStart.substr(0, n - 2);

    const coords = [];
    points.forEach((point) => {
      const decodedPoints = Polyline.decode(point.polyline.points);
      decodedPoints.forEach((dec) => {
        coords.push({
          latitude: dec[0],
          longitude: dec[1],
        });
      });
    });
    this.setState({ coords, mylocation: locationShort });

    return coords;
  }

  actionMan() {
    const { getDocsServiceRequest, navigation } = this.props;
    const offer = navigation.getParam('Offer');
    getDocsServiceRequest(offer.id);
    this.setState({ manifestSet: false, spinner: true });
    setTimeout(() => {
      this.setState({ spinner: false });
    }, 10000);
  }

  downloadMan() {
    const { document } = this.props;
    let man = '';
    document.serviceDocuments.forEach((document_data) => {
      if (document_data.document_type_id === 36) {
        analytics().logEvent('boton_viaje_iniciado_ver_manifiesto');
        man = encodeURI(document_data.document);
      }
    });

    this.setState({ manifestSet: true });
    if (man === '') {
      this.setState({ nonManifest: true });
    } else {
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
        .fetch('GET', man)
        .then((resp) => {
          if (Platform.OS === 'ios') RNFetchBlob.ios.openDocument(resp.path());
          if (Platform.OS === 'android') android.actionViewIntent(resp.path(), 'application/pdf');
        }).catch((e) => {
          console.log(e);
        });
    }
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

  ads(e) {
    const { offerSpecific, status } = this.state;
    const { putStateOriginTravel } = this.props;
    this.setState({ lastLat: e.latitude, lastLong: e.longitude });
    this.callLocation();
    console.log('ads', offerSpecific);
    if (status === 6 || status === 16) {
      const result = this.destinationService(
        e.latitude,
        e.longitude,
        offerSpecific.origin_latitude,
        offerSpecific.origin_longitude,
      );
      console.log('resultgeo-6', result);
      if (result < 0.1) {
        this.setState({
          inTravel: false, aproxOrigin: true, feed: false, feed1: true,
        });
      } else {
        this.setState({ aproxOrigin: false, feed: true, feed1: false });
      }
    } else if (status === 8) {
      const result = this.destinationService(
        e.latitude,
        e.longitude,
        offerSpecific.destination_latitude,
        offerSpecific.destination_longitude,
      );
      console.log('resultgeo-8', result);
      if (result < 0.1) {
        const data = {
          service: {
            statu_id: 18,
          },
        };
        setTimeout(() => {
          putStateOriginTravel(offerSpecific.id, data);
          this.setState({
            status: 18, inTravel: true, feed: false, feed5: true, aproxOrigin: true,
          });
          // this.componentDidMount();
        }, 1000);
      } else {
        this.setState({ aproxOrigin: false, feed: false, feed5: false });
      }
    }
  }

  sendNotification(service, subject, msg) {
    console.log(`firebase add notifications_user_${service.user_id.toString()}`, msg);

    firebase.firestore().collection(`notifications_user_${service.user_id.toString()}`).add({
      message: msg,
      title: subject,
      created_at: new Date(),
      additional_data: {
        service_id: service.id,
        notification_type: 'trip_detail',
      },
    });
  }

  async onRegisterDoc(source, name, type_doc) {
    const { registerDocument, profile } = this.props;
    const { offerSpecific } = this.state;

    const user_id = profile.data[0].user.id;
    let photoName = source.fileName;
    if (source.fileName === '' || source.fileName === null) {
      photoName = `img_${source.fileSize}.jpg`;
    }
    const data = new FormData();
    data.append('service_document[document_type_id]', type_doc);
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
    this.sendNotification(offerSpecific, 'Nueva Evidencia registrada', `Se registro la evidencia(${name}) en el viaje: ${offerSpecific.name} `);
    this.setState({ loadingRegister: true });
  }


  async load(statu_id, name, type_doc) {
    const { putStateOriginTravel } = this.props;
    const { offerSpecific } = this.state;

    const options = {
      title: 'Vincular Documento',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tomar Foto',
      chooseFromLibraryButtonTitle: 'Elige de la biblioteca',
      customButtons: [],
      tintColor: '#010935',
      quality: 0.4,
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
        this.onRegisterDoc(response, name, type_doc);
        const data = {
          service: {
            statu_id,
          },
        };
        putStateOriginTravel(offerSpecific.id, data);
        this.setState({ status: statu_id, inTravel: true });
        // this.componentDidMount(true);
      }
    });
  }

  async confirmTravel() {
    const { offerSpecific, status, aproxOrigin } = this.state;
    console.log(status);
    if ((status === 6 || status === 16) && aproxOrigin) {
      analytics().logEvent('boton_iniciar_cargue');
      await this.load(7, 'Confirmacion Inicio de cargue', 13);
    } else if (status === 7) {
      analytics().logEvent('boton_finalizar_cargue');
      await this.load(17, 'Confirmacion Finalización de cargue', 14);
    } else if (status === 18) {
      analytics().logEvent('boton_iniciar_descargue');
      await this.load(9, 'Confirmacion Inicio de descargue', 15);
    } else if (status === 9) {
      analytics().logEvent('boton_finalizar_descargue');
      await this.load(19, 'Confirmacion de descargue', 16);
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

  modalBack() {
    this.setState({ nonManifest: false });
  }

  onLinking(event, type) {
    analytics().logEvent(`boton_${type}`);
    Linking.openURL(event);
  }

  openDocument(value) {
    this.setState({ proofOfPayment: value, modalPDF: true });
  }

  render() {
    const {
      offerSpecific, lastLat, lastLong, waypoints, status, inTravel, manifestSet,
      nonManifest, feed, feed1, feed2, feed3, feed4, feed5, feed6,
      spinner, isOrigin, aproxOrigin, initTravel, mylocation, loadingRegister,
      loadDidMount, modalDocuments, modalPDF, proofOfPayment, errorProofOfPayment,
    } = this.state;

    const {
      companies, markers, document, navigation,
    } = this.props;

    let listDocuments = [];
    let realDocuments = new Map();
    let documentCards = [];

    if (document && document.listTypes) {
      document.listTypes.map((type) => {
        if (document.serviceDocuments && (document.serviceDocuments.length > 0)) {
          document.serviceDocuments.map((doc) => {
            if (doc.document_type_id === type.id) {
              listDocuments.push(doc);
            } else {
              realDocuments.set(type.id, type);
            }
          });
        } else {
          realDocuments.set(type.id, type);
        }
      });

      listDocuments.map((doc) => {
        if (realDocuments.get(doc.document_type_id)) {
          realDocuments.set(doc.document_type_id, doc);
        }
      });

      realDocuments.forEach((doc, key) => {
        documentCards.push(
          <CardBank
            subTitle={doc.name || doc.document_type.name}
            press={() => {
              if (doc.document) {
                this.openDocument(doc.document);
              }
            }}
            title="Documento:"
            disable={doc.document === undefined}
          />
        );
      });
    }

    if (loadingRegister) {
      if (document.error && !document.fetching) {
        // error api
        console.log('error API');
      }
      if (document.status && !document.fetching) {
        if (document.status && !document.unprocess) {
          // register ok
          this.setState({ loadingRegister: false });
          if (status === 19) {
            this.sendNotification(offerSpecific, 'Viaje terminado', `El viaje '${offerSpecific.name}' fue finalizado. `);
            setTimeout(() => {
              navigation.navigate('SummaryTravels', { offer: offerSpecific });
            }, 200);
          } else {
            this.componentDidMount(true);
          }
        } else if (loadingRegister && document.unprocess) {
          console.log('fail upload');
        }
      }
    }

    if (offerSpecific !== null
      && waypoints !== undefined
      && companies.data !== null
    ) {
      return (
        <MainWrapper>
          <Modal visible={modalPDF}>
            <Indicator
              size="large"
              color="#0000ff"
            />
            <BlueTextPDF>Documento</BlueTextPDF>
            <PDFView
              fadeInDuration={0}
              style={{ flex: 1, marginTop: 10, zIndex: 100 }}
              resource={proofOfPayment}
              resourceType="url"
              onLoad={resourceType => console.log(`PDF rendered from ${resourceType}`)}
              onError={() => this.setState({ errorProofOfPayment: true })}
            />
            <WrapperButtonImage>
              <ButtonGradient press={() => this.setState({ modalPDF: false })} content="Volver" disabled={false} />
            </WrapperButtonImage>
          </Modal>
          {errorProofOfPayment && (
          <PopUpNotification
            onTouchOutside={() => this.setState({ errorProofOfPayment: false })}
            mainText="Algo falló"
            subText="Intentalo de nuevo más tarde"
          />
          )}
          <Spinner view={spinner} />
          {feed && !feed1 && !feed2 && !feed3 && !feed4 && !feed5 && !feed6 && !aproxOrigin && (
            <PopUpNotification
              onTouchOutside={() => this.setState({ feed: false })}
              mainText="¡Atención!"
              subText="Acabas de iniciar camino a cargue, ahora debes llegar al origen del viaje y cargar"
            />
          )}
          {feed1 && (
            <PopUpNotification
              onTouchOutside={() => this.setState({ feed1: false })}
              mainText="¡Atención!"
              subText="Acabas de llegar al origen del viaje ahora debes cargar y confirmar el inicio de cargue"
            />
          )}
          {feed2 && (
            <PopUpNotification
              onTouchOutside={() => this.setState({ feed2: false })}
              mainText="¡Atención!"
              subText="Ahora debes evidenciar la finalización del cargue"
            />
          )}
          {feed3 && (
            <PopUpNotification
              onTouchOutside={() => this.setState({ feed3: false })}
              mainText="¡Atención!"
              subText="Acabas de confirmar que cargaste ahora debes dirigirte al destino."
            />
          )}
          {feed4 && (
            <PopUpNotification
              onTouchOutside={() => this.setState({ feed4: false })}
              mainText="¡Atención!"
              subText="Acabas de Iniciar viaje en curso, dirigete al destino"
            />
          )}
          {feed5 && (
            <PopUpNotification
              onTouchOutside={() => this.setState({ feed5: false })}
              mainText="¡Atención!"
              subText="Acabas de llegar al destino del viaje ahora debes descargar y confirmar el inicio del descargue"
            />
          )}
          {feed6 && (
            <PopUpNotification
              onTouchOutside={() => this.setState({ feed6: false })}
              mainText="¡Atención!"
              subText="Ahora debes evidenciar la finalización del descargue"
            />
          )}

          <EmptyDialog visible={nonManifest}>
            <WrapperModal>
              <BlueText>No existe manifiesto</BlueText>
              <ButtonGradient press={() => this.modalBack()} content="Volver" disabled={false} />
            </WrapperModal>
          </EmptyDialog>
          <MapView
            initialRegion={{
              latitude: lastLat,
              longitude: lastLong,
              latitudeDelta: 0.10,
              longitudeDelta: 0.10,
            }}
            followsUserLocation
            showsUserLocation
            showsIndoorLevelPicker
            style={{ height: '100%', width: '100%' }}
          >
            {/* <MapView.Marker
              coordinate={{
                latitude: lastLat,
                longitude: lastLong,
              }}
            >
              <CustomImage source={images.markerLocation} />
            </MapView.Marker> */}
            <MapView.Marker
              coordinate={{
                latitude: isOrigin ? Number(offerSpecific.origin_latitude) : Number(offerSpecific.destination_latitude),
                longitude: isOrigin ? Number(offerSpecific.origin_longitude) : Number(offerSpecific.destination_longitude),
              }}
              title={isOrigin ? 'Origen carga' : 'Destino carga'}
            >
              <CustomImage source={isOrigin ? images.markerOrigin : images.markerDestination} />
            </MapView.Marker>
            <MapView.Polyline coordinates={waypoints} strokeWidth={4} strokeColor="#007aff" />
          </MapView>
          {companies.data.map((CompanyInfo) => {
            if (offerSpecific.company_id === CompanyInfo.id) {
              return (
                <WrapperTopCard>
                  <TopCardTravel
                    arrive={aproxOrigin || inTravel}
                    status={status}
                    aprox={aproxOrigin}
                    actionBtnOk={() => this.confirmTravel()}
                    touchableAction={() => this.setState({ modalDocuments: true })}
                  />
                </WrapperTopCard>
              );
            }
          })}
          { initTravel ? (
            <WrapperInit>
              <ButtonGradient
                content="Iniciar Viaje"
                press={() => this.onInitialTravel()}
              />
            </WrapperInit>
          ) : null }
          <WrapperAdresses>
            <WrapperButtons>
              <TouchableNavigationButtons
                onPress={() => this.onLinking(`https://www.waze.com/ul?ll=${isOrigin ? offerSpecific.origin_latitude : offerSpecific.destination_latitude}%2C${isOrigin ? offerSpecific.origin_longitude : offerSpecific.destination_longitude}&navigate=yes`, 'waze')}
              >
                <WrapperImage
                  source={{ uri: 'https://web-assets.waze.com/website/assets/packs/media/images/quick_win/icons/icon-waze-e091b33eb21e909bdafd2bcbed317719.png' }}
                />
              </TouchableNavigationButtons>
              <TouchableNavigationButtons
                onPress={() => this.onLinking(`https://www.google.com/maps/place/${isOrigin ? offerSpecific.origin_latitude : offerSpecific.destination_latitude},${isOrigin ? offerSpecific.origin_longitude : offerSpecific.destination_longitude}`, 'google_maps')}
              >
                <WrapperImage
                  source={{ uri: 'https://lh3.googleusercontent.com/xmZuOCh0e0NeVpgsKn99K5Amo4PA2r5y078RIrvXY24zLAEwSLSwYvVcwT7zWSv512n4=w300' }}
                />
              </TouchableNavigationButtons>
            </WrapperButtons>
            <AddressesCardMap
              nameCompany="Mi ubicación"
              firstAddress={mylocation !== null ? mylocation : ''}
              iconOrigin={images.markerLocation}
              iconDestination={isOrigin ? images.markerOrigin : images.markerDestination}
              nameAddress={isOrigin ? offerSpecific.origin : offerSpecific.destination}
              secondAddress={isOrigin ? offerSpecific.origin_address : offerSpecific.destination_address}
            />
          </WrapperAdresses>
          <Toast
            visible={loadingRegister}
            position={0}
            loading
            shadow
            animation
          >
            Subiendo Foto...
          </Toast>
          <Swipeable
            visible={modalDocuments}
            onClose={() => this.setState({ modalDocuments: false })}
            onPressClose={() => this.setState({ modalDocuments: false })}
            title="Documentos"
          >
            <WrapperSwipeable>
              { documentCards }
            </WrapperSwipeable>
          </Swipeable>
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
    offers, companies, markers, profile, document, user, offerById,
  } = state;
  return {
    offers,
    companies,
    markers,
    profile,
    document,
    user,
    offerById,
  };
};

const mapDispatchToProps = dispatch => ({
  putStateOriginTravel: (id, data) => dispatch(OffersTypes.putStateInTravelOriginRequest(id, data)),
  getMarkers: (params = {}) => dispatch(MarkersTypes.getMarkersRequest(params)),
  registerDocument: params => dispatch(DocumentActions.postRegisterDocServiceRequest(params)),
  getDocumentsTypes: category => dispatch(DocumentActions.getDocsTypesRequest(category)),
  getDocumentsInTravel:
      (id, category) => dispatch(DocumentActions.getDocsInTravelRequest(id, category)),
  getDocsServiceRequest: id => dispatch(DocumentActions.getDocsServiceRequest(id)),
  getCompanies: params => dispatch(CompanyActions.getCompaniesRequest(params)),
  getOfferById: id => dispatch(OfferByIdActions.getOfferByIdRequest(id)),
  dropDocument: params => dispatch(DocumentActions.dropInitialState(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartTravel);
