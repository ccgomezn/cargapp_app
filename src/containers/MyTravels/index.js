/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { ActivityIndicator, Share } from 'react-native';
import analytics from '@react-native-firebase/analytics';
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
import VehiclesActions from '../../redux/reducers/VehicleRedux';
import ParametersActions from '../../redux/reducers/ParametersRedux';
import { formatPrice } from '../../helpers/Utils';

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
      refresh: false,
      summary: false,
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('mis_viajes');
    const {
      getMyOffers, getStatus, profile, getsOffers, getVehicles, getMyOffersRequest, getparameters,
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
    getsOffers();
    getStatus();
    getVehicles();
    getparameters('STATUS_TRAVEL');
    getMyOffersRequest(profile.data[0].user.id);
    getMyOffers(profile.data[0].user.id);
  }

  componentWillUnmount() {
    const { dropOffersState } = this.props;
    dropOffersState();
  }

  onPressButton(value) {
    const { navigation } = this.props;
    if (value.statu_id === 11 || value.statu_id === 50) {
      navigation.navigate('SummaryTravels', { offer: value });
    } else {
      navigation.navigate('ApplyTravels', { dataOffer: value, booked: true });
    }
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
    const {
      alertVisible, modalSearch, multiSliderValue, refresh, summary,
    } = this.state;
    const {
      offers, vehicles, status, navigation, parameters, profile,
      getsOffers, getStatus, getVehicles, getMyOffersRequest, getMyOffers, getparameters,
    } = this.props;

    const isSummary = navigation.getParam('isSummary');
    if (isSummary && !refresh) {
      getsOffers();
      getStatus();
      getVehicles();
      getparameters('STATUS_TRAVEL');
      getMyOffersRequest(profile.data[0].user.id);
      getMyOffers(profile.data[0].user.id);
      this.setState({ refresh: true });
    }

    if (
      offers.services !== null
      && offers.data !== null
      && status.data !== null
      && vehicles.data !== null
      && parameters.data !== null
    ) {
      const isSummary = navigation.getParam('isSummary');
      const services_ids = [];
      const service_map = {};
      if (!summary && isSummary) {
        this.setState({ summary: true });
      }
      offers.services.forEach((service) => {
        services_ids.push(service.service_id);
        service_map[service.service_id] = service.approved;
      });

      const status_travel = [];
      parameters.data.parameters.map((status_t) => {
        status_travel.push(parseInt(status_t.code, 10));
      });
      /* status offers */
      if (offers.myOffers) {
        offers.myOffers.forEach((offer) => {
          if (offer.active) {
            if (offer.statu_id === 16) {
              navigation.navigate('ApplyTravels', { dataOffer: offer });
            } else if (offer.statu_id === 19 && !summary) {
              navigation.navigate('SummaryTravels', { offer });
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
                              to={allOffers.destination}
                              from={allOffers.origin}
                              vehicle={vehicle.id === allOffers.vehicle_type_id && vehicle.name}
                              pay={formatPrice(allOffers.price)}
                              date={allOffers.created_at}
                              status={service_map[allOffers.id] === false ? 'Rechazado' : allOffers.statu_id === statusOffer.id && statusOffer.name}
                              actionbtnPrimary={() => this.onPressButton(allOffers)}
                              btnPrimary={service_map[allOffers.id] === null || service_map[allOffers.id] ? 'Ver detalle' : null}
                              actionbtnSecondary={null}
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
              textGray="no puedes ver el viaje"
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
    offers, user, vehicles, status, profile, parameters,
  } = state;
  return {
    offers,
    user,
    vehicles,
    status,
    profile,
    parameters,
  };
};

const mapDispatchToProps = dispatch => ({
  getMyOffers: id => dispatch(OffersActions.getServicesRequest(id)),
  getsOffers: params => dispatch(OffersActions.getOffersRequest(params)),
  getVehicles: params => dispatch(VehiclesActions.getVehicleRequest(params)),
  getStatus: params => dispatch(StatusActions.getStatusRequest(params)),
  getMyOffersRequest: data => dispatch(OffersActions.getMyOffersRequest(data)),
  getparameters: params => dispatch(ParametersActions.parametersRequest(params)),
  dropOffersState: params => dispatch(OffersActions.dropInitialState(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyTravels);
