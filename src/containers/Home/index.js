/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';
import { Linking, Dimensions, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import analytics from '@react-native-firebase/analytics';
import PickerModal from 'react-native-picker-modal-view';
import {
  MainWrapper, NormalText, WrapperSwipeable, WrapperContent, CustomImage,
} from './style';
import SwipeableHome from '../../components/SwipeableHome';
import CardInfoStad from '../../components/CardInfoStad';
import ProfileActions from '../../redux/reducers/ProfileRedux';
import OffersActions from '../../redux/reducers/OffersRedux';
import TopActions from '../../redux/reducers/TopUsersRedux';
import images from '../../icons';
import {
  ContentForm, ContentRange,
  ContentSlider, GrayText,
  RowContent, RowInput,
  TextBlack, TextTouch, WrapperButtonGradient, WrapperButtonsBottom, WrapperInputs, WrapperSpecific,
  WrapperSwipe, WrapperTouch,
} from '../HomeOffers/style';
import InputSlider from '../../components/InputSlider';
import Input from '../../components/GeneralInput';
import ButtonGradient from '../../components/ButtonGradient';
import Swipeable from '../../components/Swipeable';
import VehiclesActions from '../../redux/reducers/VehicleRedux';
import DestinationsActions from '../../redux/reducers/DestinationsRedux';
import FilterOffers from '../../redux/reducers/FilterOffersRedux';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      location: {
        latitude: 4.624335,
        longitude: -74.063644,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5 * (screenWidth / screenHeight),
      },
      name: '',
      geoID: null,
      modalSearch: false,
      multiSliderValue: [150000, 2300000],
      labelOrigin: '',
      labelDestination: '',
      labelVehicle: '',
      idVehicle: null,
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('home_cargapp');
    const {
      getProfile, getsOffers, getTopRanking, user, getDestinations, getVehicles,
    } = this.props;
    getsOffers();
    getProfile();
    getTopRanking();
    getVehicles();
    getDestinations();
    try {
      this.geolocation();
    } catch (error) {
      console.log(error);
      Geolocation.requestAuthorization();
    }
    
    const that = this;
    if (!this.didFocusListener) {
      this.didFocusListener = this.props.navigation.addListener(
        'didFocus',
        () => {
          if (that.state.unmount) {
            this.setState({ unmount: false });
            this.componentDidMount();
          }
        },
      );
    }
    if (!this.didBlurListener) {
      this.didBlurListener = this.props.navigation.addListener(
        'didBlur',
        () => {
          that.setState({ unmount: true });
          this.componentWillUnmount();
        },
      );
    }
    Linking.getInitialURL().then((url) => {
      this.navigate(url);
    });
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    const { geoID } = this.state;
    // Geolocation.clearWatch(geoID);
  }

  onNavigate(screen) {
    const { navigation } = this.props;
    navigation.navigate(screen);
    if (screen === 'Second') {
      analytics().logEvent('boton_todos');
    } else if (screen === 'filtro') {
      this.setState({ modalSearch: true });
      analytics().logEvent('boton_filtrar');
    } else if (screen === 'cerca') {
      analytics().logEvent('boton_cerca_de_ti');
    }
  }

  onHideModal() {
    analytics().logEvent('boton_entendido');
    this.setState({ modalSearch: false });
  }

  onSelected(selected, type) {
    if (selected.Name) {
      if (selected.Name.slice(0, 11) === '* Cualquier') {
        if (type === 'origin') {
          this.setState({ labelOrigin: '' });
        }
        if (type === 'destin') {
          this.setState({ labelDestination: '' });
        }
        if (type === 'vehicle') {
          this.setState({ labelVehicle: '', idVehicle: null });
        }
      } else {
        if (type === 'origin') {
          this.setState({ labelOrigin: selected.Name });
        }
        if (type === 'destin') {
          this.setState({ labelDestination: selected.Name });
        }
        if (type === 'vehicle') {
          this.setState({ labelVehicle: selected.Name, idVehicle: selected.id });
        }
      }
    }
    return selected;
  }

  getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return getActiveRouteName(route);
    }
    return route.routeName;
  }

  geolocation() {
    console.log('geolocation');
    Geolocation.getCurrentPosition((position) => {
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      };
      this.setState({ location: region });
    },
    error => console.log(error));
    // this.setState({ geoID: geoId });
  }

  handleOpenURL = event => {
    this.navigate(event.url);
  }

  navigate = url => {
    const { navigation } = this.props;
    if (
      url !== 'cargapplite://'
      && url !== 'exp://yx-zvg.cargapp.cargapp-lite.exp.direct:80'
    ) {
      let idItem = url.replace(/.*?:\/\/cargapp.app.link\/psicLa1y7Y/g, '');
      idItem = idItem.replace(/\?offer=/g, '');
      console.log(idItem);
      if (idItem !== '') {
        navigation.navigate('ApplyTravels', { idShare: idItem, share: true });
      }
    }
  }

  searchByFilter() {
    const {
      multiSliderValue,
      labelDestination,
      labelOrigin,
      idVehicle,
    } = this.state;

    const { getFilterOffers, navigation } = this.props;
    const data = {
      startPrice: multiSliderValue[0],
      endPrice: multiSliderValue[1],
      vehicle: idVehicle,
      origin: labelOrigin.length > 2 ? labelOrigin : null,
      destination: labelDestination.length > 2 ? labelDestination : null,
    };
    getFilterOffers(data);
    this.setState({ modalSearch: false });
    setTimeout(() => {
      navigation.navigate('Filter');
    }, 1000);
  }

  multiSliderValuesChange(values) {
    this.setState({
      multiSliderValue: values,
    });
  }

  render() {
    const {
      profile, ranking, vehicles, destinations,
    } = this.props;
    const {
      location,
      name,
      modalSearch,
      multiSliderValue,
      labelDestination,
      labelOrigin,
      labelVehicle,
    } = this.state;

    const dataPickOrigin = [{ Name: '* Cualquier Origen' }];
    const dataPickDesti = [{ Name: '* Cualquier Destino' }];
    const dataPickVehi = [{ Name: '* Cualquier Vehículo' }];

    if (
      location.latitudeDelta !== 0.5
      && profile.data !== null
      && vehicles.data
      && destinations.data.origins !== null
    ) {
      destinations.data.origins.map((originData) => {
        dataPickOrigin.push({ Name: originData.name });
      });
      destinations.data.destinations.map((destinationData) => {
        dataPickDesti.push({ Name: destinationData.name });
      });
      vehicles.data.map((vehiclesData) => {
        dataPickVehi.push({ Name: vehiclesData.name, id: vehiclesData.id });
      });
      const vehicle_data = {};
      vehicles.data.forEach((vehicle) => {
        vehicle_data[vehicle.id] = vehicle.name;
      });

      profile.data.map((data) => {
        if (name === '') {
          this.setState({ name: data.profile.firt_name });
        }
      });
      return (
        <MainWrapper>
          <MapView
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: location.latitudeDelta,
              longitudeDelta: location.longitudeDelta,
            }}
            followsUserLocation
            showsIndoorLevelPicker
            toolbarEnabled
            showsMyLocationButton
            showsTraffic
            showsCompass
            style={{ height: '100%', width: '100%' }}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            >
              <CustomImage source={images.truck} />
            </MapView.Marker>
          </MapView>
          <WrapperContent>
            {ranking.topme !== null ? (
              <CardInfoStad
                press={() => this.onNavigate('Points')}
                title={name !== '' ? `¡Hola ${name}!` : '¡Hola!'}
                valueKm={ranking.topme.kilometres}
                textKm="Kms recorridos"
                valuePoint={ranking.topme.my_points}
                textPoint="Puntos Acumulados"
              />
            ) : (
              <CardInfoStad
                title={name !== '' ? `¡Hola ${name}!` : '¡Hola!'}
                valueKm="-"
                textKm="Kms recorridos"
                valuePoint="-"
                textPoint="Puntos Acumulados"
              />
            )}
            <NormalText>Buscar viajes disponibles</NormalText>
            <WrapperSwipeable>
              <SwipeableHome text="Todos" press={() => this.onNavigate('Second')} />
              <SwipeableHome text="Buscar viajes" press={() => this.onNavigate('filtro')} />
              <SwipeableHome text="Cerca a tí" press={() => this.onNavigate('cerca')} />
            </WrapperSwipeable>
          </WrapperContent>
          <Swipeable
            visible={modalSearch}
            onClose={() => this.onHideModal()}
            onPressClose={() => this.onHideModal()}
            title="Búsqueda"
          >
            <WrapperSwipe>
              <RowContent>
                <TextBlack>Flete</TextBlack>
              </RowContent>
              <ContentSlider>
                <InputSlider
                  minVal={0}
                  maxVal={5200000}
                  step={100000}
                  multiValue={multiSliderValue}
                  onValuesChange={values => this.multiSliderValuesChange(values)}
                />
              </ContentSlider>
              <ContentForm>
                <ContentRange>
                  <RowInput>
                    <Input title="Valor mínimo" value={'$'.concat('', multiSliderValue[0].toString())} editable={false} />
                  </RowInput>
                  <RowInput>
                    <Input title="Valor máximo" value={'$'.concat('', multiSliderValue[1].toString())} editable={false} />
                  </RowInput>
                </ContentRange>
                <WrapperInputs>
                  <WrapperSpecific>
                    <GrayText>Origen</GrayText>
                    <PickerModal
                      renderSelectView={(disabled, selected, showModal) => (
                        <WrapperTouch onPress={showModal}>
                          <TextTouch>
                            {!labelOrigin ? 'Todos los origenes...' : labelOrigin}
                          </TextTouch>
                        </WrapperTouch>
                      )}
                      onSelected={data => this.onSelected(data, 'origin')}
                      items={dataPickOrigin}
                      sortingLanguage="es"
                      showToTopButton
                      selected={labelOrigin}
                      showAlphabeticalIndex
                      autoGenerateAlphabeticalIndex
                      selectPlaceholderText="Seleccione origen..."
                      onEndReached={() => console.log('Lista terminada...')}
                      searchPlaceholderText="Buscar..."
                      requireSelection={false}
                      autoSort
                      SearchInputProps={{ borderRadius: 10 }}
                    />
                  </WrapperSpecific>
                  <WrapperSpecific>
                    <GrayText>Destino</GrayText>
                    <PickerModal
                      renderSelectView={(disabled, selected, showModal) => (
                        <WrapperTouch onPress={showModal}>
                          <TextTouch>
                            {!labelDestination
                              ? 'Todos los destinos...'
                              : labelDestination}
                          </TextTouch>
                        </WrapperTouch>
                      )}
                      onSelected={data => this.onSelected(data, 'destin')}
                      items={dataPickDesti}
                      sortingLanguage="es"
                      showToTopButton
                      selected={labelDestination}
                      showAlphabeticalIndex
                      autoGenerateAlphabeticalIndex
                      selectPlaceholderText="Seleccione destino..."
                      onEndReached={() => console.log('Lista terminada...')}
                      searchPlaceholderText="Buscar..."
                      requireSelection={false}
                      autoSort
                    />
                  </WrapperSpecific>
                  <WrapperSpecific>
                    <GrayText>Vehículo</GrayText>
                    <PickerModal
                      renderSelectView={(disabled, selected, showModal) => (
                        <WrapperTouch onPress={showModal}>
                          <TextTouch>
                            {!labelVehicle
                              ? 'Todos los vehículos...'
                              : labelVehicle}
                          </TextTouch>
                        </WrapperTouch>
                      )}
                      onSelected={data => this.onSelected(data, 'vehicle')}
                      items={dataPickVehi}
                      sortingLanguage="es"
                      showToTopButton
                      selected={labelVehicle}
                      showAlphabeticalIndex
                      autoGenerateAlphabeticalIndex
                      selectPlaceholderText="Seleccione vehículo..."
                      onEndReached={() => console.log('Lista terminada...')}
                      searchPlaceholderText="Buscar..."
                      requireSelection={false}
                      autoSort
                    />
                  </WrapperSpecific>
                </WrapperInputs>
              </ContentForm>
              <WrapperButtonsBottom>
                <WrapperButtonGradient>
                  <ButtonGradient content="Buscar" press={() => this.searchByFilter()} />
                </WrapperButtonGradient>
              </WrapperButtonsBottom>
            </WrapperSwipe>
          </Swipeable>
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
  const {
    offers,
    profile,
    geolocation,
    user,
    ranking,
    vehicles,
    destinations,
    filterOffers,
  } = state;
  return {
    offers,
    profile,
    geolocation,
    user,
    ranking,
    vehicles,
    destinations,
    filterOffers,
  };
};

const mapDispatchToProps = dispatch => ({
  getProfile: params => dispatch(ProfileActions.getProfileRequest(params)),
  getsOffers: params => dispatch(OffersActions.getOffersRequest(params)),
  getTopRanking: params => dispatch(TopActions.getTopUsersRequest(params)),
  getVehicles: params => dispatch(VehiclesActions.getVehicleRequest(params)),
  getFilterOffers: data => dispatch(FilterOffers.getOffersByFilterRequest(data)),
  getDestinations: data => dispatch(DestinationsActions.getDestinationsRequest(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
