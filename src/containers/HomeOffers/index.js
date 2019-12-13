/* eslint-disable no-plusplus */
/* eslint-disable no-const-assign */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View } from 'native-base';
import { ScrollView, ActivityIndicator, Share } from 'react-native';
import { connect } from 'react-redux';
import PickerModal from 'react-native-picker-modal-view';
import analytics from '@react-native-firebase/analytics';
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
import IconService from '../../components/IconService';
import ButtonGradient from '../../components/ButtonGradient';
import Swipeable from '../../components/Swipeable';
import Input from '../../components/GeneralInput';
import InputSlider from '../../components/InputSlider';

import EmptyDialog from '../../components/EmptyDialog';
import CardPermissions from '../../components/CardPermissions';

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
    label: 'Vehículos',
    url: 'ScreenVehicle',
  },
  {
    label: 'Cuenta bancaria',
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
      listview: ['profiles', 'vehicles', 'bank_accounts'],
      modalFromHome: true,
      share: false,
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('home_offers_cargapp');
    const {
      profileDriver,
      getsOffers,
      getVehicles,
      getProfile,
      getPermission,
      getDestinations,
      navigation,
    } = this.props;
    const data = {
      driver: {
        token: '3560660900101009',
      },
    };


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
        },
      );
    }
    this.setState({ callMine: false });
    getsOffers();
    getVehicles();
    getProfile();
    getPermission();
    getDestinations();
  }

  componentWillUnmount() {
    this.setState({ modalPermission: false });
  }

  onPressFilter() {
    this.setState({ modalSearch: true, modalFromHome: false });
  }

  onClickShare(offers) {
    Share.share(
      {
        message:
          `Esta oferta de carga te puede interesar:\n\nhttps://cargapp.app.link/psicLa1y7Y?offer=${
            offers.id}`,
        url: `https://cargapp.app.link/psicLa1y7Y?offer=${offers.id}`,
        title: 'Oferta Cargapp',
      },
      {
        // Android only:
        dialogTitle: 'Compartir Oferta',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  }

  onNavigate(nameView) {
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
          <ButtonGradient content="Entendido" press={() => this.OnHideModal()} />
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
      origin: labelOrigin,
      destination: labelDestination,
    };
    getFilterOffers(data);
    this.setState({ modalSearch: false });
    setTimeout(() => {
      navigation.navigate('Filter');
    }, 1000);
  }

  // eslint-disable-next-line react/sort-comp
  OnHideModal() {
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
      listview, fetch, modalFromHome,
    } = this.state;
    const {
      driver, offers, vehicles, navigation, profile, permissions, destinations,

    } = this.props;
    const dataPickOrigin = [{ Name: '* Cualquier Origen' }];
    const dataPickDesti = [{ Name: '* Cualquier Destino' }];
    const dataPickVehi = [{ Name: '* Cualquier Vehículo' }];
    console.log(callMine);
    if (offers.data && !callMine && profile.data) {
      this.getMineOffers();
      this.setState({ callMine: true });
    }
    if (permissions.data && !permissions.fetching && !fetch) {
      // validate permisson
      let perm = 0;
      permissions.data.map((pem) => {
        if (listview.includes(pem.name)) {
          if (!pem.permission) {
            perm++;
          }
        }
      });
      if (perm >= 1) {
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
    ) {
      destinations.data.origins.map((originData) => {
        dataPickOrigin.push({ Name: originData.name });
      });
      offers.data.map((originData) => {
        dataPickOrigin.push({ Name: originData.origin });
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
      if (filter && modalFromHome) {
        this.onPressFilter();
      }

      return (
        <MainView>
          <MainWrapper>
            <ContentView>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <IconService
                  icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-premios.svg"
                  text="Premios"
                  press={() => this.setState({ modalPermission: true })}
                />
                <IconService
                  icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-lubricant.svg"
                  text="Lubricantes"
                />
                <IconService
                  icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-premios.svg"
                  text="Combustible"
                />
                <IconService
                  icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-soat.svg"
                  text="SOAT"
                />
                <IconService
                  icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-premios.svg"
                  text="Otros"
                />
              </ScrollView>
            </ContentView>

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
                    press={() => this.onPressFilter()}
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
                      pay={services.price}
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
                    <Input title="Valor mínimo" value={'$'.concat('', multiSliderValue[0].toString())} />
                  </RowInput>
                  <RowInput>
                    <Input title="Valor máximo" value={'$'.concat('', multiSliderValue[1].toString())} />
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
                <TextGray>Para aplicar a ofertas, primero debes completar tus datos.</TextGray>
                <ContentForm>
                  <TextGray>Datos sin completar:</TextGray>
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
    driver, offers, vehicles, user, profile, filterOffers, permissions, destinations,

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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeOffers);
