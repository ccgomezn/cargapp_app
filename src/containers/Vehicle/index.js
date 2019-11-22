import React, { Component } from 'react';

import {
  MainWrapper, ContentView, TextBlack, ContentBlock, ContentForm,
  WrapperInputs, WrapperButtonsBottom, WrapperButtonGradient,
} from './style';

import Input from '../../components/GeneralInput';
import InputPicker from '../../components/InputPicker';
import ButtonGradient from '../../components/ButtonGradient';

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

const itemsYears = [
  {
    textItem: '1990',
    valueItem: '1990',
  },
  {
    textItem: '1991',
    valueItem: '1992',
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
            <TextBlack>Datos de vehículo</TextBlack>
          </ContentBlock>
        </ContentView>

        {/* <ContentView>
          <View style={{ alignContent: 'center', justifyContent: 'center' }}>
            <IconProfile
              icon="https://img.autocosmos.com/noticias/fotosprinc/NAZ_e755baa5fe444f13b71d5e0d3209f169.jpg"
            />
          </View>
        </ContentView> */}

        <ContentForm>
          <WrapperInputs>
            <InputPicker title="Tipo de vehículo" listdata={itemsTipo} defaultSelect="0" editable />
            <Input title="Placa del vehículo" maxLength={6} />
            <Input title="Marca" holder="Ingrese la marca" />
            <Input title="Módelo" holder="Ingrese el módelo" />
            <InputPicker title="Año" listdata={itemsYears} defaultSelect="0" editable />
            <Input title="Color" holder="Ingrese el color" />
            <Input title="Chasis" holder="Ingrese el chasis" />
          </WrapperInputs>
        </ContentForm>

        <ContentView>
          <ContentBlock>
            <TextBlack>Datos del propietario</TextBlack>
          </ContentBlock>
        </ContentView>

        <ContentForm>
          <WrapperInputs>
            <Input title="Propietario" holder="Ingrese nombre " />
            <Input title="Cédula" holder="Ingrese No. de cédula" />
          </WrapperInputs>
        </ContentForm>

        <WrapperButtonsBottom>
          <WrapperButtonGradient>
            <ButtonGradient content="Actualizar" />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>

      </MainWrapper>
    );
  }
}
