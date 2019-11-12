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

// action - reducers
import DriverActions from '../../redux/reducers/DriverRedux';
import OffersActions from '../../redux/reducers/OffersRedux';
import VehiclesActions from '../../redux/reducers/VehicleRedux';

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

class Home extends Component {
  constructor() {
    super();
    this.state = {
      modalSearch: false,
      multiSliderValue: [150000, 2300000],
    };
  }

  componentDidMount() {
    const { profileDriver, getsOffers, getVehicles } = this.props;

    const data = {
      driver: {
        token: '3560660900101009',
      },
    };
    profileDriver(data);
    getsOffers();
    getVehicles();
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

  render() {
    const { modalSearch, multiSliderValue } = this.state;
    const {
      driver, offers, vehicles, navigation, user,
    } = this.props;
    console.log(user);
    if (offers.data && vehicles.data) {
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
  const { driver, offers, vehicles, user } = state;
  return {
    driver,
    offers,
    vehicles,
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  profileDriver: params => dispatch(DriverActions.postDriverMeRequest(params)),
  getsOffers: params => dispatch(OffersActions.getOffersRequest(params)),
  getVehicles: params => dispatch(VehiclesActions.getVehicleRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
// export default Home;
