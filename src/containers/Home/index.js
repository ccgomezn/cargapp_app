import React, { Component } from 'react';
import { View } from 'native-base';
import { ScrollView } from 'react-native';

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

export default class Home extends Component {
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
            <View style={{ width: '100%', height: 110, backgroundColor: '#0068ff' }}>
              <TextBlack>{'\n'}</TextBlack>
            </View>
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
              date="11/29/2019"
              actionbtnPrimary=""
              btnPrimary="Ver detalle"
            />

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
