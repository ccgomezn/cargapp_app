/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View } from 'native-base';
import { ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import PickerModal from 'react-native-picker-modal-view';
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
// action - reducers
import DriverActions from '../../redux/reducers/DriverRedux';
import OffersActions from '../../redux/reducers/OffersRedux';
import ProfileActions from '../../redux/reducers/ProfileRedux';
import VehiclesActions from '../../redux/reducers/VehicleRedux';
import FilterOffers from '../../redux/reducers/FilterOffersRedux';

class Home extends Component {
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
    };
  }

  componentDidMount() {
    const {
      profileDriver, getsOffers, getVehicles, getProfile
    } = this.props;
    const data = {
      driver: {
        token: '3560660900101009',
      },
    };
    this.setState({callMine: false});
    profileDriver(data);
    getsOffers();
    getVehicles();
    getProfile();
  }

  getMineOffers() {
    const {
      getMyOffersPostulation, profile,
    } = this.props;


    getMyOffersPostulation(profile.data[0].user.id);
  }

  onPressFilter() {
    this.setState({ modalSearch: true });
  }

  // eslint-disable-next-line react/sort-comp
  OnHideModal() {
    this.setState({ modalSearch: false });
  }

  multiSliderValuesChange(values) {
    this.setState({
      multiSliderValue: values,
    });
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

  searchByFilter() {
    const {
      multiSliderValue,
      labelDestination,
      labelOrigin,
      idVehicle,
    } = this.state;
    const { getFilterOffers } = this.props;
    const data = {
      startPrice: multiSliderValue[0],
      endPrice: multiSliderValue[1],
      vehicle: idVehicle,
      origin: labelOrigin,
      destination: labelDestination,
    };
    getFilterOffers(data);
  }

  render() {
    const {
      modalSearch, multiSliderValue, labelDestination, labelOrigin,
      labelVehicle, callMine
    } = this.state;
    const {
      driver, offers, vehicles, navigation, profile,
    } = this.props;
    const dataPickOrigin = [{ Name: '* Cualquier Origen' }];
    const dataPickDesti = [{ Name: '* Cualquier Destino' }];
    const dataPickVehi = [{ Name: '* Cualquier Vehículo' }];
    console.log(callMine);
    if(offers.data && !callMine && profile.data){
      this.getMineOffers();
      this.setState({callMine: true});
    }
    if (offers.data && offers.services && vehicles.data &&!offers.fetching) {
      offers.data.map((originData) => {
        dataPickOrigin.push({ Name: originData.origin });
      });
      offers.data.map((destinationData) => {
        dataPickDesti.push({ Name: destinationData.destination });
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
                <TextBlack>Viajes</TextBlack>
                <ContentFilter>
                  <ButtonLink
                    text="Filtrar viajes disponibles"
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
                      date="hoy"
                      actionbtnPrimary={() => navigation.navigate('ApplyTravels', { dataOffer: services})}
                      btnPrimary="Aplicar"
                      btnSecondary
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
                    <GrayText>Origen</GrayText>
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
    driver, offers, vehicles, user, profile, filterOffers,
  } = state;
  return {
    driver,
    offers,
    vehicles,
    user,
    profile,
    filterOffers,
  };
};

const mapDispatchToProps = dispatch => ({
  profileDriver: params => dispatch(DriverActions.postDriverMeRequest(params)),
  getProfile: params => dispatch(ProfileActions.getProfileRequest(params)),
  getsOffers: params => dispatch(OffersActions.getOffersRequest(params)),
  getVehicles: params => dispatch(VehiclesActions.getVehicleRequest(params)),
  getFilterOffers: data => dispatch(FilterOffers.getOffersByFilterRequest(data)),
  getMyOffersPostulation: params => dispatch(OffersActions.getServicesRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
// export default Home;
