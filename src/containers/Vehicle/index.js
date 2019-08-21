import React, { Component } from 'react';
import { View } from 'react-native';

import {
  MainWrapper, ContentView, TextBlack, ContentBlock, ContentForm,
  WrapperInputs, WrapperButtonsBottom, WrapperButtonGradient,
} from './style';

import Input from '../../components/GeneralInput';
import InputPicker from '../../components/InputPicker';
import ButtonGradient from '../../components/ButtonGradient';
import IconProfile from '../../components/IconProfile';

const itemsTipo = [
  {
    textItem: 'tipo 1',
    valueItem: 'tipo 1',
  },
  {
    textItem: 'tipo 2',
    valueItem: 'tipo 2',
  },
];

const itemsCat = [
  {
    textItem: 'Categoría 1',
    valueItem: 'cat1',
  },
  {
    textItem: 'Categoría 2',
    valueItem: 'cat2',
  },
  {
    textItem: 'Categoría 3',
    valueItem: 'cat3',
  },
  {
    textItem: 'Categoría 4',
    valueItem: 'cat4',
  },
];

export default class Vehicle extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <MainWrapper>
        <ContentView>
          <ContentBlock>
            <TextBlack>Mi vehículo</TextBlack>
          </ContentBlock>
        </ContentView>

        <ContentView>
          <View style={{ alignContent: 'center', justifyContent: 'center' }}>
            <IconProfile
              edit
              icon="https://img.autocosmos.com/noticias/fotosprinc/NAZ_e755baa5fe444f13b71d5e0d3209f169.jpg"
            />
          </View>
        </ContentView>

        <ContentForm>
          <WrapperInputs>
            <Input title="Placa del vehículo" />
            <Input title="Marca" holder="Ingrese la marca" />
            <Input title="Año" />
            <InputPicker title="Tipo de remolque" listdata={itemsTipo} />
            <Input title="Capacidad" holder="Ingrese la capacidad" />
            <InputPicker title="Categoría" listdata={itemsCat} defaultSelect="cat2" />
          </WrapperInputs>
        </ContentForm>

        <WrapperButtonsBottom>
          <WrapperButtonGradient>
            <ButtonGradient content="Añadir nuevo" />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>

      </MainWrapper>
    );
  }
}
