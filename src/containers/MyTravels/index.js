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
    };
  }

  componentDidMount() {
    const { getMyOffers } = this.props;
    getMyOffers();
  }

  onPressButton() {
    this.setState({ alertVisible: true });
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

  render() {
    const { alertVisible, modalSearch, multiSliderValue } = this.state;
    const { offers } = this.props;
    if (offers.myOffers !== null) {
      return (
        <MainView>
          <MainWrapper>
            <ContentView subcontent>
              <ContentBlock>
                <TextBlack>Mis Viajes</TextBlack>
                <ContentFilter>
                  <TouchFilter onPress={() => this.onPressFilter()}>
                    <TextFilter>
                    Filtrar: Todos
                      { ' >' }
                    </TextFilter>
                  </TouchFilter>
                </ContentFilter>
              </ContentBlock>
            </ContentView>

            <ContentOffer subcontent>
              {offers.myOffers.map(allOffers => {
                return (
                    <WhiteCardTravels
                        from={}
                        to={}
                        vehicle={}
                        pay={}
                        date="Hoy"
                        status="Cancelado"
                        statusColor="#e74c3c"
                        actionbtnPrimary={() => this.onPressButton()}
                        btnPrimary="Ver detalle"
                    />
                )
              })}
              <WhiteCardTravels
                from="Bogota"
                to="Medellin"
                vehicle="Tractomula"
                pay="2.300.000"
                date="hoy"
                actionbtnPrimary=""
                btnPrimary="Aplicar"
                btnSecondary
              />

              <WhiteCardTravels
                from="Buenaventura"
                to="Bogotá D.C"
                vehicle="Tractomula"
                pay="2.300.000"
                date="22/22/20"
                status="En espera"
                actionbtnPrimary={() => this.onPressButton()}
                btnPrimary="Ver detalle"
              />

              <WhiteCardTravels
                from="Buenaventura"
                to="Bogotá D.C"
                vehicle="Tractomula"
                pay="2.300.000"
                date="Hoy"
                status="Cancelado"
                statusColor="#e74c3c"
                actionbtnPrimary=""
                btnPrimary="Ver detalle"
              />

              <WhiteCardTravels
                from="Buenaventura"
                to="Bogotá D.C"
                vehicle="Tractomula"
                pay="2.300.000"
                date="Ayer"
                status="Realizado"
                statusColor="#2ecc71"
                actionbtnPrimary=""
                btnPrimary="Ver detalle"
              />
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
  const { offers, user } = state;
  return {
    offers,
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  getMyOffers: id => dispatch(OffersActions.getMyOffersRequest(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyTravels);
