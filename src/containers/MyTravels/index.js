import React, { Component } from 'react';

import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import {
  MainView, MainWrapper, ContentView, TextBlack, ContentBlock,
  ContentFilter, TouchFilter, TextFilter, ContentOffer,
  WrapperSwipe, RowContent, ContentSlider, ContentForm,
  ContentRange, RowInput, WrapperInputs, WrapperButtonsBottom, WrapperButtonGradient,
} from './style';
import WhiteCardTravels from '../../components/WhiteCardTravels';
import PopUpDialog from '../../components/PopUpDialog';
import Swipeable from '../../components/Swipeable';
import ButtonGradient from '../../components/ButtonGradient';
import Input from '../../components/GeneralInput';
import InputSlider from '../../components/InputSlider';
import InputPicker from '../../components/InputPicker';
import OffersActions from '../../redux/reducers/OffersRedux';
import StatusActions from '../../redux/reducers/StatusRedux';
import VehicleActions from '../../redux/reducers/VehicleRedux';

const itemsTipo = [
  {
    textItem: 'Opcion 1',
    valueItem: 'opc1',
  },
  {
    textItem: 'Opcion 2',
    valueItem: 'opc2',
  },
];

const itemsStatus = [
  {
    textItem: 'En espera',
    valueItem: '1',
  },
  {
    textItem: 'Cancelado',
    valueItem: '2',
  },
  {
    textItem: 'Realizado',
    valueItem: '3',
  },
];

class MyTravels extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      modalSearch: false,
      multiSliderValue: [150000, 2300000],
      unmount: false,
    };
  }

  componentDidMount() {
    const {
      getMyOffers, getStatus, profile, getsOffers, getVehicleRequest,
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
          that.setState({ unmount: true });
        },
      );
    }
    getMyOffers(profile.data[0].user.id);
    getsOffers();
    getStatus();
    getVehicleRequest();
  }

  onPressButton(value) {
    const { navigation } = this.props;
    navigation.navigate('ApplyTravels', { dataOffer: value, booked: true });
  }

  onPressButtonPopup() {
    this.setState({ alertVisible: false });
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

  getMineOffersDriver() {
    const {
      getMyOffersRequest, profile,
    } = this.props;
    getMyOffersRequest(profile.data[0].user.id);
  }

  render() {
    const { alertVisible, modalSearch, multiSliderValue } = this.state;
    const {
      offers, vehicles, status, navigation,
    } = this.props;
    if (offers.myOffers) {
      offers.myOffers.forEach((offer) => {
        // eslint-disable-next-line max-len
        if (offer.statu_id === 6 || offer.statu_id === 7 || offer.statu_id === 8 || offer.statu_id === 9) {
          navigation.navigate('StartTravel', { Offer: offer });
        }
      });
    }

    if (offers.services !== null && offers.data !== null && status.data !== null && vehicles.data !== null) {
      const services_ids = [];
      const service_map = {};
      offers.services.forEach((service) => {
        services_ids.push(service.service_id);
        service_map[service.service_id] = service.approved;
      });
      console.log(services_ids);
      return (
        <MainView>
          <MainWrapper>
            <ContentView subcontent>
              <ContentBlock>
                <TextBlack>Mis Viajes</TextBlack>
              </ContentBlock>
            </ContentView>

            <ContentOffer subcontent>
              {offers.data.map((allOffers) => {
                if (services_ids.includes(allOffers.id)) {
                  return vehicles.data.map((vehicle) => {
                    if (vehicle.id === allOffers.vehicle_type_id) {
                      return status.data.map((statusOffer) => {
                        if (allOffers.statu_id === statusOffer.id) {
                          return (
                            <WhiteCardTravels
                              from={allOffers.destination}
                              to={allOffers.origin}
                              vehicle={vehicle.id === allOffers.vehicle_type_id && vehicle.name}
                              pay={allOffers.price}
                              date="Hoy"
                              status={service_map[allOffers.id] === false ? 'Rechazado' : allOffers.statu_id === statusOffer.id && statusOffer.name}
                              actionbtnPrimary={() => this.onPressButton(allOffers)}
                              btnPrimary={service_map[allOffers.id] === null || service_map[allOffers.id] ? 'Ver detalle' : null}
                            />
                          );
                        }
                      });
                    }
                  });
                }
              })}
            </ContentOffer>

            <PopUpDialog
              visible={alertVisible}
              textBlack="Lo sentimos"
              textButton="Entendido"
              textGray="no puedes ver la oferta"
              onTouchOutside={() => this.onPressButtonPopup()}
              pressButton={() => this.onPressButtonPopup()}
            />
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
                  <InputPicker title="Estado" listdata={itemsStatus} />
                  <InputPicker title="Origen" listdata={itemsTipo} />
                  <InputPicker title="Destino" listdata={itemsTipo} defaultSelect="opc1" />
                  <InputPicker title="Vehiculo" listdata={itemsTipo} />
                </WrapperInputs>
              </ContentForm>
              <WrapperButtonsBottom>
                <WrapperButtonGradient>
                  <ButtonGradient content="Buscar" />
                </WrapperButtonGradient>
              </WrapperButtonsBottom>
            </WrapperSwipe>
          </Swipeable>
        </MainView>
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
    offers, user, vehicles, status, profile,
  } = state;
  return {
    offers,
    user,
    vehicles,
    status,
    profile,
  };
};

const mapDispatchToProps = dispatch => ({
  getMyOffers: id => dispatch(OffersActions.getServicesRequest(id)),
  getsOffers: params => dispatch(OffersActions.getOffersRequest(params)),
  getStatus: params => dispatch(StatusActions.getStatusRequest(params)),
  getMyOffersRequest: data => dispatch(OffersActions.getMyOffersRequest(data)),
  getVehicleRequest: params => dispatch(VehicleActions.getVehicleRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyTravels);
