import React, { Component } from 'react';
import Swipeable from '../../components/Swipeable';
import InputPicker from '../../components/InputPicker';

import {
  MainView, MainWrapper, ContentView, TextBlack, ContentBlock,
  ContentFilter, TouchFilter, TextFilter, ContentOffer,
  RowContent, ContentForm, WrapperInputs, RowInput, ContentRange,
  WrapperButtonsBottom, WrapperButtonGradient, WrapperSwipe, ContentSlider,
} from './style';

import WhiteCardTravels from '../../components/WhiteCardTravels';
import CardSquareInfo from '../../components/CardSquareInfo';
import ButtonGradient from '../../components/ButtonGradient';
import Input from '../../components/GeneralInput';
import InputSlider from '../../components/InputSlider';

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

export default class Travels extends Component {
  constructor() {
    super();
    this.state = {
      modalSearch: false,
      multiSliderValue: [150000, 2300000],
    };
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

    return (
      <MainView>
        <MainWrapper>
          <ContentView>
            <RowContent style={{ marginRight: '2%' }}>
              <CardSquareInfo
                value="$850"
                description="Ganaste en el último viaje."
                icon={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/check-gradient.svg' }}
              />
            </RowContent>
            <RowContent>
              <CardSquareInfo
                value="158.3 Km"
                description="Distancia de tu último viaje."
                icon={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/map-gradient.svg' }}
              />
            </RowContent>
          </ContentView>

          <ContentView subcontent>
            <ContentBlock>
              <TextBlack>Viajes</TextBlack>
              <ContentFilter>
                <TouchFilter onPress={() => this.onPressFilter()}>
                  <TextFilter>
                    Filtrar: Viajes disponibles
                    { ' >' }
                  </TextFilter>
                </TouchFilter>
              </ContentFilter>
            </ContentBlock>
          </ContentView>

          <ContentOffer subcontent>
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
              actionbtnPrimary
              btnPrimary="Ver detalle"
            />
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
}
