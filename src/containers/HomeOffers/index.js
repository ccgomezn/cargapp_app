/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable no-const-assign */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View } from 'native-base';
import { ActivityIndicator, Share } from 'react-native';
import { connect } from 'react-redux';
import PickerModal from 'react-native-picker-modal-view';
import analytics from '@react-native-firebase/analytics';
import { formatPrice } from '../../helpers/Utils.js';
import {
  MainView, MainWrapper, ContentView, TextBlack, ContentBlock,
  ContentFilter, ContentOffer,
  WrapperSwipe, RowContent, ContentSlider, ContentForm,
  ContentRange, RowInput, WrapperInputs,
  WrapperButtonsBottom, WrapperButtonGradient, WrapperTouch,
  TextTouch, WrapperSpecific, GrayText,
} from './style';
import WhiteCardTravels from '../../components/WhiteCardTravels';
import ButtonLink from '../../components/ButtonLink';
import ButtonGradient from '../../components/ButtonGradient';
import Swipeable from '../../components/Swipeable';
import Input from '../../components/GeneralInput';
import InputSlider from '../../components/InputSlider';

import EmptyDialog from '../../components/EmptyDialog';
import CardPermissions from '../../components/CardPermissions';
import ParametersActions from '../../redux/reducers/ParametersRedux';

import {
  ContentDialog,
  MainWrapperDialog,
  TextGray,
  TitleBlack,
} from '../Profile/style';

// action - reducers
import OffersActions from '../../redux/reducers/OffersRedux';
import ProfileActions from '../../redux/reducers/ProfileRedux';
import VehiclesActions from '../../redux/reducers/VehicleRedux';
import FilterOffers from '../../redux/reducers/FilterOffersRedux';
import DestinationsActions from '../../redux/reducers/DestinationsRedux';
import PermissionsActions from '../../redux/reducers/PermissionsRedux';

const itemList = [
  {
    label: 'Perfil',
    url: 'ScreenProfile',
  },
  {
    label: 'Documentos',
    url: 'DocumentsAccount',
  },
  {
    label: 'Mis Vehículos',
    url: 'ScreenVehicle',
  },
  {
    label: '¿Dónde te pagamos?',
    url: 'BankAccount',
  },
];

