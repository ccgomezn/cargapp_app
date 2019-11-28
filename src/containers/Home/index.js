/* eslint-disable no-plusplus */
/* eslint-disable no-const-assign */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View } from 'native-base';
import { ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import {
  MainView, MainWrapper, ContentView, TextBlack, ContentBlock,
  ContentFilter, ContentOffer,
  WrapperSwipe, RowContent, ContentSlider, ContentForm,
  ContentRange, RowInput, WrapperInputs,
  WrapperButtonsBottom, WrapperButtonGradient,
} from './style';
import WhiteCardTravels from '../../components/WhiteCardTravels';
import ButtonLink from '../../components/ButtonLink';
import IconService from '../../components/IconService';
import ButtonGradient from '../../components/ButtonGradient';
import Swipeable from '../../components/Swipeable';
import InputPicker from '../../components/InputPicker';
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
import VehiclesActions from '../../redux/reducers/VehicleRedux';
import PermissionsActions from '../../redux/reducers/PermissionsRedux';

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
    label: 'Documentos',
    url: 'ScreenDocuments',
  },
  {
    label: 'Cuenta bancaria',
    url: 'ScreenProfile',
  },
];

class Home extends Component {
  constructor() {
    super();
    this.state = {
      modalSearch: false,
      multiSliderValue: [150000, 2300000],
      modalPermission: false,
      fetch: false,
      listview: ['profiles', 'vehicles', 'documents', 'bank_accounts'],
    };
  }

  componentDidMount() {
    const { getsOffers, getVehicles, getPermission } = this.props;

    getsOffers();
    getVehicles();
    getPermission();
  }

  componentWillUnmount() {
    this.setState({ modalPermission: false });
  }

  onPressFilter() {
    this.setState({ modalSearch: true });
  }

  // eslint-disable-next-line react/sort-comp
  OnHideModal() {
    this.setState({ modalSearch: false, modalPermission: false });
  }

  onNavigate(nameView) {
    const { navigate } = this.props.navigation;
    this.setState({ modalPermission: false });
    setTimeout(() => {
      navigate(nameView);
    }, 1000);
  }

  multiSliderValuesChange(values) {
    this.setState({
      multiSliderValue: values,
    });
  }

  // eslint-disable-next-line class-methods-use-this
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

  render() {
    const {
      modalSearch,
      multiSliderValue,
      modalPermission,
      listview,
      fetch,
    } = this.state;
    const {
      driver, offers, vehicles, navigation, permissions,
    } = this.props;

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
    if (offers.data !== null && !offers.fetching
      && vehicles.data !== null && !vehicles.fetching
      && permissions.data !== null && !permissions.fetching
    ) {
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
              {offers.data.map(services => (
                vehicles.data.map(vehicle => (
                  <WhiteCardTravels
                    from={services.origin}
                    to={services.destination}
                    vehicle={vehicle.id === services.vehicle_type_id && vehicle.name}
                    pay={services.price}
                    date="hoy"
                    actionbtnPrimary={() => navigation.navigate('ApplyTravels', { dataOffer: services })}
                    btnPrimary="Aplicar"
                    btnSecondary
                  />
                ))
              ))}
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
    driver, offers, vehicles, user, permissions,
  } = state;
  return {
    driver,
    offers,
    vehicles,
    user,
    permissions,
  };
};

const mapDispatchToProps = dispatch => ({
  getsOffers: params => dispatch(OffersActions.getOffersRequest(params)),
  getVehicles: params => dispatch(VehiclesActions.getVehicleRequest(params)),
  getPermission: params => dispatch(PermissionsActions.getPermissionRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