class HomeOffers extends Component {
  constructor() {
    super();
    this.state = {
      modalSearch: false,
      multiSliderValue: [150000, 2300000],
      labelOrigin: '',
      labelDestination: '',
      labelVehicle: '',
      idVehicle: null,
      callMine: false,
      modalPermission: false,
      fetch: false,
      listview: ['profiles', 'documents', 'vehicles', 'bank_accounts'],
      modalFromHome: true,
      share: false,
      filterModal: false,
      validation: true,
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('viajes');
    const {
      getsOffers,
      getVehicles,
      getProfile,
      getPermission,
      getDestinations,
      getMyOffers,
      profile,
      getparameters,
    } = this.props;

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
          that.setState({ unmount: true, filterModal: false });
          this.componentWillUnmount();
        },
      );
    }
    this.setState({ callMine: false });
    getsOffers();
    getVehicles();
    getProfile();
    getPermission();
    getDestinations();
    getMyOffers(profile.data[0].user.id);
    getparameters('STATUS_TRAVEL');
  }

  componentWillUnmount() {
    const { dropOffersState } = this.props;
    // dropOffersState();
    this.setState({ modalPermission: false });
  }

  onPressFilter() {
    this.setState({ modalSearch: true, modalFromHome: false });
  }

  onClickShare(offers) {
    Share.share(
      {
        message:
          `Este viaje de carga te puede interesar:\n\nhttps://cargapp.app.link/psicLa1y7Y?offer=${
            offers.id}`,
        url: `https://cargapp.app.link/psicLa1y7Y?offer=${offers.id}`,
        title: 'Viaje Cargapp',
      },
      {
        // Android only:
        dialogTitle: 'Compartir Viaje',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  }

  onNavigate(nameView) {
    analytics().logEvent('boton_diligenciar');
    const { navigate } = this.props.navigation;
    this.setState({ modalPermission: false });
    setTimeout(() => {
      navigate(nameView);
    }, 1000);
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

  onPressTravel(services) {
    const { navigation } = this.props;
    navigation.navigate('ApplyTravels', { dataOffer: services });
    analytics().logEvent('boton_ver_mas');
  }

  getMineOffers() {
    const {
      getMyOffersPostulation, profile,
    } = this.props;

    getMyOffersPostulation(profile.data[0].user.id);
  }

  missingViews(list) {
    const { listview } = this.state;
    return (
      <View style={{ flexDirection: 'column' }}>
        {list.map(pem => (
          (listview.includes(pem.name)) ? (
            <CardPermissions
              label={itemList[listview.lastIndexOf(pem.name)].label}
              permission={pem.permission}
              textfail="Diligenciar"
              textCorrect="OK"
              press={() => this.onNavigate(itemList[listview.lastIndexOf(pem.name)].url)}
            />
          ) : null
        ))
        }
        <WrapperButtonsBottom style={{ marginTop: 10 }}>
          <ButtonGradient content="Hazlo después" press={() => this.OnHideModal()} />
        </WrapperButtonsBottom>
      </View>
    );
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

  // eslint-disable-next-line react/sort-comp
  OnHideModal() {
    analytics().logEvent('boton_entendido');
    this.setState({ modalSearch: false, modalPermission: false });
  }

  multiSliderValuesChange(values) {
    this.setState({
      multiSliderValue: values,
    });
  }

  render() {
    const {
      modalSearch, multiSliderValue, labelDestination, labelOrigin,
      labelVehicle, callMine, modalPermission,
      listview, fetch, modalFromHome, filterModal, validation,
    } = this.state;
    const {
      driver, offers, vehicles, navigation,
      profile, permissions, destinations, parameters,
    } = this.props;
    const dataPickOrigin = [{ Name: '* Cualquier Origen' }];
    const dataPickDesti = [{ Name: '* Cualquier Destino' }];
    const dataPickVehi = [{ Name: '* Cualquier Vehículo' }];
    if (offers.data && !callMine && profile.data) {
      this.getMineOffers();
      this.setState({ callMine: true });
    }

    if (permissions.data && !permissions.fetching && !fetch) {
      // validate permisson
      let perm = 0;
      console.log(permissions);
      permissions.data.map((pem) => {
        if (listview.includes(pem.name)) {
          if (!pem.permission) {
            perm++;
          }
        }
      });
      if (perm >= 1 && validation) {
        analytics().setCurrentScreen('datos_faltantes');
        this.setState({ modalPermission: true });
      }
      this.setState({ fetch: true });
    }
    if (
      offers.data
      && offers.services
      && vehicles.data
      && destinations.data.origins !== null
      && !offers.fetching
      && permissions.data !== null
      && !permissions.fetching
      && parameters.data !== null
      && !parameters.fetching
      // && !fetchinit
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
      const mine_offers = [];
      offers.services.forEach((offer) => {
        mine_offers.push(offer.service_id);
      });
      const filter = navigation.getParam('filter');

      if (filter && filterModal === false) {
        this.setState({ filterModal: true });
      }

      if (filterModal === undefined && modalSearch === false) {
        this.setState({ filterModal: true });
      }

      if (filterModal && modalFromHome && !modalSearch) {
        this.onPressFilter();
      }
      const status_travel = [];
      parameters.data.parameters.map((status_t) => {
        status_travel.push(parseInt(status_t.code, 10));
      });

      /* status offers */
      if (offers.myOffers) {
        offers.myOffers.forEach((offer) => {
          if (validation) {
            this.setState({ validation: false, modalPermission: false });
          }
          if (offer.active) {
            if (offer.statu_id === 16) {
              navigation.navigate('ApplyTravels', { dataOffer: offer });
              console.log('redirection detail');
            } else if (offer.statu_id === 19 /* 11 */) {
              navigation.navigate('SummaryTravels', { offer });
              // navigation.navigate('StartTravel', { Offer: offer });
            } else if (status_travel.includes(offer.statu_id)) {
              navigation.navigate('StartTravel', { Offer: offer });
            } else {
              // console.log(`${offer.statu_id} no include`);
            }
          }
        });
      }
      return (
        <MainView>
          <MainWrapper>
            <ContentView>
              { driver.me != null ? (
                <View style={{ width: '100%', height: 110, backgroundColor: '#0068ff' }}>
                  <TextBlack>{driver.me.telephone}</TextBlack>
                  <TextBlack>{driver.me.plate}</TextBlack>
                </View>
              ) : null }
            </ContentView>

            <ContentView subcontent>
              <ContentBlock>
                <TextBlack>Viajes disponibles</TextBlack>
                <ContentFilter>
                  <ButtonLink
                    text="Filtrar"
                    icon
                    press={() => this.setState({ modalSearch: true })}
                  />
                </ContentFilter>
              </ContentBlock>
            </ContentView>

            <ContentOffer subcontent>
              {offers.data.map((services) => {
                if (!mine_offers.includes(services.id) && services.statu_id.toString() === '10') {
                  return (
                    <WhiteCardTravels
                      from={services.origin}
                      to={services.destination}
                      vehicle={vehicle_data[services.vehicle_type_id]}
                      pay={formatPrice(services.price)}
                      date="Hoy"
                      actionbtnPrimary={() => this.onPressTravel(services)}
                      btnPrimary="Ver detalles"
                      actionbtnSecondary={() => this.onClickShare(services)}
                    />
                  );
                }
              })}
            </ContentOffer>
          </MainWrapper>
          <Swipeable
            visible={modalSearch}
            onClose={() => this.OnHideModal()}
            onPressClose={() => this.OnHideModal()}
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

          <EmptyDialog
            visible={modalPermission}
            opacity={0.4}
            onTouchOutside={() => this.OnHideModal()}
          >
            <MainWrapperDialog>
              <ContentDialog>
                <TitleBlack>Datos Faltantes</TitleBlack>
                <TextGray>
                  Para que puedas aplicar a mejores viajes, nos falta esta información:
                </TextGray>
                <ContentForm>
                  {this.missingViews(permissions.data)}
                </ContentForm>
              </ContentDialog>
            </MainWrapperDialog>
          </EmptyDialog>
        </MainView>
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
    driver, offers, vehicles, user, profile, filterOffers, permissions, destinations, parameters,
  } = state;
  return {
    driver,
    offers,
    vehicles,
    user,
    profile,
    filterOffers,
    permissions,
    destinations,
    parameters,
  };
};

const mapDispatchToProps = dispatch => ({
  getProfile: params => dispatch(ProfileActions.getProfileRequest(params)),
  getsOffers: params => dispatch(OffersActions.getOffersRequest(params)),
  getVehicles: params => dispatch(VehiclesActions.getVehicleRequest(params)),
  getFilterOffers: data => dispatch(FilterOffers.getOffersByFilterRequest(data)),
  getMyOffersPostulation: params => dispatch(OffersActions.getServicesRequest(params)),
  getPermission: params => dispatch(PermissionsActions.getPermissionRequest(params)),
  getDestinations: data => dispatch(DestinationsActions.getDestinationsRequest(data)),
  getMyOffers: id => dispatch(OffersActions.getMyOffersRequest(id)),
  getparameters: params => dispatch(ParametersActions.parametersRequest(params)),
  dropOffersState: params => dispatch(OffersActions.dropInitialState(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeOffers);
